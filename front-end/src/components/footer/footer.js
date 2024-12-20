import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import {
  TbMailbox,
  TbBrandInstagram,
  TbBrandLinkedinFilled,
  TbBrandGithub,
  TbBrandTwitter,
} from "react-icons/tb";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="mb-3 row footerTopBlock">
        <div className="col-6 d-flex align-items-center">
          <TbMailbox className="newletterIcon" />
          Subscribe for Newsletter
        </div>
        <div className="col-6">
          <input placeholder="Your eamil" />
          <button className="btn btn-secondary">Subscribe</button>
        </div>
      </div>
      <div className="d-flex midBlock">
        <div className="col-3">
          <div className="subHeading">Category</div>
          <div className="description">pick1</div>
          <div className="description">pick1</div>
          <div className="description">pick1</div>
          <div className="description">pick1</div>
        </div>
        <div className="col-3">
          <div className="subHeading">Customer Relation</div>
          <div className="description">
            <Link to="/faq">FAQ</Link>
          </div>
          <div className="description">
            <Link to="/privacy">Privacy policy</Link>
          </div>
          <div className="description">
            <Link to="/terms-and-condition">T&C</Link>
          </div>
        </div>
        <div className="col-4">
          <div className="subHeading">Our App</div>
          <div className="d-flex storeIcons">
            <a href="https://apps.apple.com/in/app">
              <img src="/images/logos/appStore.png" alt="appStore" />
            </a>
            <a href="https://play.google.com/store/games?hl=en">
              <img src="/images/logos/playStore.png" alt="playStore" />
            </a>
          </div>
        </div>
      </div>
      <div className="d-flex midBlock category-section">
        <div className="col-5">
          <div className="subHeading midBlock-subHeading">Contact us</div>
          <div className="category-description description">
            <address>
              Deepa Nivas Pulliode
              <br />
              Kannur Kerala
              <br />
              PIN: 670642
            </address>
            <a href="tel:+91 9544540988">+91 9544540988</a>
            <a href="mailto:deekshithc1@gmail.com">deekshithc1@gmail.com</a>
          </div>
        </div>
        <div className="col-5 ">
          <div className="subHeading midBlock-subHeading">Socials</div>
          <div className="social-icon-div">
            <a href="https://www.instagram.com/_deekshi_._/?hl=en">
              <TbBrandInstagram className="social-icon" />
            </a>
            <a href="https://www.linkedin.com/in/deekshith-c-a7aaa81b3/">
              <TbBrandLinkedinFilled className="social-icon" />
            </a>
            <a href="https://github.com/deekshi-1">
              <TbBrandGithub className="social-icon" />
            </a>
            <a href="https://www.instagram.com/_deekshi_._/?hl=en">
              <TbBrandTwitter className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-3 description copyright-section">
        &copy; {new Date().getFullYear()}Developed By Deekshith
      </div>
    </div>
  );
};

export default Footer;
