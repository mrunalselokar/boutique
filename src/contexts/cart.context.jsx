import { createContext, useState, useEffect } from "react";

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
	cartCount: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};
	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		cartCount,
	};
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
