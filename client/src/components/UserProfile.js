import { useContext } from 'react';
import UserContext from '../context/UserContext';
import MovieCard from './MovieCard';

const UserProfile = () => {

  const { user } = useContext(UserContext);
  if (!user) return <div>Loading...</div>;

  console.log("User from UserProfile:", user);


  function renderMovies(list) {
    return list.map((movie) => {
      
      return (
        <MovieCard key={movie.id} movie={movie} />
      )
    })
  }

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <div className="user-profile">
        <h3>Your Movies:</h3>
        {user.movies && user.movies.length > 0 ? (
          <ul>
            {renderMovies(user.movies)}
          </ul>
        ) : (
          <p>No tickets purchased yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile