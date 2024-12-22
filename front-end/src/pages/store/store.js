import React, { useEffect, useState } from "react";
import "./store.css";
import ProductCard from "../../components/productCard/productCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProduct,
  getFilterProduct,
} from "../../features/product/productSlice";

const Store = () => {
  const dispatch = useDispatch();
  const [dispBrands, setDisPBrands] = useState([]);
  const [dispCategories, setDisCategories] = useState([]);
  const [dispTags, setDisTags] = useState([]);
  const productState = useSelector((state) => state?.product?.product);
  const filter = useSelector((state) => state?.product?.filter);

  const [tag, setTag] = useState(null);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  const getProduct = () => {
    dispatch(
      getFilterProduct({ sort, tag, brand, category, minPrice, maxPrice })
    );
  };

  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newtags = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newBrands.push(element.brand);
      category.push(element.category);
      newtags.push(element.tags);
    }
    newBrands = [...new Set(newBrands)];
    category = [...new Set(category)];
    newtags = [...new Set(newtags)];
    setDisPBrands(newBrands);
    setDisCategories(category);
    setDisTags(newtags);
  }, [filter]);

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  useEffect(() => {
    getProduct();
  }, [sort, tag, brand, category, minPrice, maxPrice]);

  return (
    <div className="Store-Wrapper pt-5">
      <div className="col-3 leftSide">
        <h4 className="subHeading">Shop by Category</h4>
        <ul className="ps-3">
          {dispCategories &&
            dispCategories.map((item, index) => (
              <li
                key={index}
                onClick={() => setCategory(item)}
                className="description"
              >
                {item}
              </li>
            ))}
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
                min={1}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <label htmlFor="floatingInput1">Min</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingInput2"
                placeholder="Max"
                min={2}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
              <label htmlFor="floatingInput2">Max</label>
            </div>
          </div>
          <h5 className="subHeading categoryHading">Brands</h5>
          <div className="brandDiv">
            <ul className="ps-3">
              {dispCategories &&
                dispCategories.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => setCategory(item)}
                    className="description"
                  >
                    {item}
                  </li>
                ))}
            </ul>
          </div>
          <h5 className="subHeading categoryHading">Tags</h5>
          <div className="brandDiv">
            <ul className="ps-3">
              {dispCategories &&
                dispCategories.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => setCategory(item)}
                    className="description"
                  >
                    {item}
                  </li>
                ))}
            </ul>
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
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="title">Alphebetically A-Z</option>
              <option value="-title">Alphebetically Z-A</option>
              <option value="price">Price low to high</option>
              <option value="-price">Price high to low</option>
              <option value="createdAt">New Arrival</option>
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
