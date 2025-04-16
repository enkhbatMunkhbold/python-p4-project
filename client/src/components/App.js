import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import SignUp from "./SignUp";
import Home from "./Home";
import Login from "./Login";
import Movies from "./Movies";

function App() {

  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/check_session").then(r => {
      if(r.ok) {
        r.json().then(user => setUser(user));
      } else {
        setUser(null)
      }
    }).catch(error => console.error("Error checking session:", error));
  }, []);

  useEffect(() => {
    fetch("/movies").then(r => {
      if(r.ok) {
        r.json().then(movies => setMovies(movies));
      } else {
        console.error("Error fetching movies:", r.statusText);
      }
    }).catch(error => console.error("Error fetching movies:", error));
  }
  , []);

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
            <Route path="/movies" element={<Movies movies={movies} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/signup" element={<SignUp setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/" element={<Home user={user} movies={movies} />} />
          </Routes>
        )}
      </main>
    </Router>
  );
}

export default App;
