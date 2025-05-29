import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, CircularProgress } from '@mui/material';

const KomixPage = () => {
  const searchQuery = 'comic'; // изменено с 'vampire' на 'comic'
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComicMovies = async (pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=b9f938ce&s=${encodeURIComponent(searchQuery)}&type=movie&page=${pageNum}`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(prev => pageNum === 1 ? data.Search : [...prev, ...data.Search]);
        setHasMore(data.Search.length === 10);
      } else {
        if (pageNum === 1) setMovies([]);
        setHasMore(false);
        setError(data.Error);
      }
    } catch (err) {
      setError('Ошибка загрузки данных');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComicMovies(page);
  }, [page]);

  return (
    <Box sx={{ mt: 10, px: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Фильмы по комиксам
      </Typography>

      {error && <Typography color="error" align="center">{error}</Typography>}
      <Grid container spacing={2} justifyContent="center">
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={2.4} key={movie.imdbID}>
            <Box sx={{
              border: '1px solid #ccc',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 2,
              textAlign: 'center',
              p: 1,
              height: '100%',
            }}>
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/180x270?text=No+Image'}
                alt={movie.Title}
                style={{ width: '100%', height: 270, objectFit: 'cover' }}
              />
              <Typography variant="subtitle1" mt={1}>{movie.Title}</Typography>
              <Typography variant="body2" color="textSecondary">{movie.Year}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && hasMore && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant="contained" onClick={() => setPage(prev => prev + 1)}>
            Загрузить ещё
          </Button>
        </Box>
      )}

      {!loading && !hasMore && movies.length > 0 && (
        <Typography align="center" sx={{ mt: 3 }}>
          Больше фильмов нет
        </Typography>
      )}
    </Box>
  );
};

export default KomixPage;
