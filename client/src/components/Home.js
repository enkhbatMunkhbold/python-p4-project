import React from 'react';
import Movie from './Movie';
import "../styling/Movie.css"

function Home({ user, movies }) {

  function renderMovies(list) {
    return list.map( movie => {
      return (
        <li key={movie.id}>
          <h3>{movie.title}</h3>
        </li>
      )
    })
  }

  const renderPurchaseMovies = movies.map( movie => {
      return <Movie key={movie.id} movie={movie} />
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
        <img
          src="/ticket.png"
          alt="movie tickets"
        />
        <p>Login or Sign Up to get started!</p>
        <br />
        <h2>List of Movies</h2>   
        <ul className="list">{renderMovies(movies)}</ul>
        <br /><br />
      </div>   
    )
  }
}

export default Home;