import {
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../constants/productConstants";

export const productsListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCTS_LIST_REQUEST:
      return {
        loading: true,
      };

    case PRODUCTS_LIST_SUCCESS:
      return {
        loading: false,
        products: payload,
      };

    case PRODUCTS_LIST_FAIL:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const productDetailsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        product: payload,
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case PRODUCT_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
      };

    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: payload,
      };

    case PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case PRODUCT_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };

    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: payload,
      };

    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case PRODUCT_DELETE_RESET:
      return {};

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      };

    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        message: payload,
        success: true,
      };

    case PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const productCreateReviewReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        loading: true,
      };

    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case PRODUCT_CREATE_REVIEW_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case PRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};
