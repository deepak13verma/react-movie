import { useEffect, useState } from 'react';

const Trending = ({ refreshKey }) => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const trends = JSON.parse(localStorage.getItem('trending')) || {};

    const sorted = Object.entries(trends)
      .map(([term, data]) => ({ term, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setTrending(sorted);
  }, [refreshKey]);

  if (!trending.length) return null;

  return (
    <section className="text-white mt-6">
      <h2>🔥 Trending Movies</h2>

      <ul className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
        {trending.map(movie => (
          <li key={movie.term} className="text-center">
            <img
              src={movie.poster !== 'N/A' ? movie.poster : '/no-poster.png'}
              alt={movie.title}
              className="rounded-lg mb-2 h-40 object-cover mx-auto"
            />

            <p className="font-semibold text-sm">{movie.title}</p>
            <p className="text-xs opacity-70">
              🔍 {movie.term} • {movie.count}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Trending;
