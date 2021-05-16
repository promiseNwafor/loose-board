import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";
import "./nav.css";

function Nav({ name, path }) {
  const { handleLogout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="Nav">
      <div className="left">
        <img className="logo" src="/logo.png" alt="Background" />
        <h3>{name}</h3>
      </div>
      <div className="right">
        <Link to={path}>
          <img className="add" src="/add.png" alt="add" />
        </Link>
        <div
          onClick={handleLogout}
          onMouseOver={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <img className="logout" src="/logout.png" alt="logout" />
          {showDropdown ? (
            <div class="dropdown">
              <p>Logout</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Nav;
