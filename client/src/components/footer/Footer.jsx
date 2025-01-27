import React from "react";
import "./Footer.css";
import logo from "../../assets/QuickcuisineLogo.png";
import { assets } from "../../assets/frontend_assets/assets.js";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={logo} alt="" />
          <p>
            Hello! This is Vivek - developer of the web page . Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, praesentium dolor? Tempore explicabo ad architecto harum consectetur nulla laborum fuga excepturi.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} />
            <img src={assets.twitter_icon} />
            <img src={assets.linkedin_icon} />
          </div>
        </div>
        <div className="footer-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>about</li>
            <li>delivery</li>
            <li>privacy property</li>
          </ul>
        </div>
        <div className="footer-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-45646-46549</li>
            <li>contact@quickquisine.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 &copy; QuickQuisine.com - All Right Reserved.
      </p>
    </div>
  );
}

export default Footer;
