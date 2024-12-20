import React, { useEffect } from "react";
import "./store.css";
import ProductCard from "../../components/productCard/productCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../features/product/productSlice";

const Store = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.product );  
  const getProduct = () => {
    dispatch(getAllProduct());
  };
  
    useEffect(() => {
      getProduct();
    },[]);

  return (
    <div className="Store-Wrapper pt-5">
      <div className="col-3 leftSide">
        <h4 className="subHeading">Shop by Category</h4>
        <ul className="ps-3">
          <li className="description">ssss</li>
          <li className="description">ssss</li>
        </ul>
        <h4 className="subHeading mt-5">Filter Products</h4>
        <div className="filtersection">
          <h5 className="subHeading categoryHading">Price</h5>
          <div className="d-flex align-items-center gap-3">
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingInput1"
                placeholder="Min"
              />
              <label htmlFor="floatingInput1">Min</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingInput2"
                placeholder="Max"
              />
              <label htmlFor="floatingInput2">Max</label>
            </div>
          </div>
          <h5 className="subHeading categoryHading">Color</h5>
          <div className="color-check ">
            <input
              className="color-check-input"
              type="checkbox"
              value="Black"
              id=""
            />
            <label>Black</label>
          </div>
          <div className="color-check">
            <input
              className="color-check-input"
              type="checkbox"
              value="White"
              id=""
            />
            <label>White</label>
          </div>
          <div className="color-check">
            <input
              className="color-check-input"
              type="checkbox"
              value="Red"
              id=""
            />
            <label>Red</label>
          </div>
          <div className="color-check">
            <input
              className="color-check-input"
              type="checkbox"
              value="Blue"
              id=""
            />
            <label>Blue</label>
          </div>
          <div className="color-check">
            <input
              className="color-check-input"
              type="checkbox"
              value="Yellow"
              id=""
            />
            <label>Yelllow</label>
          </div>
        </div>
      </div>
      <div className="col-9 products-sortSection">
        <div className="sorting-div mb-5">
          <div className="d-flex align-items-center gap-10">
            <h5 className="subHeading">Sort By:</h5>
            <select
              name=""
              className="ps-2 form-control form-select select-section"
              id=""
            >
              <option value="popular">Popular</option>
              <option value="name-Asc">Alphebetically A-Z</option>
              <option value="name-Desc">Alphebetically Z-A</option>
              <option value="price-Asc">Price low to high</option>
              <option value="price">Price high to low</option>
              <option value="new">New Arrival</option>
            </select>
          </div>
        </div>
        <div className="products d-flex">
          {productState &&
            productState.map((item) => (
              <ProductCard data={item} key={item._id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
