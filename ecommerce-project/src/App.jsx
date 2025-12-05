//import { useState } from 'react'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import './App.css'

function App() {
  
  return (
    <Routes>
      <Route index element={<HomePage />}/> {/* same as path='/' */}
      <Route path='/checkout' element={<CheckoutPage />}/>
      <Route path='/orders' element={<OrdersPage />}/>
    </Routes>
  )
}

export default App
