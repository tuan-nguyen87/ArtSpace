import React, { useState } from "react";
import "./styles/LoginPage.css";
/* Tuan's code start here *************************************/
// imports from firebase to be use
import { auth, db } from "./Firebase/Firebase.js"; // jennifer - added db
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore"; //jennifer - added more imports from firebase
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

// useState for login page
const LoginPage = () => {
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState("");
  // function to handle credentials
  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }
  // functions to handle sign up with error catching and redirection to landing page upon success.
  function handleSignup(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        window.location.href = "/"; // Navigate to landing page
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  // function to handle login with error catching and redirection upon success.
  /*function handleLogin(e) {
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
  }*/

  /*************Jennifer - start for logins points in PointSystem.js using existing handleLogin function.***********/
  // function to handle login with error catching and redirection upon success.
  async function handleLogin(e) { // async added
    e.preventDefault();
    try { // try block added
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userCredentials.email,
        userCredentials.password
      );
      const user = userCredential.user;
      console.log(user);
  
      // added- Fetch points document and update total points and logins
      const pointsDocRef = doc(db, "points", user.uid);
      const pointsDocSnap = await getDoc(pointsDocRef);
      if (pointsDocSnap.exists()) {
        const pointsData = pointsDocSnap.data();
        const logins = (pointsData.logins || 0) + 1; // Increment logins
        const totalPoints = (pointsData.totalPoints || 0) + 25; // Adds 25 points each time
        
        // added - Update the document with merged data
        await updateDoc(pointsDocRef, {
          totalPoints: totalPoints,
          logins: logins
        });
      }
  
      // Redirect to landing page after successful login
      window.location.href = "/"; // Navigate to landing page
    } catch (error) {
      setError(error.message);
    }
  }
  /************Jennifer - ends for logins points in PointSystem.js using existing handleLogin function.**************/

  // reset password, email will be sent to user with links to reset password
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
