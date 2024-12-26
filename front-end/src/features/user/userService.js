import axios from "axios";
import { base_url, getAuthHeaders } from "../../utils/axiosConfig";

const registerUser = async (data) => {
  const response = await axios.post(`${base_url}user/register`, data);
  if (response.data) {
    return response.data;
  }
};
const login = async (data) => {
  const response = await axios.post(`${base_url}user/login`, data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  }
};

const forgotPassword = async (data) => {
  const response = await axios.post(`${base_url}user/forgot-password`, data);
  if (response.data) {
    return response.data;
  }
};

const resetPassword = async (data) => {
  const response = await axios.post(
    `${base_url}user/reset-password/${data.token}`,
    { password: data?.password }
  );
  if (response.data) {
    return response.data;
  }
};

const getWishList = async (data) => {
  const response = await axios.get(
    `${base_url}user/wishlist`,
    getAuthHeaders()
  );
  if (response.data) {
    return response.data;
  }
};
const addToCart = async (data) => {
  const response = await axios.post(
    `${base_url}user/cart`,
    data,
    getAuthHeaders()
  );
  if (response.data) {
    return response.data;
  }
};
const getCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, getAuthHeaders());
  if (response.data) {
    return response.data;
  }
};
const updateUser = async (data) => {
  const response = await axios.put(
    `${base_url}user/update-user`,
    data,
    getAuthHeaders()
  );
  if (response.data) {
    return response.data;
  }
};
const removeCartitem = async (cartItemId) => {
  const response = await axios.delete(
    `${base_url}user/remove-cart-item/${cartItemId}`,
    getAuthHeaders()
  );
  if (response.data) {
    return response.data;
  }
};
const updateCartitem = async (data) => {
  const response = await axios.delete(
    `${base_url}user/update-cart-item/${data.cartItemId}/${data.newQnty}`,
    getAuthHeaders()
  );
  if (response.data) {
    return response.data;
  }
};
const createOrder = async (orderDetail) => {
  const response = await axios.post(
    `${base_url}user/cart/create-order`,
    orderDetail,
    getAuthHeaders()
  );
  if (response.data) {
    return response.data;
  }
};

const getUserOrders = async () => {
  const response = await axios.get(
    `${base_url}user/myorders`,
    getAuthHeaders()
  );
  if (response.data) {
    return response.data;
  }
};

const getAddress = async () => {
  const response = await axios.get(
    `${base_url}user/getAddress`,
    getAuthHeaders()
  );
  if (response.data) {
    return response.data;
  }
};
const addAddress = async (data) => {
  const response = await axios.post(
    `${base_url}user/addAddress`,
    data,
    getAuthHeaders()
  );
  if (response.data) {
    return response.data;
  }
};

const deleteAddress = async () => {
  const response = await axios.delete(
    `${base_url}user/getAddress`,
    getAuthHeaders()
  );
  if (response.data) {
    return response.data;
  }
};

const removeAddressitem = async (itemId) => {
  console.log(itemId);

  const response = await axios.delete(
    `${base_url}user/deleteAddress/${itemId}`,
    getAuthHeaders()
  );
  if (response.data) {
    return response.data;
  }
};

export const authService = {
  registerUser,
  login,
  getWishList,
  addToCart,
  getCart,
  removeCartitem,
  updateCartitem,
  createOrder,
  getUserOrders,
  updateUser,
  forgotPassword,
  resetPassword,
  getAddress,
  addAddress,
  deleteAddress,
  removeAddressitem,
};
