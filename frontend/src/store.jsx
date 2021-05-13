import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { categoriesListReducer } from "./reducers/categoryReducers";
import {
  productCreateReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productDetailsReducer,
  productsListReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  usersListReducer,
  userUpdateReducer,
  userDeleteReducer,
  userUpdateAdminReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListAdminReducer,
  orderListReducer,
  orderPayReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productsList: productsListReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productCreateReview: productCreateReviewReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  usersList: usersListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userUpdateAdmin: userUpdateAdminReducer,
  userDelete: userDeleteReducer,
  categoriesList: categoriesListReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderList: orderListReducer,
  orderListAdmin: orderListAdminReducer,
});

const userInfoFromLocal = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromLocal = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromLocal = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromLocal = localStorage.getItem("paymentMethod")
  ? localStorage.getItem("paymentMethod")
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocal },
  cart: {
    cartItems: cartItemsFromLocal,
    shippingAddress: shippingAddressFromLocal,
    paymentMethod: paymentMethodFromLocal,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
