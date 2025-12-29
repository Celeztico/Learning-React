import axios from 'axios';
import Header from '../../components/Header.jsx';
import { useEffect, useState } from 'react';
import { OrdersGrid } from './OrdersGrid.jsx';
import './OrdersPage.css';

export function OrdersPage({ cart, loadCart }) {
    const [orders, setOrders] = useState([]);

    // useEffect(() => {
    //     axios.get('/api/orders?expand=products')
    //         .then((response) => {
    //             setOrders(response.data);
    //         });
    // }, []);

    useEffect(() => {
        const fetchOrdersData = async () => {
            const response = await axios.get('/api/orders?expand=products');
            setOrders(response.data);
        }
        fetchOrdersData();
    }, []);

    return (
        <>
            <title>Orders</title>
            <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} loadCart={loadCart} />
            </div>
        </>
    );
}