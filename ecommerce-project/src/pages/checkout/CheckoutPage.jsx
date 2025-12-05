import axios from 'axios';
import CheckoutHeader from './CheckoutHeader';
import { useEffect, useState } from 'react';
import { OrderSummary } from './OrderSummary.jsx';
import { PaymentSummary } from './PaymentSummary.jsx';
import './CheckoutPage.css';


export function CheckoutPage({ cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    // useEffect(() => {
    //     axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
    //         .then((response) => {
    //             setDeliveryOptions(response.data);
    //         });
    //     axios.get('/api/payment-summary')
    //         .then((response) => {
    //             setPaymentSummary(response.data);
    //         });
    // }, []);

    useEffect(()=> {
        const fetchCheckoutData = async() => {
            let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data);
            response = await axios.get('/api/payment-summary');
            setPaymentSummary(response.data);
        }
        fetchCheckoutData();
    }, []);

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />

            <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary deliveryOptions={deliveryOptions} cart={cart} />
                    <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div>
        </>
    );
}