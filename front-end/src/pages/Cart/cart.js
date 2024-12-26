import React, { useEffect, useState } from "react";
import "./cart.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  viewCart,
  rmCartItem,
  updCartItem,
} from "../../features/user/userSlice";
import EmptyList from "../../components/emptyList";

const Cart = () => {
  const dispatch = useDispatch();
  const [updatedValue, setNewQnty] = useState(null);
  const [totalAmount, setTotal] = useState(null);
  useEffect(() => {
    dispatch(viewCart());
  }, []);
  const cartListState = useSelector((state) => state?.auth?.cartProduct);

  const removeItem = (id) => {
    dispatch(rmCartItem(id));
    setTimeout(() => {
      dispatch(viewCart());
    }, 100);
  };

  useEffect(() => {
    if (updatedValue !== null) {
      dispatch(
        updCartItem({
          cartItemId: updatedValue?.cartItemId,
          newQnty: updatedValue?.newQnty,
        })
      );
      setTimeout(() => {
        dispatch(viewCart());
      }, 100);
    }
  }, [updatedValue]);

  useEffect(() => {
    let total = 0;
    for (let index = 0; index < cartListState?.length; index++) {
      total =
        total + cartListState[index].quantity * cartListState[index].price;
    }
    setTotal(total);
  }, [cartListState]);

  return (
    <div className="cart-wrapper">
      <h4 className="mb-4">Cart</h4>
      {cartListState && cartListState.length > 0 ? (
        <>
          {cartListState?.map((item) => (
            <div className="cart-item" key={item._id}>
              <div className="cart-item-img">
                <img
                  src={item?.productId?.images[0]}
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="cart-item-name subHeading col-3">
                {item?.productId?.title}
              </div>
              <div className=" col-2 cart-item-quantity">
                <input
                  type="number"
                  className="form-control"
                  value={item?.quantity}
                  onChange={(e) =>
                    setNewQnty({
                      cartItemId: item?._id,
                      newQnty: e.target.value,
                    })
                  }
                  min={1}
                />
              </div>
              <div className="cart-item-price col-2">${item?.price}</div>
              <div className="cart-item-remove col-1">
                <button
                  onClick={() => removeItem(item?._id)}
                  className="removeBtnOuter"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          ))}

          {totalAmount && totalAmount !== 0 && (
            <div className="Final">
              <div className="checkOut mb-4">
                Total price: ${totalAmount + 1}
              </div>
              <div className="checkOut">
                <Link to="/checkout">
                  <button type="button" className="btn btn-success">
                    Check Out
                  </button>
                </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="empty-cart">
          <EmptyList page="Cart" />
        </div>
      )}
    </div>
  );
};

export default Cart;
