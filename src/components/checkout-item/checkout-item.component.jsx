import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
	const { name, quantity, price, imageUrl } = cartItem;
	const { addItemToCart, removeItemFromCart, clearItemfromCart } =
		useContext(CartContext);
	return (
		<div className='checkout-item-container'>
			<div className='image-container'>
				<img
					src={imageUrl}
					alt={name}
				/>
			</div>
			<span className='name'>{name}</span>
			<span className='quantity'>
				<span onClick={() => removeItemFromCart(cartItem)}> - </span>
				{quantity}
				<span onClick={() => addItemToCart(cartItem)}> + </span>
			</span>
			<span className='price'>{price}</span>
			<div
				className='remove-button'
				onClick={() => clearItemfromCart(cartItem)}>
				&#10005;
			</div>
		</div>
	);
};

export default CheckoutItem;
