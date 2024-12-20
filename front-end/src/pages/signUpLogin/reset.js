import React from "react";
import "./sighnupUp.css";
import { Link } from "react-router-dom";


const Reset = () => {
  return (
    <div className="py-5 ">
      <div className="row justify-content-center align-items-center login-wrappper">
        <div className="col-12">
          <div className="input-section">
            <h4 className="subHeading">Reset Password</h4>
            <form>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  className="form-control mb-4"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="confirm password"
                  placeholder="Confirm Password"
                  className="form-control mb-4"
                />
              </div>
              <div>
                <div className="d-flex justify-content-center align-items-center button-wrapper">
                  <Link>
                    <button className="button btn1 description">Reset</button>
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

export default Reset;
