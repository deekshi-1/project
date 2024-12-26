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
export const forgotPass = createAsyncThunk(
  "user/password/token",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetPass = createAsyncThunk(
  "user/password/reset",
  async (data, thunkAPI) => {
    try {
      return await authService.resetPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/profile/update",
  async (data, thunkAPI) => {
    try {
      return await authService.updateUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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

export const order = createAsyncThunk(
  "user/cart/create-order",
  async (orderDetail, thunkAPI) => {
    try {
      return await authService.createOrder(orderDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "user/order/get",
  async (thunkAPI) => {
    try {
      return await authService.getUserOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const listAddress = createAsyncThunk(
  "auth/address",
  async (thunkApi) => {
    try {
      return await authService.getAddress();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const newAdress = createAsyncThunk(
  "auth/addAddress",
  async (data, thunkApi) => {
    try {
      return await authService.addAddress(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const rmAddressItem = createAsyncThunk(
  "auth/addres/remove",
  async (data, thunkApi) => {
    try {
      return await authService.removeAddressitem(data);
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
        console.log(action.payload);
        state.user = action.payload;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error("Invalid credentials");
      })
      .addCase(forgotPass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.token = action.payload;
        if (state.isSuccess) {
          toast.success("Forgot Passwprd Email Sent Successfully");
        }
      })
      .addCase(forgotPass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(state.message);
        }
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));

        if (state.isSuccess) {
          toast.success("Profile Updated Successfully");
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something Went Wrong!");
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
      })
      .addCase(order.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(order.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Ordered Successfully");
        }
      })
      .addCase(order.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something Went Wrong!");
        }
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getorderedProduct = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetPass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        if (state.isSuccess) {
          toast.success("Password Updated Successfully");
        }
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something Went Wrong!");
        }
      })
      .addCase(listAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.address = action.payload;
      })
      .addCase(listAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something Went Wrong!");
        }
      })
      .addCase(newAdress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newAdress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast.info("Address added");
      })
      .addCase(newAdress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something Went Wrong!");
        }
      })
      .addCase(rmAddressItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rmAddressItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);

        toast.info("Item removed");
      })
      .addCase(rmAddressItem.rejected, (state, action) => {
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
