import React from 'react'
import {useStore} from './store'
import { Link, useNavigate} from 'react-router-dom'
function Login() {
    const { loginForm, setLoginForm, loginUser, loginError, clearLoginForm} = useStore();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      const sucess = await loginUser();
      if(sucess){
        clearLoginForm('');
        await navigate('/tasks',{replace: true})
      }
    };
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient'>
      <div className='bg-white rounded-lg shadow-lg w-fit p-2'>
        <h1 className='text-center font-bold text-3xl bg-gradient text-transparent bg-clip-text'>Login</h1>
        <form className='flex items-center flex-col p-4' onSubmit={handleSubmit}>
            <div className='flex justify-between mb-2 w-full'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' placeholder='Enter the email id' className='border-2 border-gray-300 rounded-md px-2 ml-2' value={loginForm.email} onChange={(e)=> setLoginForm('email',e.target.value)}></input>
            </div>
            <div className='flex justify-between mb-2 w-full'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' placeholder='Enter the password' className='border-2 border-gray-300 rounded-md px-2 ml-2' value={loginForm.password} onChange={(e)=> setLoginForm('password', e.target.value)}></input>
            </div>
            {loginError && <span className='text-red-500'>{loginError}</span>}
            <button type='submit' className='bg-blue-500 w-1/3 p-1 rounded-lg text-white mt-4'>Submit</button>
        </form>
        <Link to={'/Register'} className='text-blue-500 underline float-right p-2 cursor-pointer'>Register</Link>
      </div>
    </div>
  )
}

export default Login
