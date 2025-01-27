import React, { useEffect, useState } from 'react';
import {useStore} from './store'
import calendarIcon from '/images/calendarIcon.png';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from 'moment';

function Task() {
    const{tasks, handleToggle,filter, setFilter, clearCompleted, handleImageClick,handleDateChange, showCalendar,} = useStore();
    const filteredTasks = tasks.filter(task =>{
        if(filter === 'All') return true;
        if(filter === 'Active') return !task.completed;
        if(filter === 'Completed') return task.completed;
    })

  return (
    <div className='flex items-center flex-col'>
      {filteredTasks.map((task) => {
            const timeStamp = task.Due ?.seconds * 1000 + task.Due?.nanoseconds / 1000000;
            const date = new Date(timeStamp)
        
        return <div key={task.id} className='bg-very-dark-desaturated-blue  mb-1 w-1/3 flex items-center p-2.5 rounded-md mt-2'>
          <input 
            type="checkbox" 
            className={`appearance-none w-5 h-5 p-2 rounded-full border border-very-light-grayish-blue mr-2 cursor-pointer text-very-light-gray ${task.completed ? `bg-check bg-no-repeat bg-center` : ''}`}
            checked={task.completed} onChange={()=> handleToggle(task)}
          />
          <li className={`list-none ${task.completed ? 'line-through': ''} text-very-light-gray w-6/12`}>{task.task}</li>
          {task.Due && (<p className='flex justify-center text-very-light-gray w-6/12'>Due: {date ?.toLocaleDateString()}</p>)}
          <div className='relative ml-auto w-1/12'>
            <img src={calendarIcon} alt='calendar icon' className='w-8 h-8' onClick={()=>handleImageClick(task.id)}></img>
            {showCalendar[task.id] && (
                <div className='absolute top-9 left-5 z-10'>
                <Calendar onChange={(date)=>handleDateChange(date,task)} value={new Date()} />
                </div>
                )}
            </div>

        </div>
})}
      <div className='bg-very-dark-desaturated-blue w-1/3 p-2 flex items-center justify-between rounded-md text-very-light-gray'>
            <span>{tasks.length} Items left</span>
            <div className='space-x-2'>
                <button  onClick={()=> setFilter('All')} className='hover:bg-dark-grayish-blue rounded-md p-2'>All</button>
                <button  onClick={()=> setFilter('Active')} className='hover:bg-dark-grayish-blue rounded-md p-2'>Active</button>
                <button  onClick={()=> setFilter('Completed')} className='hover:bg-dark-grayish-blue rounded-md p-2'>Completed</button>
             </div>
            <button onClick={()=> clearCompleted()} className='hover:bg-dark-grayish-blue rounded-md p-2'>Clear Completed</button>
        </div>
</div>
  );
}

export default Task;