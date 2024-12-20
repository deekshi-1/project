import React from "react";
import { FaRegUser, FaHeart, FaShoppingBag, FaSearch } from "react-icons/fa";

import "./header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="row justify-content-between headerWrapper ">
        <div className="fit-width row headerWrapper-Left">
          <div className="fit-width logo">
            <img src="/images/logos/mainLogo.webp" alt="websiteLogo" />
          </div>
          <div className=" fit-width col-8 logo-text">
            <Link to="/">Shopyfy </Link>
          </div>
        </div>
        <div className="fit-width headerWrapper category">
          <Link to="/store">Store</Link>
        </div>
        <div className="fit-width searchBar">
          <FaSearch className="searchIcon" />
          <input placeholder="Seach the products" type="text"></input>
        </div>
        <div className="fit-width row Right">
          <div className="fit-width Right header-profile">
            <Link to="/profile">
              <FaRegUser color="white" />
              <div>Profile</div>
            </Link>
          </div>
          <div className="fit-width Right header-wishList">
            <Link to="/wishlist">
              <FaHeart color="white" />
              <div>Wishlist</div>
            </Link>
          </div>
          <div className=" fit-width Right headerCart">
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
