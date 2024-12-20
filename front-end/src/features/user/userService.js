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
const removeCartitem = async (cartItemId) => {
  const response = await axios.delete(
    `${base_url}user/remove-cart-item/${cartItemId}`,
    getAuthHeaders()
  );
  if (response.data) {
    console.log(response.data);
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

export const authService = {
  registerUser,
  login,
  getWishList,
  addToCart,
  getCart,
  removeCartitem,
  updateCartitem,
};
