//import { useState } from 'react'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import './App.css'

function App() {
  
  return (
    <Routes>
      <Route index element={<HomePage />}/> {/* same as path='/' */}
      <Route path='/checkout' element={<div>CheckOut</div>}/>
    </Routes>
  )
}

export default App
