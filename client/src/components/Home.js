function Home({ user }) {
  if (user) {
    return <h1>Welcome, {user.username}!</h1>;
  } else {
    return <h1>Movie Time</h1>;
  }
}

export default Home;