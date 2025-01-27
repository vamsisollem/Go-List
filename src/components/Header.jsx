import React from 'react';
import {useStore} from './store'
import { useNavigate } from 'react-router-dom';

function Header() {
    const {input, setInput, handleInput, signout, displayName} = useStore();
    const navigate = useNavigate();
    const handleSignOut = async()=>{
        await signout();
        await navigate('/');
    }
  return (
    <header className="w-full h-[250px] bg-headerImage bg-cover flex items-center justify-center flex-col">
        <div className='text-4xl text-very-light-gray absolute left-4 top-4 font-bold'>{displayName}</div>
        <button className='text-sm font-medium w-fit h-fit bg-very-light-gray text-very-dark-desaturated-blue rounded-lg p-2 mr-2 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 absolute top-4 right-4' onClick={()=> handleSignOut()}>SIGN OUT</button>
        <div className='w-[500px] h-fit'>
            <h1 className='text-4xl font-bold mb-2 text-very-light-gray'>T O D O</h1>
            <input type='text' placeholder='Crete a new task' className='w-[400px] h-[40px] border-0 bg-very-dark-desaturated-blue text-light-grayish-blue' value={input} onChange={(e) => setInput(e.target.value)} onBlur={() =>handleInput()} required></input>
        </div>
    </header>
  )
}

export default Header