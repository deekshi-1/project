import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./address.css";
import {
  listAddress,
  newAdress,
  rmAddressItem,
} from "../../features/user/userSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useFormik } from "formik";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBInput,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
import * as yup from "yup";

const AddressSchema = yup.object({
  name: yup.string().required("Name is Required"),
  addressLine1: yup.string().required("Address Details are Required"),
  state: yup.string().required("State is Required"),
  city: yup.string().required("City is Required"),
  country: yup.string().required("Country is Required"),
  pincode: yup.number().required("Pincode is Required"),
});

const Address = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      addressLine1: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
    },
    validationSchema: AddressSchema,
    onSubmit: (values) => {
      dispatch(newAdress({ newAddress: values }));
      setShowAddAddress(false);
      formik.resetForm();
      setTimeout(() => {
        listAddress();
      }, 300);
    },
  });

  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.auth?.address);
  const [showAddress, setShowAddress] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const handleAddAddress = () => {
    setShowAddAddress(true);
  };

  const removeItem = (id) => {
    dispatch(rmAddressItem(id));
    setTimeout(() => {
      dispatch(listAddress());
    }, 100);
  };
  const addressListState = useSelector((state) => state?.auth?.address);
  useEffect(() => {
    dispatch(listAddress());
  }, [addressListState]);
  return (
    <div>
      <h3
        className="my-4 p-2 address-wrapper"
        address-wrapper
        onClick={() => setShowAddress(!showAddress)}
      >
        Addresses
      </h3>
      {showAddress && (
        <div className="address-section mb-3">
          {userState?.length > 0 && userState !== null ? (
            userState?.map((item) => (
              <div key={item._id} className="mb-2 p-2 addressBlock">
                <p className="mb-3">
                  <b className="me-5">{item.name}</b>
                  <span onClick={() => removeItem(item?._id)}>
                    <RiDeleteBin6Line />
                  </span>
                </p>
                <div className="d-flex gap-3">
                  <p className="mb-3">
                    <b>House/street</b>: {item.house_street}
                  </p>
                  <p className="mb-3">
                    <b>City</b>: {item.city}
                  </p>
                  <p className="mb-3">
                    <b>State</b>: {item.state}
                  </p>
                  <p className="mb-3">
                    <b>Country</b>: {item.country}
                  </p>
                  <p className="mb-3">
                    <b>Pincode</b>: {item.pincode}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No addresses available</p>
          )}
          {!showAddAddress && (
            <button className="btn btn-primary mt-3" onClick={handleAddAddress}>
              Add Address
            </button>
          )}
          {showAddAddress && (
            <div className="mt-5">
              <MDBRow>
                <MDBCol md="8" className="mb-4">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <form onSubmit={formik.handleSubmit}>
                        <MDBRow className="mb-4">
                          <MDBCol>
                            <MDBInput
                              label="Name"
                              type="text"
                              value={formik.values.name}
                              name="lastName"
                              onChange={formik.handleChange("name")}
                              onBlur={formik.handleBlur("name")}
                            />
                            <div className="error">
                              {formik.touched.name && formik.errors.name}
                            </div>
                          </MDBCol>
                        </MDBRow>
                        <MDBInput
                          label="Address"
                          type="text"
                          className="mt-3"
                          name="address"
                          value={formik.values.addressLine1}
                          onChange={formik.handleChange("addressLine1")}
                          onBlur={formik.handleBlur("addressLine1")}
                        />
                        <div className="error">
                          {formik.touched.addressLine1 &&
                            formik.errors.addressLine1}
                        </div>
                        <MDBRow className="mt-4">
                          <MDBCol>
                            <MDBInput
                              label="City"
                              type="text"
                              name="city"
                              value={formik.values.city}
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
                              value={formik.values.state}
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
                              value={formik.values.country}
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
                              value={formik.values.pincode}
                              onChange={formik.handleChange("pincode")}
                              onBlur={formik.handleBlur("pincode")}
                            />
                            <div className="error">
                              {formik.touched.pincode && formik.errors.pincode}
                            </div>
                          </MDBCol>
                        </MDBRow>
                        <div className="w-100 mt-3">
                          <button
                            className="btn btn-primary float-right"
                            type="submit"
                          >
                            Add Address
                          </button>
                        </div>
                      </form>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Address;
