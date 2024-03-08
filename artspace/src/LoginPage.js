import React, { useState } from "react";
import "./styles/LoginPage.css";
/* Tuan's code start here *************************************/
import { auth } from "./Firebase/Firebase.js";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginPage = () => {
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState("");

  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  function handleSignup(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handleLogin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        // Redirect to landing page after successful login
        window.location.href = "/"; // Navigate to landing page
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handlePasswordReset() {
    const email = prompt("Please enter your email address");
    sendPasswordResetEmail(auth, email);
    alert("Email sent! Check inbox for instruction");
  }

  const [isLoginFormActive, setLoginFormActive] = useState(null);

  /* ends here *************************************************/

  const switchToLogin = () => {
    setLoginFormActive(false);
  };

  const switchToRegister = () => {
    setLoginFormActive(true);
  };

  return (
    <div className="logreg-container">
      <div className={`main-box ${isLoginFormActive ? "active" : ""}`}>
        <div className={`form-box login ${isLoginFormActive ? "active" : ""}`}>
          <h2>Login</h2>
          <form action="#">
            <div className="input-box">
              <input
                /* Tuan's code ***************************** */
                onChange={(e) => handleCredentials(e)}
                name="email"
                /* ends here ******************************** */
                type="email"
                placeholder="Email"
                required
              />
              <i className="bx bx-envelope"></i>
            </div>
            <div className="input-box">
              <input
                /* Tuan's code *********************************** */
                onChange={(e) => handleCredentials(e)}
                name="password"
                /* ********************************************** */
                type="password"
                placeholder="Password"
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember Me
              </label>
              <p
                /* Tuan's code ************** */ onClick={
                  handlePasswordReset
                } /* ends here ************ */
              >
                Forgot Password?
              </p>
            </div>
            <button
              onClick={(e) => handleLogin(e)}
              type="submit"
              className="btn"
            >
              Login
            </button>
            {/* Tuan's code ******************************** */}
            {error && (
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                  fontSize: "smaller",
                }}
              >
                {error}
              </div>
              // ends here **************************************
            )}
            <div className="divider">
              <p>
                <div className="line"></div>or<div className="line"></div>
              </p>
            </div>
            <div className="login-register">
              <p>
                Don't have an account?
                <a
                  href="#"
                  className="register-link"
                  onClick={switchToRegister}
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>

        <div
          className={`form-box register ${isLoginFormActive ? "" : "active"}`}
        >
          <h2>Registration</h2>
          <form action="#">
            <div className="input-box">
              <input
                /* Tuan's code ********************************** */
                onChange={(e) => handleCredentials(e)}
                name="email"
                /* ends here ************************************ */
                type="email"
                placeholder="Email"
                required
              />
              <i className="bx bx-envelope"></i>
            </div>
            <div className="input-box">
              <input
                /* Tuan's code ********************************** */
                onChange={(e) => handleCredentials(e)}
                name="password"
                /*  ends here *********************************** */
                type="password"
                placeholder="Password"
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />I agree to the terms & conditions
                <br />
                <input type="checkbox" />
                Are you an artist?
              </label>
            </div>
            <button
              /* Tuan's code ************************************* */
              onClick={(e) => handleSignup(e)}
              type="submit"
              /* ends here ****************************************** */
              className="btn"
            >
              Register
            </button>
            {/* Tuan's code ********************************************** */}
            {error && (
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                  fontSize: "smaller",
                }}
              >
                {error}
                {/* ends here *************************************************** */}
              </div>
            )}
            <div className="divider">
              <p>
                <div className="line"></div>or<div className="line"></div>
              </p>
            </div>
            <div className="login-register">
              <p>
                Already have an account?
                <a href="#" className="login-link" onClick={switchToLogin}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
