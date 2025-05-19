import { useNavigate } from 'react-router-dom';
import '../styling/movieCard.css'

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  if (!movie) return null;

  function handleMovieClick() {
    navigate('/tickets', { state: { movie } });
  }

  const ticketCount = movie.tickets ? movie.tickets.length : 0;

  return (
    <div className='movie-card' onClick={handleMovieClick} style={{ cursor: 'pointer' }}>            
      <div className='movie-info'>
        <div className='movie-detail'>
          <span className='label'>Title:</span>
          <span className='value'>{movie.title}</span>
        </div>
        <div className='movie-detail'>
          <span className='label'>Genre:</span>
          <span className='value'>{movie.genre}</span>
        </div>
        <div className='movie-detail'>
          <span className='label'>Tickets:</span>
          <span className='value'>{ticketCount}</span>
        </div>
      </div>       
    </div>
  );
};

export default MovieCard