import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkApi) => {
    try {
      return await authService.registerUser(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkApi) => {
    try {
      return await authService.login(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const listwishList = createAsyncThunk(
  "auth/wishList",
  async (thunkApi) => {
    try {
      return await authService.getWishList();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addCart = createAsyncThunk(
  "auth/cart/add",
  async (data, thunkApi) => {
    try {
      return await authService.addToCart(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const viewCart = createAsyncThunk("auth/cart/get", async (thunkApi) => {
  try {
    return await authService.getCart();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const rmCartItem = createAsyncThunk(
  "auth/cart/remove",
  async (data, thunkApi) => {
    try {
      return await authService.removeCartitem(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const updCartItem = createAsyncThunk(
  "auth/cart/updateQnty",
  async (data, thunkApi) => {
    try {
      return await authService.updateCartitem(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const getUserData = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialState = {
  user: getUserData,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdUser = action.payload;

        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(state.message);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(state.message);
        }
      })
      .addCase(listwishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listwishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wishlist = action.payload;
      })
      .addCase(listwishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(state.message);
        }
      })
      .addCase(addCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(state.message);
        }
      })
      .addCase(viewCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(viewCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cartProduct = action.payload;
      })
      .addCase(viewCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(state.message);
        }
      })
      .addCase(rmCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rmCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.info("Item removed");
      })
      .addCase(rmCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(state.message);
        }
      })
      .addCase(updCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updCartItem.rejected, (state, action) => {
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

export const authReducer = authSlice.reducer;
