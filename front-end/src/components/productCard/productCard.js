import React from "react";
import "./productCard.css";
import { Link, useLocation } from "react-router-dom";

const ProductCard = (data) => {
  let loc = useLocation();
  return (
    <div
      className={
        loc.pathname == "/store" ? "store-col mb-5" : "productCardwrapper mb-5" 
      }
    >
      <div className="imageBanner mb-5">
        <img
          src="/images/products/headphone/headphone1.webp"
          alt="product-img"
          className="img-fluid"
        />
      </div>
      <div className="product-title">MOVSSOU E7</div>
      <div className="brand"> MOVSSOU</div>
      <div className="price mb-3">46.99</div>
      <Link>
        <button className="btn btn-primary">View product</button>
      </Link>
    </div>
  );
};

export default ProductCard;
