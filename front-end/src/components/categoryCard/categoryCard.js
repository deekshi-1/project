import React from "react";
import "./categoryCard.css";
import { Link } from "react-router-dom";

const CategoryCard = (data) => {
  return (
    <div className="categoryCardwrapper mb-5">
      <div className="imageBanner mb-5">
        <Link>
          <img
            src="/images/products/headphone/headphone1.webp"
            alt="category-img"
            className="img-fluid"
          />
        </Link>
      </div>
      <div className="category-title mb-3">MOVSSOU E7</div>
    </div>
  );
};

export default CategoryCard;
