import React from "react";
import"./home.css"
import ProductCard from "../../components/productCard/productCard";


const Home = () => {
  return <div className="homewrapper">
    <div className="home-slider"></div>
    <div className="home-new-arrival">
      <h2>New Arrivals</h2>
      <div className="mt-5 d-flex new-arrival">
        <ProductCard/><ProductCard/><ProductCard/><ProductCard/><ProductCard/><ProductCard/><ProductCard/>
      </div>
    </div>
  </div>;
};

export default Home;
