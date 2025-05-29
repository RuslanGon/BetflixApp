import React, { useState, useEffect } from 'react';

const MoviesPage = ({ movies = [], loading = false, error = null, hasMore = false, onLoadMore }) => {
  // Фильтруем фильмы про любовь по названию
  const loveMovies = movies.filter(movie =>
    movie.Title.toLowerCase().includes('love') || movie.Title.toLowerCase().includes('романтик')
  );

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 70 }}>
      {loveMovies.length === 0 && !loading && !error && <p>Фильмы про любовь не найдены</p>}

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 20,
        justifyContent: 'center',
      }}>
        {loveMovies.map(movie => (
          <div
            key={movie.imdbID}
            style={{
              flex: '0 0 calc((100% - 40px) / 3)',
              border: '1px solid #ccc',
              borderRadius: 8,
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
              transition: 'transform 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/180x270?text=No+Image'}
              alt={movie.Title}
              style={{ width: '100%', height: 270, objectFit: 'cover' }}
            />
            <div style={{ padding: 10 }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: 16 }}>{movie.Title}</h4>
              <p style={{ margin: 0, color: '#555' }}>{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>

      {loading && <p>Загрузка...</p>}

      {!loading && hasMore && loveMovies.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: -110 }}>
          <button
            onClick={onLoadMore}
            style={{
              padding: '10px 20px',
              fontSize: 16,
              cursor: 'pointer',
              borderRadius: 4,
              border: 'none',
              backgroundColor: '#1976d2',
              color: '#fff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1565c0'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#1976d2'}
          >
            Загрузить ещё
          </button>
        </div>
      )}

      {!hasMore && loveMovies.length > 0 && (
        <p style={{ marginTop: 20, marginBottom: 30, textAlign: 'center' }}>
          Больше фильмов нет
        </p>
      )}

      {error && (
        <p style={{ marginTop: 20, marginBottom: 30, color: 'red', textAlign: 'center' }}>
          {error}
        </p>
      )}
    </div>
  );
};

const App = () => {

  const [searchTerm, setSearchTerm] = useState('love'); // По умолчанию ищем "love"
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (search, pageToLoad) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=b9f938ce&s=${encodeURIComponent(search)}&type=movie&page=${pageToLoad}`
      );
      const data = await response.json();

      if (data.Response === 'False') {
        if (pageToLoad === 1) setMovies([]);
        setHasMore(false);
        setError(data.Error || 'Фильмы не найдены');
      } else {
        setMovies(prev => pageToLoad === 1 ? data.Search : [...prev, ...data.Search]);
        setHasMore(data.Search.length === 10);
      }
    } catch (err) {
      setError('Ошибка при загрузке данных');
    }

    setLoading(false);
  };

  useEffect(() => {
    if (searchTerm.trim()) {
      setPage(1);
      fetchMovies(searchTerm, 1);
    } else {
      setMovies([]);
      setHasMore(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies(searchTerm, page);
    }
  }, [page]);

 
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 70 }}>
    
      <MoviesPage
        movies={movies}
        loading={loading}
        error={error}
        hasMore={hasMore}
        onLoadMore={() => setPage(prev => prev + 1)}
      />
    </div>
  );
};

export default App;
