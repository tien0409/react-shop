import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";
import { PRODUCT_DETAILS_FAIL } from "../constants/productConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        price: data.price,
        image: data.image,
        countInStock: data.countInStock,
        qty,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems),
    );
  } catch (error) {
    console.error(error);
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeCart = () => (dispatch) => {
  dispatch({ type: CART_RESET });
  localStorage.removeItem("cartItems");
};

export const saveShippingAddress = (shippingAddress) => (
  dispatch,
  getState,
) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: { ...shippingAddress },
  });
  localStorage.setItem(
    "shippingAddress",
    JSON.stringify(getState().cart.shippingAddress),
  );
};

export const savePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: paymentMethod });

  localStorage.setItem("paymentMethod", paymentMethod);
};
