import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "./public/image.png";
import "./styles/Login.css";

import { BASE_URL } from "../../utils/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("CUSTOMER"); // Default value is CUSTOMER
  const navigate = useNavigate();

  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));

  async function login(event) {
    event.preventDefault();
    try {
      console.log("first");
      await axios
        .post(
          `${BASE_URL}/api/v1/auth/${
            userType === "CUSTOMER" ? "login" : "authenticate"
          }`,
          {
            email: email,
            password: password, 
          }
        )
        .then(
          (res) => {
            console.log(res.data);
            const { token } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("decodedToken", atob(token.split(".")[1]));
            navigate(
              `/${userType === "CUSTOMER" ? "customer" : "employee"}/home`
            );
            window.location.reload();
          },
          (error) => {
            alert("Incorrect Credentials");
            console.error(error); // Error!
          }
        );
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="mt-28 wrapper">
      <div>
        <h2>User Login</h2>
        <img src={image} alt="image" />
      </div>
      <form action="#" class="full">
        <div class="bodyy">
          <div class="input-box">
            <input
              type="email"
              size="40"
              className="px-4"
              placeholder="Enter username"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              id="email"
              required
            />
          </div>

          <div class="input-box">
            <input
              type="password"
              className="px-4"
              placeholder="Enter password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              id="password"
              required
            />
          </div>

          <div class="input-box flex">
            <select
            className="m-auto border shadow shadow-gray-600 outline-none w-40 text-center rounded"
              value={userType}
              onChange={(event) => {
                setUserType(event.target.value);
              }}
            >
              <option value="CUSTOMER">Customer</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
          </div>

          <div class="policy">
            <input type="checkbox" />
            <h3>I accept all terms & condition</h3>
          </div>
          <div class="input-box button">
            <input type="Submit" onClick={login} value="Login Now" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;