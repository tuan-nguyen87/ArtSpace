import React, { useState } from "react";
import "./styles/LoginPage.css";

/* Tuan's code work starts here ************************************** */
import { auth } from "./Firebase/Firebase.js";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

/* ends here *****************************************************/

const LoginPage = () => {
  /* Tuan's code work starts here *********************************** */
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

  /* ends here *******************************************************/

  const [isLoginFormActive, setLoginFormActive] = useState(null);

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
            <div class="input-box">
              <input
                /* Tuan's code */ onChange={(e) => {
                  handleCredentials(e);
                }}
                name="email"
                /* ends here*/ type="email"
                placeholder="Email"
                required
              />
              <i class="bx bx-envelope"></i>
            </div>
            <div class="input-box">
              <input
                /* Tuan's code */ onChange={(e) => {
                  handleCredentials(e);
                }}
                name="password"
                /* ends here*/ type="password"
                placeholder="Password"
                required
              />
              <i class="bx bxs-lock-alt"></i>
            </div>
            <div class="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember Me
              </label>
              {/* Tuan's code here ************************ */}
              <p onClick={handlePasswordReset}>Forgot Password?</p>
              {/* ends here ******************************************** */}
            </div>
            <button /* Tuan's code */
              onClick={(e) => {
                handleLogin(e);
              }}
              /* ends here*/ type="submit"
              class="btn"
            >
              Login
            </button>
            {/* Tuan's code starts here ******************************** */}
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
            )}
            {/* ends here ***************************************************** */}
            <div class="divider">
              <p>
                <div class="line"></div>or<div class="line"></div>
              </p>
            </div>
            <div class="login-register">
              <p>
                Don't have an account?
                <a href="#" class="register-link" onClick={switchToRegister}>
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
            <div class="input-box">
              <input
                /* Tuan's code */ onChange={(e) => {
                  handleCredentials(e);
                }}
                name="email"
                /* ends here*/ type="email"
                placeholder="Email"
                required
              />
              <i class="bx bx-envelope"></i>
            </div>
            <div class="input-box">
              <input
                /* Tuan's code */ onChange={(e) => {
                  handleCredentials(e);
                }}
                name="password"
                /* ends here*/ type="password"
                placeholder="Password"
                required
              />
              <i class="bx bxs-lock-alt"></i>
            </div>
            <div class="remember-forgot">
              <label>
                <input type="checkbox" />I agree to the terms & conditions
                <br />
                <input type="checkbox" />
                Are you an artist?
              </label>
            </div>
            <button
              /* Tuan's code */
              onClick={(e) => {
                handleSignup(e);
              }}
              /* ends here*/
              type="submit"
              class="btn"
            >
              Register
            </button>
            {/* Tuan's code starts here ******************************** */}
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
            )}
            {/* ends here ***************************************************** */}
            <div class="divider">
              <p>
                <div class="line"></div>or<div class="line"></div>
              </p>
            </div>
            <div class="login-register">
              <p>
                Already have an account?
                <a href="#" class="login-link" onClick={switchToLogin}>
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
