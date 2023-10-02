import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout.styles.scss";

const Checkout = () => {
	const { cartItems, addItemToCart, removeItemFromCart } =
		useContext(CartContext);
	return (
		<div>
			<h1>Checkout</h1>
			<div>
				{cartItems.map((cartItem) => {
					const { id, name, quantity } = cartItem;
					return (
						<div
							className=''
							key={id}>
							<h1>{name}</h1>
							<span onClick={() => removeItemFromCart(cartItem)}> - </span>
							<span>{quantity}</span>

							<span onClick={() => addItemToCart(cartItem)}> + </span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Checkout;
