import React from "react";
import { Link } from "react-router-dom";
import './nav.css'

function Nav({ name, path }) {
  return (
    <div className="Nav">
      <div className="left">
        <img className="logo" src="/logo.png" alt="Background" />
        <h3>Welcome, {name}</h3>
      </div>
      <div className="right">
        <Link to={path} ><img className="add" src="/add.png" alt="add" /></Link>
        <img className="logout" src="/logout.png" alt="logout" />
      </div>
    </div>
  );
}

export default Nav;
