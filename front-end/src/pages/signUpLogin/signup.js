import React, { useEffect } from "react";

import "./sighnupUp.css";
import InputField from "../../components/InputField";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const signUpSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  mobile: yup.string().required("Mobile Number is required"),
  password: yup.string().required("Password is required"),
});
const Signup = () => {
  const dipatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      if (message) {
        toast.error(message);
      } else {
        toast.info("User account Created");
      }
    }
  }, [isSuccess, message, navigate]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values, { resetForm }) => {
      dipatch(registerUser(values));
      resetForm();
    },
  });

  return (
    <div className="py-5 ">
      <div className="row justify-content-center align-items-center login-wrappper">
        <div className="col-12">
          <div className="input-section">
            <h4 className="subHeading mb-3">Create Account</h4>
            <form onSubmit={formik.handleSubmit}>
              <InputField
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="mb-4"
                onChange={formik.handleChange("firstName")}
                value={formik.values.firstName}
                onBlur={formik.handleBlur("firstName")}
              />
              <div className="error">
                <span>
                  {formik.touched.firstName && formik.errors.firstName}
                </span>
              </div>
              <InputField
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="mb-4"
                onChange={formik.handleChange("lastName")}
                value={formik.values.lastName}
                onBlur={formik.handleBlur("lastName")}
              />
              <div className="error">
                <span>{formik.touched.lastName && formik.errors.lastName}</span>
              </div>
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                className="mb-4"
                onChange={formik.handleChange("email")}
                value={formik.values.email}
                onBlur={formik.handleBlur("email")}
              />
              <div className="error">
                <span>{formik.touched.email && formik.errors.email}</span>
              </div>
              <InputField
                type="text"
                name="Number"
                placeholder="Mob Number"
                className="mb-4"
                onChange={formik.handleChange("mobile")}
                value={formik.values.mobile}
                onBlur={formik.handleBlur("mobile")}
              />
              <div className="error">
                <span>{formik.touched.mobile && formik.errors.mobile}</span>
              </div>
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                className="mb-4"
                onChange={formik.handleChange("password")}
                value={formik.values.password}
                onBlur={formik.handleBlur("password")}
              />
              <div className="error">
                <span>{formik.touched.password && formik.errors.password}</span>
              </div>
              <div>
                <div className="d-flex justify-content-center align-items-center button-wrapper">
                  <button
                    type="submit"
                    className="btn btn-success button description"
                  >
                    Signup
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
