import { createContext, useState, useEffect } from "react";

export const addCartItem = (cartItems, productToAdd) => {
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

export const removeCartItem = (cartItems, productToRemove) => {
	const cartItemMatches = (cartItem, productToRemove) => {
		return cartItem.id === productToRemove.id;
	};

	const existingCartItem = cartItems.find((cartItem) =>
		cartItemMatches(cartItem, productToRemove)
	);

	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id === productToRemove.id);
	}
	return cartItems.map((cartItem) =>
		cartItemMatches(cartItem, productToRemove)
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
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

	const addItemToCart = (productToAdd) =>
		setCartItems(addCartItem(cartItems, productToAdd));
	const removeItemFromCart = (productToRemove) =>
		setCartItems(removeCartItem(cartItems, productToRemove));

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		removeItemFromCart,
		cartCount,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
