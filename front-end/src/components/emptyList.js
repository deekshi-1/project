import React from "react";
import { Link } from "react-router-dom";
const EmptyList = ({ page }) => {
  return (
    <div className="my-4 emptyList">
      <img className="emptyList-img" src="/images/emptyCart.png" />
      <div className="emptyList">
        <p className="subHeading my-4">Your {page} is empty.</p>
        <Link to="/store">
          <button className="btn btn-primary">Start Shopping</button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyList;
