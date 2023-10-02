import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
	const cartItemMatches = (cartItem, productToAdd) => {
		return cartItem.id === productToAdd.id;
	};
	const existingCartItem = cartItems.find((cartItem) =>
		cartItemMatches(cartItem, productToAdd)
	);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItemMatches(cartItem, productToAdd)
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemsToCart: () => {},
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};
	const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems };
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
