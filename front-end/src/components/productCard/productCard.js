import React, { useState, useEffect } from "react";
import "./productCard.css";
import { Link, useLocation } from "react-router-dom";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { wishlist } from "../../features/product/productSlice";

const ProductCard = (props) => {
  const wishListState = useSelector((state) => state?.auth?.wishlist?.wishList);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [inList, setInList] = useState(false);
  const { data, buttonName } = props;
  let isInWishlisted = wishListState?.find((item) => item._id === data?._id);
  useEffect(() => {
    if (isInWishlisted) {
      setInList(true);
    }
  }, []);
  let loc = useLocation();
  const addtoWishList = (id) => {
    setInList(!inList);
    if (user) {
      dispatch(wishlist(id));
    } else {
      alert("Login to use this feature");
    }
  };
  return (
    <div
      className={
        loc.pathname === "/store" ? "store-col mb-3" : "productCardwrapper mb-3"
      }
    >
      <div className=" addtoWishList">
        <button onClick={() => addtoWishList(data?._id)}>
          {inList  ? <GoHeartFill className="fillHeart"/> : <GoHeart />}
        </button>
      </div>
      <div className="imageBanner mb-5">
        <img
          src="/images/products/headphone/headphone1.webp"
          alt="product-img"
          className="img-fluid"
        />
      </div>
      <div className="product-title">{data.title}</div>
      <div className="brand"> MOVSSOU</div>
      <div className="price mb-3">{data.price}</div>
      <Link to={`/product/${data._id}`}>
        <button className="btn btn-primary">View Product</button>
      </Link>
    </div>
  );
};

export default ProductCard;
