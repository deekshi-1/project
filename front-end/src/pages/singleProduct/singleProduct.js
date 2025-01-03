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
  const userState = useSelector((state) => state?.auth?.user);
  const [filtered, setFiltered] = useState(null);
  const [userReview, setuserReview] = useState(null);
  const [] = useState(true);
  console.log(productState?.rating);

  const addToCart = () => {
    if (color === null) {
      toast.error("pick a color");
    } else {
      if (!alreadExist) {
        dispatch(
          addCart({
            productId: productState?._id,
            color,
            quantity,
            price: productState?.price,
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
    let nArray = productState?.rating?.filter(
      (rating) => rating.postedBy.toString() !== userState?._id
    );
    console.log(nArray);
  }, [productState]);

  useEffect(() => {
    const nArray = productState?.rating?.filter(
      (rating) => rating.postedBy.toString() !== userState?._id
    );
    const uArray = productState?.rating?.filter(
      (rating) => rating.postedBy.toString() !== userState?._id
    );
    setFiltered(nArray);
    setuserReview(uArray);
  }, [productState, userState?._id]);

  return (
    <div className="main-product-wrapper py-5">
      <div className="row w-100">
        <div className="col-6 d-flex justify-content-center align-items-centeralign-items-center">
          <img
            src={productState?.images[0]}
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
            value={productState?.totalrating}
            color2={"#ffd700"}
            edit={false}
          />
          <h5 className="mb-2">Description</h5>
          <div
            className="description mb-5"
            dangerouslySetInnerHTML={{
              __html: productState?.description,
            }}
          ></div>
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
          </div>
        </div>
      </div>
      <div className="review-Section">
        <div className="product-review">
          <h4 className="mb-3">Product Reviews</h4>
          <div className="add-review">
            {}
            <h5>Add Review </h5>
            <ReactStars
              count={5}
              size={24}
              value={userReview?.star}
              color2={"#ffd700"}
            />
            <div className="form-group">
              <label>Write your review</label>
              <textarea
                className="form-control"
                id="review1"
                rows="3"
                value={userReview?.star}
              ></textarea>
              <button className=""></button>
            </div>
          </div>

          {filtered &&
            filtered?.map((item, index) => (
              <ReviewCard key={index} {...item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
