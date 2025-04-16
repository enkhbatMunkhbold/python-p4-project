
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

  if (user) {
    return (
      <div>
        <h1>Welcome, {user.username}!</h1>
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