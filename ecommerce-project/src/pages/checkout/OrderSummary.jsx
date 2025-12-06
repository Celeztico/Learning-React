import { CartItemDetails } from './CartItemDetails.jsx';
import { DeliveryDate } from './DeliverDate.jsx';
import { DeliveryOptions } from './DeliveryOptions.jsx';


export function OrderSummary({ deliveryOptions, cart , loadCart }) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                return (
                    <div key={cartItem.productId} className="cart-item-container">
                        <DeliveryDate cartItem={cartItem} deliveryOptions={deliveryOptions} />
                        <div className="cart-item-details-grid">
                            <CartItemDetails cartItem={cartItem} loadCart={loadCart} />
                            <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}