import React, { useContext, useState } from "react";
import logo from "../../assets/QuickcuisineLogo.png";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { storeContext } from "../../context/StateContext.jsx";

function Navbar({ setPopup }) {
  let navigate = useNavigate();
  let [menu, setMenu] = useState("home");
  let { findTotal, isAuthenticated, setIsAuthenticated,errMsg } =
    useContext(storeContext);
  let [dropdown, setdropdown] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="Navbar">
      <Link to="/">
        <img src={logo} className="nav-logo" />
      </Link>
      <ul className="nav-menu">
        <Link
          to="/"
          className={menu === "home" ? "active" : ""}
          onClick={() => {
            setMenu("home");
          }}
        >
          home{" "}
        </Link>
        <a
          href="#exploremenu"
          className={menu === "menu" ? "active" : ""}
          onClick={() => {
            setMenu("menu");
          }}
        >
          menu
        </a>
        <a
          href="#appdownload"
          className={menu === "mob-app" ? "active" : ""}
          onClick={() => {
            setMenu("mob-app");
          }}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          className={menu === "contact" ? "active" : ""}
          onClick={() => {
            setMenu("contact");
          }}
        >
          contact us
        </a>
      </ul>
      <div className="nav-right">
        <img src={assets.search_icon} alt="" className="icon" />
        <div className="nav-cart">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" className="icon" />
          </Link>
          {findTotal() !== 0 && <div className="badge"></div>}
        </div>
        {!isAuthenticated ? (
          <button
            onClick={() => {
              setPopup(true);
            }}
          >
            Sign In
          </button>
        ) : (
          <div className="nav-profile-container">
            <img
              src={assets.profile_icon}
              onClick={() => {
                if (!dropdown) {
                  return setdropdown(true);
                }
                setdropdown(false);
              }}
              className="icon"
            />
            {dropdown && (
              <ul className="nav-profile-dropdown">
                <li
                  onClick={() => {
                    logout();
                    setdropdown(false);
                  }}
                >
                  {" "}
                  <img src={assets.logout_icon} alt="" /> <p>Logout</p>
                </li>
                <hr />
                <li
                  onClick={() => {
                    setdropdown(false);
                    if(isAuthenticated){
                      navigate("/myorders")
                    }else{
                      errMsg("Please Login to proceed!")
                    }
                  }}
                >
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
