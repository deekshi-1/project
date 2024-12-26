import React, { useEffect } from "react";
import "./sighnupUp.css";
import InputField from "../../components/InputField";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { resetPass } from "../../features/user/userSlice";
const passwordSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const Reset = () => {
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state?.auth);
  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
    if (isError) {
      console.error(message);
    }
  }, [isSuccess, isError, message, navigate]);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      console.log(getToken, values.password);
      dispatch(resetPass({ token: getToken, password: values.password }));
    },
  });

  return (
    <div className="py-5 ">
      <div className="row justify-content-center align-items-center login-wrappper">
        <div className="col-12">
          <div className="input-section">
            <h4 className="subHeading">Reset Password</h4>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-flex flex-column gap-15"
            >
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
                    className="button btn1 description black px-3"
                    type="submit"
                  >
                    Reset
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

export default Reset;
