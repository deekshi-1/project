import React from "react";
import "./sighnupUp.css";
import { Link } from "react-router-dom";

const Forgot = () => {
  return (
    <div className="py-5 ">
      <div className="row justify-content-center align-items-center login-wrappper">
        <div className="col-12">
          <div className="input-section">
            <h4 className="subHeading">Reset Your Password</h4>
            <h6 className="text-center description mb-3">
              Will send you reset link{" "}
            </h6>
            <form>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control mb-4"
                />
              </div>
              <div>
                <div className="d-flex justify-content-center align-items-center button-wrapper">
                  <button className="btn btn-primary  button description">
                    Reset
                  </button>
                  <Link to="/">
                    <button className="btn btn-danger button description">
                      Cancel
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

export default Forgot;
