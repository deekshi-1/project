import React, { useEffect } from "react";
import InputField from "../../components/InputField";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import "./sighnupUp.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const loginSchema = yup.object({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const dipatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, message } = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dipatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (isSuccess) {
      if (message) {
        toast.error(message);
      } else {
        toast.info("login sucessfull");
        navigate("/");
      }
    }
  }, [isSuccess, message, navigate]);

  return (
    <div className="py-5 ">
      <div className="row justify-content-center align-items-center login-wrappper">
        <div className="col-12">
          <div className="input-section">
            <h4 className="subHeading">Login</h4>
            <form onSubmit={formik.handleSubmit}>
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
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password ?
                </Link>
                <div className="d-flex justify-content-center align-items-center button-wrapper">
                  <button
                    type="submit"
                    className="btn btn-primary description button"
                  >
                    Login
                  </button>
                  <Link to="/signup">
                    <button className="btn btn-dark button description">
                      Signup
                    </button>
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

export default Login;
