import { createContext, useState, useEffect } from "react";

export const addCartItem = (cartItems, cartItemToAdd) => {
	const cartItemMatches = (cartItem, cartItemToAdd) => {
		return cartItem.id === cartItemToAdd.id;
	};
	const existingCartItem = cartItems.find((cartItem) =>
		cartItemMatches(cartItem, cartItemToAdd)
	);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItemMatches(cartItem, cartItemToAdd)
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, cartItemToRemove) => {
	const cartItemMatches = (cartItem, cartItemToRemove) => {
		return cartItem.id === cartItemToRemove.id;
	};

	const existingCartItem = cartItems.find((cartItem) =>
		cartItemMatches(cartItem, cartItemToRemove)
	);

	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}
	return cartItems.map((cartItem) =>
		cartItemMatches(cartItem, cartItemToRemove)
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

export const clearCartItem = (cartItems, cartItemToClear) => {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemfromCart: () => {},
	cartCount: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	const addItemToCart = (cartItemToAdd) =>
		setCartItems(addCartItem(cartItems, cartItemToAdd));
	const removeItemFromCart = (cartItemToRemove) =>
		setCartItems(removeCartItem(cartItems, cartItemToRemove));
	const clearItemfromCart = (cartItemToClear) =>
		setCartItems(clearCartItem(cartItems, cartItemToClear));

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		removeItemFromCart,
		clearItemfromCart,
		cartCount,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
