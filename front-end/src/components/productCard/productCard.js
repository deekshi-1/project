import React from "react";
import "./productCard.css";
import { Link } from "react-router-dom";

const ProductCard = (data) => {
  return (
    <div className="productCardwrapper mb-5">
      <div className="imageBanner mb-5">
        <Link>
          <img
            src="/images/products/headphone/headphone1.webp"
            alt="product-img"
            className="img-fluid"
          />
        </Link>
      </div>
      <div className="product-title">MOVSSOU E7</div>
      <div className="brand"> MOVSSOU</div>
      <div className="price mb-3">46.99</div>
    </div>
  );
};

export default ProductCard;
