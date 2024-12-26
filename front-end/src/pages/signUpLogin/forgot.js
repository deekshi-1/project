import React from "react";
import "./sighnupUp.css";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { forgotPass } from "../../features/user/userSlice";

const emailSchema = yup.object({
  email: yup
    .string()
    .email("EMail Should be valid")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Email must be a valid email address"
    )
    .required("Email Address is Required"),
});

const Forgot = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(forgotPass(values));
      formik.resetForm();
    },
  });
  return (
    <div className="py-5 ">
      <div className="row justify-content-center align-items-center login-wrappper">
        <div className="col-12">
          <div className="input-section">
            <h4 className="subHeading">Reset Your Password</h4>
            <h6 className="text-center description mb-3">
              Will send you reset link{" "}
            </h6>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-flex flex-column gap-15"
            >
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
              <div>
                <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                  <button
                    className="button border-0 black p-2 mb-2"
                    type="submit"
                  >
                    Reset
                  </button>
                  <Link className="black" to="/login">
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
