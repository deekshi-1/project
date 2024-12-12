import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home/home";
import Profile from "./pages/profile";
import CategoryPage from "./pages/category/store";
import "./App.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/category" element={<Store />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" />
            <Route path="/wishlist" />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
