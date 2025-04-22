import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavBar({ user, onLogout }) {

  const navigate = useNavigate();

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        onLogout();
        navigate("/");
      }
    });
  }

  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogoutClick}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
