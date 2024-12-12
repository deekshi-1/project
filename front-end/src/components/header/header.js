import React from "react";
import { FaRegUser, FaHeart, FaShoppingBag, FaSearch } from "react-icons/fa";

import "./header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="row justify-content-between headerWrapper ">
        <div className="row headerWrapper-Left">
          <div className="logo">
            <img src="/images/logos/mainLogo.webp" alt="websiteLogo" />
          </div>
          <div className="col-8 logo-text">
            <Link to="/">Shopyfy </Link>
          </div>
        </div>
        <div className="headerWrapper category">
          <Link to="/store">Category</Link>
        </div>
        <div className="searchBar">
          <FaSearch className="searchIcon" />
          <input placeholder="Seach the products" type="text"></input>
        </div>
        <div className="row Right">
          <div className="Right header-profile">
            <Link to="/profile">
              <FaRegUser color="white" />
              <div>Profile</div>
            </Link>
          </div>
          <div className="Right header-wishList">
            <Link to="/wishlist">
              <FaHeart color="white" />
              <div>Wishlist</div>
            </Link>
          </div>
          <div className="Right headerCart">
            <Link to="/cart">
              <FaShoppingBag color="white" />
              <div>Cart</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
