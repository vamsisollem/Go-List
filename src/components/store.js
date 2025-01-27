import { create } from "zustand";
import { collection, addDoc, doc, getDoc, getDocs, setDoc, deleteDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const store = (set, get) => ({
    userId: '',
    setUserId: (id)=> set({userId: id}),
  loginForm: {
    email: '',
    password: '',
  },
  setLoginForm: (name, value) => set((state) => ({
    loginForm: {
      ...state.loginForm,
      [name]: value,
    },
  })),
  registerForm: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  setRegisterForm: (field, value) => set((state) => ({
    registerForm: {
      ...state.registerForm,
      [field]: value,
    },
  })),
  loginError: '',
  setLoginError: (value) => set({ loginError: value }),
  registerError: '',
  setRegisterError: (value) => set({ registerError: value }),

  registerUser: async () => {
    const { registerForm, setRegisterError } = get();
    const { name, email, password, confirmPassword } = registerForm;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/;
    try {
      setRegisterError('');
      if (password !== confirmPassword) {
        setRegisterError("Passwords do not match!");
        return false;
      }
      if(!emailRegex.test(email)){
        setRegisterError('invalid email');
        return false
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: name,
          email: email,
          createdAt: new Date(),
          tasks:[],
        });
        console.log('User data added to Firestore');
        return true;
      } else {
        console.log('User already exists in Firestore');
        setRegisterError('user already exists')
        return false;
      }
    } catch (error) {
      console.error(error);
      setRegisterError(error.message.slice(9));
    }
  },

  loginUser: async () => {
    const { loginForm, setLoginError, setUserId } = get();
    const { email, password } = loginForm;
  
    try {
      setLoginError('');
      if (!email || !password) {
        setLoginError('please fill the missing fields');
        return false;
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUserId(user.uid);
      
      // Store the user ID in localStorage
      localStorage.setItem('userId', user.uid);
  
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        console.log('User logged in successfully');
        return true;
        setLoginError('');
      } else {
        setLoginError('User does not exist, please sign up!');
      }
    } catch (error) {
      setLoginError("Invalid email or password");
      console.error(error);
    }
  },
  
  clearLoginForm: ()=>{
    const {setLoginForm} = get();
    setLoginForm('email','')
    setLoginForm('password', '')
  },
  clearRegisterForm: ()=>{
    const{setRegisterForm} = get();
    setRegisterForm('name','');
    setRegisterForm('email','');
    setRegisterForm('password','');
    setRegisterForm('confirmPassword','');
  },
  signout: async()=>{
    try{
        await auth.signOut();
        console.log('user logged out')
    }
    catch(error){
        console.error(error)
    }
  },
  isAuthenticated: false,
  user: null,
  changeAuth: (authStatus, user = null) => set({ 
    isAuthenticated: authStatus,
    user: user 
  }),

  // tasks logic
  displayName: '',
  input: '',
  tasks: [],
  filter: 'All',
  setDisplayName: (value)=> set({displayName: value}),
  setInput: (value)=> set({input: value}),
  setTasks: (tasks) => set({ tasks }),
  setFilter: (filter) => set({ filter }),
  handleInput: async ()=>{
    const {input, setInput,postData,fetchTasks} = get();
    if(input.trim()){
        await postData(input);
        await setInput('');
        await fetchTasks();
    }
    else{
        console.log('Input is empty')
    }
  },
  createNewTask: (taskName) => ({
    task: taskName,
    completed: false,
    id: Date.now().toString(36).slice(2,11),
    Due: null,
  }),
  postData: async (taskName) => {
    const{userId, createNewTask} = get();
    if (!userId) {
        console.error("User is not logged in, cannot add task.");
        return;
      }
    try {
      if (taskName) {
        const newTask = createNewTask(taskName);
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef,{
            tasks: arrayUnion(newTask)
        });
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  },
  fetchTasks: async () => {
    const {userId,setTasks,setDisplayName} = get();
    if (!userId) {
        console.error("User is not logged in");
        return;
      }
    try {
      const userRef =  doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if(userSnap.exists()){
        setTasks('');
        const userData = userSnap.data();
        setTasks(userData.tasks);
        setDisplayName(userData.name);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  },
  updateTask: async (id, updatedTask) => {
    const{userId} = get();
    if (!userId) {
        console.error("User is not logged in");
        return;
      }
    try {
        const userRef =  doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        if(userSnap.exists()){
            const userData = userSnap.data();
            const updatedTasks = userData.tasks.map((task) =>
                task.id === id ? {...task, ...updatedTask} : task
            ) 
            await updateDoc(userRef,{tasks:updatedTasks})
        }
        await get().fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  },
  handleToggle:(task)=>{
    const {updateTask} = get();
    const updatedTask = {...task, completed: !task.completed};
    updateTask(task.id, updatedTask);
  },
  clearCompleted: async()=>{
    const{userId,fetchTasks} = get();
    if (!userId) {
        console.error("User is not logged in");
        return;
      }
    try{
        const userRef = doc(db, 'users', userId)
        const userSnap = await getDoc(userRef)
        if(userSnap.exists()){
            const userData = userSnap.data()
            const updatedTasks = userData.tasks.filter(task => !task.completed)
            await updateDoc(userRef,{
                tasks: updatedTasks
            })
            await fetchTasks();
        }
    }catch(error){
        console.log(error)
    }
  },
  showCalendar: {},
  setShowCalendar: (taskId) => set((state) => {
    const updatedState = { ...state.showCalendar };
    updatedState[taskId] = !updatedState[taskId]; 
    return { showCalendar: updatedState };
  }),
  handleImageClick : (taskId) => {
    set((state) => {
        const updatedState = { ...state.showCalendar };
        Object.keys(updatedState).forEach((id) => {
          if (id !== taskId) {
            updatedState[id] = false; 
          }
        });
        updatedState[taskId] = !updatedState[taskId];
        return { showCalendar: updatedState };
      });
    },
    handleDateChange : async (date,task) => {
        const{setShowCalendar, updateTask} = get();
        await setShowCalendar(task.id)
        const updatedTask = {...task, Due:date}
        await updateTask(task.id, updatedTask)
    },
})

export const useStore = create(store);
