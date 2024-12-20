import React, { useEffect } from "react";
import "./wishlist.css";
import { useDispatch, useSelector } from "react-redux";
import { listwishList } from "../../features/user/userSlice";
import { wishlist } from "../../features/product/productSlice";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishListState = useSelector((state) => state?.auth?.wishlist?.wishList);
  
  useEffect(() => {
    dispatch(listwishList());
  }, []);

  const removeFromWishList = (id) => {
    dispatch(wishlist(id));
    setTimeout(() => {
      dispatch(listwishList());
    }, 100);
  };

  const updateQnty = () =>{}

  return (
    <div className="wishListWrapper">
      <h4>Wishlist</h4>
      <div className="d-flex gap-5 flex-wrap">
        {wishListState && wishListState.length === 0 && (
          <div> Nothing in wishList</div>
        )}
        {wishListState &&
          wishListState.map((item) => (
              <div className="productCardwrapper mb-3" key={item._id}>
                <div className=" addtoWishList">
                  <button onClick={() => removeFromWishList(item?._id)}>
                    X
                  </button>
                </div>
                <div className="imageBanner mb-5">
                  <img
                    src="/images/products/headphone/headphone1.webp"
                    alt="product-img"
                    className="img-fluid"
                  />
                </div>
                <div className="product-title">
                  <Link to={`/product/${item._id}`}>{item.title}</Link>
                </div>
                <div className="brand"> MOVSSOU</div>
                <div className="price mb-3">{item.price}</div>

                <button className="btn btn-primary">Add to cart</button>
              </div>
          ))}
      </div>
    </div>
  );
};

export default Wishlist;
