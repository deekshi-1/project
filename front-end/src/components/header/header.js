import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaRegUser, FaHeart, FaShoppingBag, FaSearch } from "react-icons/fa";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { singleProduct } from "../../features/product/productSlice";
import { listwishList } from "../../features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state?.auth);
  const productState = useSelector((state) => state?.product?.product);
  const [productOpt, setProductOpt] = useState([]);
  const [paginate, setPaginate] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.user !== null) {
      dispatch(listwishList());
    }
  }, [authState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);
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
          <Typeahead
            id="pagination-example"
            onPaginate={() => console.log("Results paginated")}
            onChange={(selected) => {
              navigate(`/product/${selected[0]?.prod}`);
              dispatch(singleProduct(selected[0]?.prod));
            }}
            options={productOpt}
            paginate={paginate}
            labelKey={"name"}
            minLength={2}
            placeholder="Search for Products here..."
          />
          <FaSearch className="searchIcon" />
        </div>
        <div className="fit-width row Right">
          <div className="fit-width Right header-profile">
            <Link to={authState?.user === null ? "/login" : "/profile"}>
              <FaRegUser color="white" />
              {authState?.user === null ? "Logn" : authState?.user?.firstName}
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
