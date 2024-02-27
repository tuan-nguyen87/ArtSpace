import React, { useState } from "react";
import "./styles/LoginPage.css";

const LoginPage = () => {
    const [isLoginFormActive, setLoginFormActive] = useState(true);

  const switchToLogin = () => {
    setLoginFormActive(true);
  };

  const switchToRegister = () => {
    setLoginFormActive(false);
  };

  return (
    <div className="logreg-container">
        <div className={`logreg-container ${isLoginFormActive ? "active" : ""}`}>
            <div className="main-box">
                {/* <div class="form-box login"> */}
                <div className={isLoginFormActive ? "form-box login active" : "form-box login"}>
                    <h2>Login</h2>
                    <form action="#">
                        <div class="input-box">
                            <input type="text" placeholder="Username" required/>
                            <i class='bx bxs-user'></i>
                        </div>
                        <div class="input-box">
                            <input type="password" placeholder="Password" required/>
                            <i class='bx bxs-lock-alt'></i>
                        </div>
                        <div class="remember-forgot">
                            <label><input type="checkbox"/>Remember Me</label>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button type="submit" class="btn">Login</button>
                        <div class="divider">
                            <p><div class="line"></div>or<div class="line"></div></p>
                        </div>
                        <div class="login-register">
                            <p> Don't have an account? 
                                <button type="button" className="register-link" onClick={switchToRegister}>
                                    Create Account
                                </button>
                            </p>
                        </div>  
                    </form>
                </div>
                
                {/* <div class="form-box register"> */}
                <div className={isLoginFormActive ? "form-box register" : "form-box register active"}>
                    <h2>Registration</h2>
                    <form action="#">
                        <div class="input-box">
                            <input type="text" placeholder="Username" required/>
                            <i class='bx bxs-user'></i>
                        </div>
                        <div class="input-box">
                            <input type="email" placeholder="Email" required/>
                            <i class='bx bx-envelope'></i>
                        </div>
                        <div class="input-box">
                            <input type="password" placeholder="Password" required/>
                            <i class='bx bxs-lock-alt'></i>
                        </div>
                        <div class="divider">
                            <p><div class="line"></div>or<div class="line"></div></p>
                        </div>
                        <div class="remember-forgot">
                            <label>
                                <input type="checkbox"/>I agree to the terms & conditions
                                <br/>
                                <input type="checkbox"/>Are you an artist?
                            </label>
                        </div>
                        <button type="submit" class="btn">Register</button>

                        <div class="login-register">
                            <p> Already have an account? 
                                <button type="button" className="login-link" onClick={switchToLogin}>
                                    Login
                                </button>
                            </p>
                        </div>  
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LoginPage;