import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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
	cartTotal: 0,
});

const CART_ACTION_TYPES = {
	SET_CART_ITEMS: "SET_CART_ITEMS",
	SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
};

const cartReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
			};
		default:
			throw new Error(`Unhandled type ${type} in cartReducer`);
	}
};

export const CartProvider = ({ children }) => {
	const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
		useReducer(cartReducer, INITIAL_STATE);
	const updateCartItemsReducer = (newCartItems) => {
		//generate newCartTotal
		const newCartCount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		//generate newCartCount
		const newCartTotal = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);

		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
				cartItems: newCartItems,
				cartTotal: newCartTotal,
				cartCount: newCartCount,
			})
		);
	};

	const addItemToCart = (cartItemToAdd) => {
		const newCartItems = addCartItem(cartItems, cartItemToAdd);
		updateCartItemsReducer(newCartItems);
	};
	const removeItemFromCart = (cartItemToRemove) => {
		const newCartItems = removeCartItem(cartItems, cartItemToRemove);
		updateCartItemsReducer(newCartItems);
	};
	const clearItemfromCart = (cartItemToClear) => {
		const newCartItems = clearCartItem(cartItems, cartItemToClear);
		updateCartItemsReducer(newCartItems);
	};

	const setIsCartOpen = (bool) => {
		dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
	};
	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		removeItemFromCart,
		clearItemfromCart,
		cartCount,
		cartTotal,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
