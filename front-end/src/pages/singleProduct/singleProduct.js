import React, { useEffect, useState } from "react";
import "./singleProduct.css";
import ReviewCard from "../../components/review/review";
import ReactStars from "react-stars";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singleProduct } from "../../features/product/productSlice";
import { viewCart } from "../../features/user/userSlice";
import { addCart } from "../../features/user/userSlice";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState(null);
  const [alreadExist, setAlreadyExist] = useState(false);
  const [quantity, setQnty] = useState(1);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.singleProduct);
  const cartState = useSelector((state) => state?.auth?.cartProduct);
  const addToCart = () => {
    if (color === null) {
      toast.error("pick a color");
    } else {
      if (!alreadExist) {
        dispatch(
          addCart({
            productId: productState._id,
            color,
            quantity,
            price: productState.price,
          })
        );
        setAlreadyExist(true);
        toast.info("Item added to cart");
      }
    }
  };
  useEffect(() => {
    dispatch(singleProduct(id));
    dispatch(viewCart());
  }, []);

  useEffect(() => {
    for (let i = 0; i < cartState?.length; i++) {
      if (id === cartState[i].productId?._id) {
        setAlreadyExist(true);
      }
    }
  }, [alreadExist, addCart()]);

  return (
    <div className="main-product-wrapper py-5">
      <div className="row w-100">
        <div className="col-6 d-flex justify-content-center align-items-centeralign-items-center">
          <img
            src="/images/products/headphone/headphone1.webp"
            alt=""
            className="img-fluid productImg"
          />
        </div>
        <div className="col-6 col align-items-center">
          <h3 className="mb-2">{productState?.title}</h3>
          <h5 className="mb-2">{productState?.price}</h5>
          <ReactStars
            count={5}
            size={24}
            value={3.5}
            color2={"#ffd700"}
            edit={false}
          />
          <h5 className="mb-2">Description</h5>
          <div className="description mb-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
          <h5 className="mb-2">Color</h5>
          <div className="colorPick mb-5">
            {productState?.color &&
              productState?.color.map((item, index) => (
                <div className="form-check form-check-inline" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id={`inlineRadio${index}`}
                    value={item}
                    onChange={() => setColor(item)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`inlineRadio${index}`}
                  >
                    {item}
                  </label>
                </div>
              ))}
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Quantity</label>
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control mb-4 mx-2 qntyInput"
                defaultValue="1"
                min="1"
                onChange={(e) => setQnty(e.target.value)}
              />
            </div>
          </div>
          <div className="buy-wishList">
            <button
              type="button"
              className="btn btn-success "
              onClick={() => {
                alreadExist ? navigate("/cart") : addToCart();
              }}
            >
              {alreadExist ? "View Cart" : "Add to Cart"}
            </button>
            <button type="button" className="btn btn-danger mx-3"></button>
          </div>
        </div>
      </div>
      <div className="review-Section">
        <div className="product-review">
          <h4 className="mb-3">Product Reviews</h4>
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
        <div className="add-review">
          <h5>Add Review </h5>
          <ReactStars count={5} size={24} color2={"#ffd700"} />
          <div className="form-group">
            <label>Write your review</label>
            <textarea className="form-control" id="review1" rows="3"></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
