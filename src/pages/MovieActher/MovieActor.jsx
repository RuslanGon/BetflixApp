import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const MovieActor = () => {
  const { id } = useParams();

  return (
    <Box sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h4">Актёр с ID: {id}</Typography>
    </Box>
  );
};

export default MovieActor;
