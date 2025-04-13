import Movies from "./Movies";

function Home({ user }) {
  if (user) {
    return <h1>Welcome, {user.username}!</h1>;
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
        <Movies />
        <br /><br />
      </div>   
    )
  }
}

export default Home;