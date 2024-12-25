import React, { useEffect } from "react";
import "./home.css";
import ProductCard from "../../components/productCard/productCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct } from "../../features/product/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.product);
  const wihlist = useSelector((state) => state?.product?.product);
  const getProduct = () => {
    dispatch(getAllProduct());
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="homewrapper">
      <div className="home-slider"></div>
      <div className="home-new-arrival">
        <h2>New Arrivals</h2>
        <div className="mt-5 d-flex new-arrival">
          {productState &&
            productState.map((item) => {
              if (item.tags == "new") {
                return <ProductCard data={item} key={item._id} />;
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
