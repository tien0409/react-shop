import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: "" },
  action,
) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ADD_ITEM:
      const cartExists = state.cartItems.find(
        (item) => item.product === payload.product,
      );
      if (cartExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === payload.product ? payload : item,
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
        };
      }

    case CART_REMOVE_ITEM:
      const index = state.cartItems.findIndex((item) => item._id === payload);
      return {
        ...state,
        cartItems: state.cartItems.filter((item, i) => i !== index),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };

    case CART_RESET:
      return {
        cartItems: [],
        paymentMethod: "",
        shippingAddress: {},
      };

    default:
      return state;
  }
};
