import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import SignUp from "./SignUp";
import Home from "./Home";
import Login from "./Login";
import Movies from "./Movies";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then(r => {
      if(r.ok) {
        r.json().then(user => setUser(user));
      }
    })
  }, []);

  function handleLogout() {   
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }


  return (
    <Router>
      <NavBar user={user} onLogout={handleLogout} />
      <main>
        {user ? (
          <Routes>
            <Route path="/" element={<Home user={user} />} /> 
            <Route path="movies" element={<Movies />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/signup" element={<SignUp setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/" element={<Home user={user} />} />
          </Routes>
        )}
      </main>
    </Router>
  );
}

export default App;
