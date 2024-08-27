import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/img/logo.png";
import { Context } from "../../context/UserContext";

const Login = () => {
  const { login } = useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginHandle = () => {
    axios
      .post(process.env.REACT_APP_API_BASE_URL + "/api/login", {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        console.log(response.data);

        if (response.data.status === "success") {
          Swal.fire("Login success", "", "success");

          const token = response.data.token;
          localStorage.setItem("authToken", token);

          console.log("response.data.user");
          console.log(response.data.user);
          login(response.data.user);

          navigate("/");
        } else {
          Swal.fire("Login failed", response.data.message, "error");
          localStorage.removeItem("authToken");
        }
      })
      .catch((error) => {
        console.error("Errore durante il login:", error);
        Swal.fire("Login failed", "Data incorrect", "error");
        localStorage.removeItem("authToken");
      });
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }
  return (
    <>
      <div className="loginBg">
        <div
          className="row justify-content-center align-items-center jumbotron"
          style={{ height: "65vh" }}
        >
          <div className="loginCard">
            <div className="card-header border-bottom text-center mb-3 pb-3">
              <img src={logo} className="loginLogo" alt="db logo" />
              <h4>Gallery backend</h4>
            </div>
            <div className="card-body">
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="form-control"
                value={formData.email}
                onChange={handleInput}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="form-control my-3"
                value={formData.password}
                onChange={handleInput}
              />

              <button
                type="sumit"
                onClick={loginHandle}
                className="btn loginButton mt-2"
              >
                Login
              </button>

              <div className="demoData">
                <b>demo data</b>:
                <br />
                email: mario@rossi.it
                <br />
                password: 12345678
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
