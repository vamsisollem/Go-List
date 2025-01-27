import React from 'react'
import Register from './components/register'
import Login from './components/Login'
import Todo from './components/Todo'
import HomePage from './components/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/tasks" element={<Todo />}></Route>
        </Routes>
      </Router>
  )
}

export default App
