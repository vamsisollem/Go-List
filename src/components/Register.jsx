import React from 'react'
import {useStore} from './store'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register() {
    const {registerForm, setRegisterForm, registerUser, registerError, clearRegisterForm} = useStore();
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const success = await registerUser();
        if(success){
            clearRegisterForm();
            await navigate('/Login');
        }
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient'>
      <div className='bg-white rounded-lg shadow-lg w-fit p-2'>
        <h1 className='text-center font-bold text-3xl bg-gradient text-transparent bg-clip-text'>Register</h1>
        <form className='flex items-center flex-col p-4' onSubmit={handleSubmit}>
            <div className='flex justify-between mb-2 w-full'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' placeholder='Enter your full name' className='border-2 border-gray-300 rounded-md px-2 ml-2' value={registerForm.name} onChange={(e)=> setRegisterForm('name',e.target.value)} required></input>
            </div>
            <div className='flex justify-between mb-2 w-full'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' placeholder='Enter the email id' className='border-2 border-gray-300 rounded-md px-2 ml-2' value={registerForm.email} onChange={(e)=> setRegisterForm('email',e.target.value)} required></input>
            </div>
            <div className='flex justify-between mb-2 w-full'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' placeholder='Enter the password' className='border-2 border-gray-300 rounded-md px-2 ml-2' value={registerForm.password} onChange={(e)=> setRegisterForm('password', e.target.value)} required></input>
            </div>
            <div className='flex justify-between mb-2 w-full'>
                <label htmlFor='confirm'>Confirm Password</label>
                <input type='password' id='confirm' placeholder='Enter password again' className='border-2 border-gray-300 rounded-md px-2 ml-2' value={registerForm.confirmPassword} onChange={(e)=> setRegisterForm('confirmPassword',e.target.value)} required></input>
            </div>
            {registerError && <span className='text-red-500'>{registerError}</span>}
            <button type='submit' className='bg-blue-500 w-1/3 p-1 rounded-lg text-white mt-4'>Submit</button>
        </form>
        <Link to={'/Login'} className='text-blue-500 underline float-right p-2 cursor-pointer'>Login ?</Link>
      </div>
    </div>
  )
}

export default Register
