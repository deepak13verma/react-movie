import { useEffect, useState } from 'react';
import Search from './Components/Search';
import MovieCard from './Components/MovieCard';
import Trending from './Components/Trending';


const API_BASE_URL = 'http://www.omdbapi.com';
const API_KEY = import.meta.env.VITE_IMDB_API_KEY;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingRefresh, setTrendingRefresh] = useState(0);


  const updateTrending = (term, movie) => {
    if (!term || !movie) return;

    const trends = JSON.parse(localStorage.getItem('trending')) || {};

    if (trends[term]) {
      trends[term].count += 1;
    } else {
      trends[term] = {
        count: 1,
        imdbID: movie.imdbID,
        poster: movie.Poster,
        title: movie.Title,
      };
    }

    localStorage.setItem('trending', JSON.stringify(trends));
    setTrendingRefresh(prev => prev + 1);
  };



  const fetchMovies = async (title) => {
    if (!title) return;

    try {
      setErrorMessage('');
      setIsLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/?apikey=${API_KEY}&s=${title}`
      );

      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(`Error is here ${data.Error}`);
        setMovies([]);
        return;
      }
      updateTrending(title, data.Search[0]);
      setMovies(data.Search);
    } catch (error) {
      console.error(error);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You Will Enjoy Without Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Trending refreshKey={trendingRefresh} />

        </header>

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="movie-list">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </ul>

          )}
        </section>
      </div>
    </main>
  );
};

export default App;
