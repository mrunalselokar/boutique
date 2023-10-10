import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

// export const setCart = (cartArray) =>
// 	createAction(CART_ACTION_TYPES.SET_CART, cartArray);

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

export const setIsCartOpen = (boolean) =>
	createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, cartItemToAdd) => {
	const newCartItems = addCartItem(cartItems, cartItemToAdd);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const clearItemfromCart = (cartItems, cartItemToClear) => {
	const newCartItems = clearCartItem(cartItems, cartItemToClear);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
