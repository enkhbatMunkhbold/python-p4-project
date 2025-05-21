import { useEffect, useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import Movie from './Movie';
import "../styling/movie.css";

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [ movies, setMovies ] = useState([])

  useEffect(() => {
    fetch("/movies")
    .then(r => {
      if(r.ok) {
        r.json().then(movies => setMovies(movies));
      } else {
        console.error("Error fetching movies:", r.statusText);
        setMovies([]);
      }
    })
    .catch(error => {
      console.error("Error fetching movies:", error)
      setMovies([])
    });
  }, []);

  const renderMovies = (list) => {
    return list.map((movie) => {
      return (
        <li key={movie.id}>
          <h3>{movie.title}</h3>
        </li>
      )
    })
  }

  const renderPurchaseMovies = movies.map( movie => {
    return <Movie key={movie.id} user={user} setUser={setUser} movie={movie} />
    })

  if (user) {
    return (
      <div>
        <h1>Welcome, {user.username}!</h1>
        <ul>{renderPurchaseMovies}</ul>
      </div>
    )
  } else {
    return (
      <div className="home">
        <h1>Welcome to Movie Tickets!</h1>
        <br />
        <img src="/ticket.png" alt="movie tickets" />
        <p>Login or Sign Up to get started!</p>
        <br />
        <h2>List of Movies</h2>
        <ul className="list">{renderMovies(movies)}</ul>
      </div>
    )
  }
}

export default Home;