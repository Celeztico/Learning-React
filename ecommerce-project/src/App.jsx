import { Routes, Route } from 'react-router'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import { useEffect, useState } from 'react'
import axios from 'axios'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'


window.axios = axios;


function App() {
  const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   axios.get('/api/cart-items?expand=product')
  //     .then((response) => {
  //       setCart(response.data);
  //     });
  // }, []);

  const fetchCartData = async () => {
    const response = await axios.get('/api/cart-items?expand=product');
    setCart(response.data);
  }

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={fetchCartData} />} /> {/* same as path='/' */}
      <Route path='/checkout' element={<CheckoutPage cart={cart} loadCart={fetchCartData} />} />
      <Route path='/orders' element={<OrdersPage cart={cart} loadCart={fetchCartData} />} />
      <Route path='/tracking/:orderId/:productId' element={<TrackingPage cart={cart} />} />
      <Route path='*' element={<NotFoundPage cart={cart} />} />
    </Routes>
  )
}

export default App
