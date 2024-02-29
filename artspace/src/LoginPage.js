import React, { useState } from "react";
import "./styles/LoginPage.css";
/* Tuan's code */
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
/* ends */
const LoginPage = () => {
  /* Tuan's code starts here */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(getAuth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const signUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(getAuth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /* Tuan's code ends here*/

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
          <form onSubmit={signIn} action="#">
            <div class="input-box">
              <input
                type="text"
                placeholder="Username"
                required /* Tuan's code */
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                /* ends */
              />
              <i class="bx bxs-user"></i>
            </div>
            <div class="input-box">
              <input
                type="password"
                placeholder="Password"
                required /* Tuan's code */
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /* ends */
              />
              <i class="bx bxs-lock-alt"></i>
            </div>
            <div class="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember Me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" class="btn">
              Login
            </button>
            <div class="divider">
              <p>
                <div class="line"></div>or<div class="line"></div>
              </p>
            </div>
            <div class="login-register">
              <p>
                {" "}
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
          <form onSubmit={signUp} action="#">
            <div class="input-box">
              <input
                type="text"
                placeholder="Username"
                required
                /* Tuan's code */
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                /* ends */
              />
              <i class="bx bxs-user"></i>
            </div>
            <div class="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                /* Tuan's code */
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                /* ends */
              />
              <i class="bx bx-envelope"></i>
            </div>
            <div class="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                /* Tuan's code */
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /* ends */
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
            <button type="submit" class="btn">
              Register
            </button>
            <div class="divider">
              <p>
                <div class="line"></div>or<div class="line"></div>
              </p>
            </div>
            <div class="login-register">
              <p>
                {" "}
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
