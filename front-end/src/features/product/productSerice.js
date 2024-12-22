import axios from "axios";
import { base_url, getAuthHeaders } from "../../utils/axiosConfig";

const getProducts = async (data) => {
  const response = await axios.get(
    `${base_url}product?${data?.brand ? `brand=${data?.brand}&&` : ""}${
      data?.tag ? `tags=${data?.tag}&&` : ""
    }${data?.category ? `category=${data?.category}&&` : ""}${
      data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""
    }${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}${
      data?.sort ? `sort=${data?.sort}&&` : ""
    }`
  );
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
const rateProduct = async (data) => {
  const response = await axios.put(
    `${base_url}product/rating`,
    data,
    getAuthHeaders()
  );
  if (response.data) {
    return response.data;
  }
};
export const productServices = {
  getProducts,
  addToWishList,
  viewSingleProduct,
  rateProduct,
};
