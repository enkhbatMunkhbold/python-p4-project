function Home({ user }) {
  if (user) {
    return <h1>Welcome, {user.username}!</h1>;
  } else {
    return (
      <div>
        <h1>Welcome to Movie Tickets!</h1>
        <p>Login or Sign Up to get started!</p>
        <br />
        <img
          src="/ticket.png"
          alt="movie tickets"
          style={{ width: "100%", height: "auto" }}
        />
      </div>   
    )
  }
}

export default Home;