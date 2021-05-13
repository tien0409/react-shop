import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../constants/categoryContants";

export const categoriesListReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true };

    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: payload };

    case CATEGORY_LIST_FAIL:
      return { loading: false };

    default:
      return state;
  }
};
