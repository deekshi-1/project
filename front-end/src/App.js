import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home/home";
import Store from "./pages/store/store";
import Login from "./pages/signUpLogin/login";
import Wishlist from "./pages/wishList/wishlist";
import Cart from "./pages/Cart/cart";
import Profile from "./pages/Profile/profile";
import Forgot from "./pages/signUpLogin/forgot";
import Signup from "./pages/signUpLogin/signup";
import Faq from "./pages/customerRelation/faq";
import Privacy from "./pages/customerRelation/privacy";
import TandC from "./pages/customerRelation/tandc";
import SingleProduct from "./pages/singleProduct/singleProduct";
import CheckOut from "./pages/Checkout/checkout";
import "./App.css";
import { PrivateRoutes } from "./route/privateRoute";
import { PublicRoutes } from "./route/publicRoute";
import Order from "./pages/Order/order";
import Reset from "./pages/signUpLogin/reset";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="store" element={<Store />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route
              path="profile"
              element={
                <PrivateRoutes>
                  <Profile />
                </PrivateRoutes>
              }
            />
            <Route
              path="my-Order"
              element={
                <PrivateRoutes>
                  <Order />
                </PrivateRoutes>
              }
            />
            <Route
              path="cart"
              element={
                <PrivateRoutes>
                  <Cart />
                </PrivateRoutes>
              }
            />
            <Route
              path="wishlist"
              element={
                <PrivateRoutes>
                  <Wishlist />
                </PrivateRoutes>
              }
            />
            <Route
              path="checkout"
              element={
                <PrivateRoutes>
                  <CheckOut />
                </PrivateRoutes>
              }
            />
            <Route
              path="signup"
              element={
                <PublicRoutes>
                  <Signup />
                </PublicRoutes>
              }
            />
            <Route
              path="login"
              element={
                <PublicRoutes>
                  <Login />
                </PublicRoutes>
              }
            />
            <Route path="forgot-password" element={<Forgot />} />
            <Route path="reset-password/:token" element={<Reset />} />
            <Route path="faq" element={<Faq />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms-and-condition" element={<TandC />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
