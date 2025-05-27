import { useContext } from 'react';
import UserContext from '../context/UserContext';
import MovieCard from './MovieCard';

const UserProfile = () => {

  const { user } = useContext(UserContext);
  if (!user) return <div>Loading...</div>;

  const renderMovies = () => {
    if (!user.movies) return null;  
   
    const moviesArray = Object.values(user.movies);    
    return moviesArray.map(movie => <MovieCard key={movie.id} movie={movie} />);    
  }

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <div className="user-profile">
        <h3>Your Movies:</h3>
        {user.movies && Object.keys(user.movies).length > 0 ? (
          <ul>
            {renderMovies()}
          </ul>
        ) : (
          <p>No tickets purchased yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile