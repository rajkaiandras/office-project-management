import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        scale: '50%',
      }}
    >
      <CircularProgress />
    </Box>
  );
};
