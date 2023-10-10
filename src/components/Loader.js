import { Stack, Typography } from '@mui/material';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <Stack spacing={2} alignItems='center' justifyContent='center'>
      <CircularProgress color='secondary' />
      <Typography variant='h6'>Loading...</Typography>
    </Stack>
  );
};

export default Loader;
