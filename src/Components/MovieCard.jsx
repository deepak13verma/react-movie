import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://www.omdbapi.com';
const API_KEY = import.meta.env.VITE_IMDB_API_KEY;

const MovieCard = ({ movie }) => {
  const { Title, Year, Poster, imdbID, Type } = movie;
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/?apikey=${API_KEY}&i=${imdbID}`
        );
        const data = await response.json();
        setRating(data.imdbRating);
      } catch (error) {
        console.error('Error fetching rating', error);
      }
    };

    fetchRating();
  }, [imdbID]);

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={Poster !== 'N/A' ? Poster : '/no-poster.png'}
          alt={Title}
        />
      </div>

      <div className="movie-info">
        <h3>{Title}</h3>

        <p className="meta">
          <span>{Type}</span> • <span>{Year}</span>
        </p>

        <p className="rating">
          <img src="/star.svg" alt="rating" className="star-icon" />
          <span>
            {rating && rating !== 'N/A' ? `${rating} / 10` : 'N/A'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
