import React, { useEffect } from 'react';
import Header from './Header';
import Task from './Task';
import { useStore } from './store';

function Todo() {
  const { setUserId, userId, fetchTasks } = useStore();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [setUserId]);

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  return (
    <div>
      <Header />
      <Task />
    </div>
  );
}

export default Todo;
