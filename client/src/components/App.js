import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import SignUp from "./SignUp";
import Home from "./Home";
import Login from "./Login";
import UserProfile from "./UserProfile";
import Tickets from "./Tickets";
import UserContext from '../context/UserContext';
import NewMovie from "./NewMovie";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/check_session")
      .then(r => {
        if (r.ok && r.status !== 204) {
          return r.json().then(user => {
            setUser(user);
            setIsLoading(false);
          });
        } else {
          setUser(null);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error("Error checking session:", error);
        setUser(null);
        setIsLoading(false);
      });
  }, [setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <NavBar />
        <main>
          {user ? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/new_movie" element={<NewMovie />} />
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          )}
        </main>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
