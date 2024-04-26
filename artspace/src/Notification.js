import React from "react";
import { Link } from "react-router-dom";
import "./styles/Notification.css";

const Notification = ({ message }) => {
  return (
    <div className="notification">
      <Link to="/messaging">{message}</Link>
    </div>
  );
};

export default Notification;
