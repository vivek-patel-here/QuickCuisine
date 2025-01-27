import React, { useContext, useEffect } from "react";
import "./Login_signup.css";
import { useState } from "react";
import { assets } from "../../assets/frontend_assets/assets.js";
import { storeContext } from "../../context/StateContext.jsx";

function Login_signup({ setPopup }) {
  const [Pagestate, setPagestate] = useState("Login");
  const { url, errMsg, successMsg, isAuthenticated, setIsAuthenticated } =
    useContext(storeContext);

  const [credentials, setcredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setcredentials((prevCred) => {
      return { ...prevCred, [e.target.name]: [e.target.value] };
    });
  };

  const onLogin = async () => {
    let response = await fetch(`${url}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email.toString(),
        password: credentials.password.toString(),
      }),
    });

    let data = await response.json();
    if (!data.success) {
      return errMsg(data.message);
    }
    successMsg(data.message);
    localStorage.setItem("token", data.jwtToken);
    setIsAuthenticated(true);
    setPopup(false);
  };

  const onSignup = async () => {
    let response = await fetch(`${url}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username.toString(),
        email: credentials.email.toString(),
        password: credentials.password.toString(),
      }),
    });

    let data = await response.json();

    if (!data.success) {
      errMsg(data.message);
    } else {
      localStorage.setItem("token", data.jwtToken);
      setIsAuthenticated(true);
      setPopup(false);
      successMsg(data.message);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (Pagestate == "Login") {
      onLogin();
    } else {
      onSignup();
    }
  };

  return (
    <div className="page-container">
      <form onSubmit={onSubmit} className="loginform">
        <div className="form-header">
          <h1>{Pagestate}</h1>
          <img
            onClick={() => {
              setPopup(false);
            }}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="input-grp">
          {Pagestate === "Sign Up" && (
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Your Username"
              value={credentials.username}
              onChange={onChange}
            />
          )}
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            value={credentials.email}
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Your Password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit">
          {Pagestate === "Sign Up" ? "Sign Up" : "Log In"}
        </button>
        {Pagestate === "Login" ? (
          <p className="form-bottom-text">
            Don't have an account ? Try{" "}
            <span
              onClick={() => {
                setPagestate("Sign Up");
              }}
            >
              Signup
            </span>
          </p>
        ) : (
          <p>
            Already have an account ? Try{" "}
            <span
              onClick={() => {
                setPagestate("Login");
              }}
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login_signup;
