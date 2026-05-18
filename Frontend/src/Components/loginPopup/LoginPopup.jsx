import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl;
    if (currState === "Login") {
      newUrl = `${url}/api/user/login`;
    } else {
      newUrl = `${url}/api/user/register`;
    }
    axios.post(newUrl, data).then((res) => {
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLogin(false);
      } else {
        alert(res.data.message);
      }
    });
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => {
              setShowLogin(false);
            }}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" ? (
            <input
              onChange={onChangeHandler}
              type="text"
              name="name"
              value={data.name}
              placeholder="Your name"
              required
            />
          ) : (
            <></>
          )}
          <input
            onChange={onChangeHandler}
            type="email"
            name="email"
            placeholder="Your email"
            value={data.email}
            id=""
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            name="password"
            placeholder="Password"
            id=""
            required
          />
          <button type="submit">
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" name="" id="" required />
            <p>By cotinuing, i agree to the terms of use & privacy policy</p>
          </div>
          {currState === "Login" ? (
            <p>
              Create a new account{" "}
              <span
                onClick={() => {
                  setCurrState("Sign Up");
                }}
              >
                CLick here
              </span>
            </p>
          ) : (
            <p>
              Already have an account{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                }}
              >
                Login here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
