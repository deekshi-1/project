import axios from "axios";
import { base_url, getAuthHeaders } from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/all`);
  if (response.data) {
    return response.data;
  }
};

const addToWishList = async (productId) => {
  const response = await axios.put(
    `${base_url}product/wishlist`,
    { productId },
    getAuthHeaders()
  );
  if (response.data) {
    return response.data;
  }
};
const viewSingleProduct = async (productId) => {
  const response = await axios.get(`${base_url}product/${productId}`);
  if (response.data) {
    return response.data;
  }
};

export const productServices = {
  getProducts,
  addToWishList,
  viewSingleProduct,
};
