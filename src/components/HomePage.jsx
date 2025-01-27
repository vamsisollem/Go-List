import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import listIcon from '/images/frontImage.png'
function HomePage() {
    const [anime, setAnime] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            setAnime(true)
        },1000)
    },[])
  return (
    <div className='bg-gradient min-h-screen flex justify-center items-center flex-col'>
        <h1 className='text-6xl mb-4 text-very-light-gray animate-fade-in'>Keep your tasks together</h1>
        <div className="animate-roll-out">
            <div className='flex mt-4 items-center'>
                <div className={`w-6 h-6 rounded-full border border-very-light-grayish-blue mr-2 ${anime ? 'bg-check bg-no-repeat bg-center': ''}`}></div>
                <li className={`list-none text-2xl ${anime ? 'line-through opacity-70' : ''}`}> Meeting at 11pm </li>
            </div>
            <div className='flex mt-4 items-center'>
                <div className='w-6 h-6 rounded-full border border-very-light-grayish-blue mr-2'></div>
                <li className='list-none text-2xl'> Respond to emails </li>
            </div>
            <div className='flex mt-4 items-center'>
                <div className='w-6 h-6 rounded-full border border-very-light-grayish-blue mr-2'></div>
                <li className='list-none text-2xl'> Take vitamins/supplements </li>
            </div>
            <div className='flex mt-4 items-center'>
                <div className='w-6 h-6 rounded-full border border-very-light-grayish-blue mr-2'></div>
                <li className='list-none text-2xl'> Send a thank-you note to someone </li>
            </div>
        </div>
        <div className='absolute top-10 right-10'>
            <Link to={'/Login'}><button className=' text-sm font-medium w-fit h-fit bg-very-light-gray text-very-dark-desaturated-blue rounded-lg p-2 mr-2 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105'>Login</button></Link>
            <Link to={'/Register'}><button className=' text-sm font-medium w-fit h-fit bg-very-light-gray text-very-dark-desaturated-blue rounded-lg p-2 ml-2 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105'>Sign Up</button></Link>
        </div>
        <div className='absolute top-10 left-10 flex items-center'>
            <img src={listIcon} alt='to do list image'></img>
            <h1 className='text-7xl font-bold'>GO LIST</h1>
        </div>
    </div>

  )
}

export default HomePage
