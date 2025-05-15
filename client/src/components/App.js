import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import SignUp from "./SignUp";
import Home from "./Home";
import Login from "./Login";
import UserProfile from "./UserProfile";
import UserContext from "../context/UserContext";
import Tickets from "./Tickets";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session")
    .then(r => {
      if(r.ok) {
        r.json().then(user => setUser(user));
      } else if (r.status === 204) {
        setUser(null)
      } else {
          throw new Error(`HTTP error! Status: ${r.status}`);
      }
    }).catch(error => {
      console.error("Error checking session:", error)
      setUser(null)
    });
  }, [setUser]);

  console.log("User from App:", user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <NavBar />
        <main>
          {user ? (
            <Routes>
              <Route path="/" element={<Home />}/> 
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />}/>
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          )}
        </main>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
