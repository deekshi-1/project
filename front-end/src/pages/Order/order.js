import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/user/userSlice";

const Order = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(
    (state) => state?.auth?.getorderedProduct?.orders
  );
  console.log(orderState);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div className="Page-wrapper">
      <div className=" pageHeading mb-4">Order</div>{" "}
      <div className="row m-0">
        <div className="col-12">
          <div className="row">
            <div className="col-3">
              <h5>Order Id</h5>
            </div>
            <div className="col-3">
              <h5>Total Amount</h5>
            </div>

            <div className="col-3">
              <h5>Status</h5>
            </div>
          </div>
        </div>
        <div className="col-12 mt-3">
          {orderState &&
            orderState?.map((item, index) => (
              <div
                style={{ backgroundColor: "#febd69" }}
                className="row pt-3 my-3"
                key={index}
              >
                <div className="col-3">
                  <p>{item?._id}</p>
                </div>
                <div className="col-3">
                  <p>{item?.totalPrice}</p>
                </div>

                <div className="col-3">
                  <p>{item?.orderStaus}</p>
                </div>
                <div className="col-12">
                  <div
                    className="row py-3"
                    style={{ backgroundColor: "#232f3e" }}
                  >
                    <div className="col-3">
                      <h6 className="text-white">Product Name</h6>
                    </div>
                    <div className="col-3">
                      <h6 className="text-white">Quantity</h6>
                    </div>
                    <div className="col-3">
                      <h6 className="text-white">Price</h6>
                    </div>
                    <div className="col-3">
                      <h6 className="text-white">Color</h6>
                    </div>
                    {item?.orderItems?.map((i, index) => {
                      return (
                        <div className="col-12">
                          <div className="row  p-3">
                            <div className="col-3">
                              <p className="text-white">{i?.product?.title}</p>
                            </div>
                            <div className="col-3">
                              <p className="text-white">{i?.quantity}</p>
                            </div>
                            <div className="col-3">
                              <p className="text-white">{i?.price}</p>
                            </div>
                            <div className="col-3">
                              <p className="text-white">{i?.color}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
