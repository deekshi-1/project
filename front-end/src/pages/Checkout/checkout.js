import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import "./checkout.css";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { getAuthHeaders, base_url } from "../../utils/axiosConfig";
import { listAddress, order, viewCart } from "../../features/user/userSlice";
const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  address: yup.string().required("Address Details are Required"),
  state: yup.string().required("State is Required"),
  city: yup.string().required("City is Required"),
  country: yup.string().required("Country is Required"),
  pincode: yup.number().required("Pincode is Required"),
  other: yup.string(),
});

const CheckOut = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewCart());
    dispatch(listAddress());
  }, []);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });
  const [cartProductState, setCartProductState] = useState(null);
  const userAddressState = useSelector((state) => state?.auth?.address);
  const cartState = useSelector((state) => state.auth.cartProduct);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
      setTotalAmount(sum);
    }
  }, [cartState]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: selectedAddress?.addressLine1 || "",
      city: selectedAddress?.city || "",
      state: selectedAddress?.state || "",
      country: selectedAddress?.country || "",
      pincode: selectedAddress?.pincode || "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      setTimeout(() => {
        checkOutHandler();
      }, 300);
    },
  });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  useEffect(() => {
    if (cartState) {
      let items = [];
      for (let index = 0; index < cartState?.length; index++) {
        items.push({
          product: cartState[index].productId._id,
          quantity: cartState[index].quantity,
          color: cartState[index].color,
          price: cartState[index].price,
        });
      }
      setCartProductState(items);
    }
  }, [cartState]);
  const checkOutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to Load");
      return;
    }

    const result = await axios.post(
      `${base_url}user/order/checkout`,
      { amount: totalAmount + 10 },
      getAuthHeaders()
    );
    if (!result) {
      alert("Something Went Wrong");
      return;
    }

    const { amount, id: order_id, currency } = result.data.order;
    const options = {
      key: "rzp_test_L8qFGRbJYsRKed",
      amount: amount,
      currency: "INR",
      name: "shopyfy",
      description: "shopyfy Test Transaction",

      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };

        const result = await axios.post(
          `${base_url}user/order/paymentVerification`,
          data,
          getAuthHeaders()
        );

        await setPaymentInfo({
          razorpayPaymentId: response.razorpayPaymentId,
          razorpayOrderId: response.razorpayOrderId,
        });

        setTimeout(() => {
          console.log(response.razorpay_payment_id, response.razorpay_order_id);

          dispatch(
            order({
              totalPrice: totalAmount,
              orderItems: cartProductState,
              paymentInfo: {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
              },
              shippingInfo,
            })
          );
        }, 1000);
      },
      prefill: {
        name: "shopyfy",
        email: "shopyfy@example.com",
        contact: "9544540988",
      },
      notes: {
        address: "shoyfy kannur",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const handleAddressChange = (e) => {
    let value = userAddressState.find(
      (address) => address._id === e.target.value
    );
    setSelectedAddress(value || null);
    if (value) {
      formik.setValues({
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        address: value.addressLine1 || "",
        city: value.city || "",
        state: value.state || "",
        country: value.country || "",
        pincode: value.pincode || "",
        other: formik.values.other,
      });
    }
  };

  return (
    <div className="mx-auto mt-5" style={{ maxWidth: "900px" }}>
      <MDBRow>
        <MDBCol md="8" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader className="py-3">
              <MDBTypography tag="h5" className="mb-0">
                Biling details
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <div className="mb-4 pb-2">
                <MDBTypography tag="h6" className="mb-3">
                  Saved Address
                </MDBTypography>
                <select
                  className="select p-2 rounded bg-grey"
                  style={{ width: "100%" }}
                  onChange={handleAddressChange}
                  value={selectedAddress?._id || ""}
                >
                  <option value="" disabled>
                    Select an Address
                  </option>
                  {userAddressState && userAddressState?.length > 0 ? (
                    userAddressState?.map((address) => (
                      <option key={address._id} value={address._id}>
                        {address.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No saved addresses available</option>
                  )}
                </select>
              </div>

              <form onSubmit={formik.handleSubmit}>
                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput
                      label="First name"
                      type="text"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                    />
                    <div className="error">
                      {formik.touched.firstName && formik.errors.firstName}
                    </div>
                  </MDBCol>
                  <MDBCol>
                    <MDBInput
                      label="Last name"
                      type="text"
                      value={formik.values.lastName}
                      name="lastName"
                      onChange={formik.handleChange("lastName")}
                      onBlur={formik.handleBlur("lastName")}
                    />
                    <div className="error">
                      {formik.touched.lastName && formik.errors.lastName}
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBInput
                  label="Address"
                  type="text"
                  className="mt-3"
                  name="address"
                  value={
                    formik.values.address || selectedAddress?.addressLine1 || ""
                  }
                  onChange={formik.handleChange("address")}
                  onBlur={formik.handleBlur("address")}
                />
                <div className="error">
                  {formik.touched.address && formik.errors.address}
                </div>
                <MDBRow className="mt-4">
                  <MDBCol>
                    <MDBInput
                      label="City"
                      type="text"
                      name="city"
                      value={formik.values.city || selectedAddress?.city || ""}
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                    />
                    <div className="error">
                      {formik.touched.city && formik.errors.city}
                    </div>
                  </MDBCol>
                  <MDBCol>
                    <MDBInput
                      label="State"
                      name="state"
                      value={
                        formik.values.state || selectedAddress?.state || ""
                      }
                      onChange={formik.handleChange("state")}
                      onBlur={formik.handleBlur("state")}
                    />
                    <div className="error">
                      {formik.touched.state && formik.errors.state}
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mt-4">
                  <MDBCol>
                    <MDBInput
                      label="Country"
                      name="country"
                      value={
                        formik.values.country || selectedAddress?.country || ""
                      }
                      onChange={formik.handleChange("country")}
                      onBlur={formik.handleBlur("country")}
                    />
                    <div className="error">
                      {formik.touched.country && formik.errors.country}
                    </div>
                  </MDBCol>
                  <MDBCol>
                    <MDBInput
                      label="Pincode"
                      name="pincode"
                      value={
                        formik.values.pincode || selectedAddress?.pincode || ""
                      }
                      onChange={formik.handleChange("pincode")}
                      onBlur={formik.handleBlur("pincode")}
                    />
                    <div className="error">
                      {formik.touched.pincode && formik.errors.pincode}
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBTextArea
                  label="Additional information"
                  rows={4}
                  className="mt-4"
                  name="other"
                  value={formik.values.other}
                  onChange={formik.handleChange("other")}
                  onBlur={formik.handleBlur("other")}
                />
                <div className="w-100 mt-3">
                  <Link to="/cart" className="text-dark">
                    <BiArrowBack className="me-2" />
                    Return to Cart
                  </Link>
                  <button className="btn btn-primary float-right" type="submit">
                    Make purchase
                  </button>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader className="py-3">
              <MDBTypography tag="h5" className="mb-0">
                Summary
              </MDBTypography>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBListGroup>
                {cartState &&
                  cartState?.map((item) => (
                    <MDBListGroupItem
                      className="d-flex justify-content-between align-items-center border-0 px-0 pb-0"
                      key={item._id}
                    >
                      {item?.productId?.title}x{item?.quantity}
                      <span>${item?.quantity * item?.price}</span>
                    </MDBListGroupItem>
                  ))}

                <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span>$10</span>
                </MDBListGroupItem>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                    <strong>
                      <p className="mb-0">(including VAT)</p>
                    </strong>
                  </div>
                  <span>
                    <strong>${totalAmount + 10}</strong>
                  </span>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default CheckOut;
