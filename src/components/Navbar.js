import React from "react";
import { Link } from "react-router-dom";
import Profile from "../routes/Profile";

const Navbar = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  );
};

export default Navbar;
