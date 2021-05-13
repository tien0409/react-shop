import axios from "axios";
import {
  USERS_LIST_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_RESET,
  USER_DETAILS_RESET,
  USER_UPDATE_ADMIN_SUCCESS,
  USER_UPDATE_ADMIN_FAIL,
  USER_UPDATE_ADMIN_REQUEST,
} from "../constants/userConstants";

export const login = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/auth", { email, password }, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config,
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_UPDATE_RESET });
  dispatch({ type: USER_DETAILS_RESET });
};

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USERS_LIST_REQUEST });

    const { token } = getState().userLogin.userInfo;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/users", config);

    dispatch({ type: USERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id, admin = false) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { token } = getState().userLogin.userInfo;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = admin ? `/api/users/${id}` : `/api/users/profile`;

    const { data } = await axios.get(url, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserDetails = (user, admin = false) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const { token } = getState().userLogin.userInfo;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = admin
      ? {
          name: user.name,
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
        }
      : { name: user.name, email: user.email, password: user.password };
    const url = admin ? `/api/users/${user._id}` : `/api/users/profile`;

    const { data } = await axios.put(url, body, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserDetailsByAdmin = (user) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({ type: USER_UPDATE_ADMIN_REQUEST });

    const { token } = getState().userLogin.userInfo;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const body = {
      name: user.name,
      email: user.email,
      password: user.password ? user.password : null,
      isAdmin: user.isAdmin,
    };
    const url = `/api/users/${user._id}`;

    const { data } = await axios.put(url, body, config);

    dispatch({ type: USER_UPDATE_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const { token } = getState().userLogin.userInfo;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: USER_DELETE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
