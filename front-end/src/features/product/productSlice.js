import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productServices } from "./productSerice";
import { toast } from "react-toastify";

export const getAllProduct = createAsyncThunk(
  "product/get",
  async (thunkApi) => {
    try {
      return await productServices.getProducts();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const wishlist = createAsyncThunk(
  "product/wishlist",
  async (productId, thunkApi) => {
    try {
      return await productServices.addToWishList(productId);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const singleProduct = createAsyncThunk(
  "product/viewProduct",
  async (productId, thunkApi) => {
    try {
      return await productServices.viewSingleProduct(productId);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  product: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;

        state.message = action.payload.message;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(state.message);
        }
      })
      .addCase(wishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(wishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wishlist = action.payload;
        state.message = "added to wishList";
      })
      .addCase(wishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(state.message);
        }
      })
      .addCase(singleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(singleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.singleProduct = action.payload;
      })
      .addCase(singleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(state.message);
        }
      });
  },
});

export const productReducer = productSlice.reducer;
