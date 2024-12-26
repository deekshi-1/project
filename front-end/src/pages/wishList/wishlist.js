import React, { useEffect } from "react";
import "./wishlist.css";
import { useDispatch, useSelector } from "react-redux";
import { listwishList } from "../../features/user/userSlice";
import { wishlist } from "../../features/product/productSlice";
import { Link } from "react-router-dom";
import EmptyList from "../../components/emptyList";

const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listwishList());
  }, []);
  const wishListState = useSelector((state) => state?.auth?.wishlist?.wishList);

  const removeFromWishList = (id) => {
    dispatch(wishlist(id));
    setTimeout(() => {
      dispatch(listwishList());
    }, 100);
  };

  const updateQnty = () => {};

  return (
    <div className="wishListWrapper">
      <h4>Wishlist</h4>
      <div className="d-flex gap-5 flex-wrap">
        {wishListState && wishListState?.length === 0 && (
          <EmptyList page="wishlist" />
        )}
        {wishListState &&
          wishListState?.map((item) => (
            <div className="productCardwrapper mb-3" key={item._id}>
              <div className=" addtoWishList">
                <button onClick={() => removeFromWishList(item?._id)}>X</button>
              </div>
              <div className="imageBanner mb-5">
                <img
                  src={item?.images[0]}
                  alt="product-img"
                  className="img-fluid"
                />
              </div>
              <div className="product-title">
                <Link to={`/product/${item._id}`}>{item.title}</Link>
              </div>
              <div className="brand"> {item.brand}</div>
              <div className="price mb-3">{item.price}</div>
              <div className="price mb-3">{item.short_description}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Wishlist;
