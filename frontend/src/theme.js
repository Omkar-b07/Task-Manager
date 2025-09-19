// frontend/src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // This sets the foundation for the dark theme
    primary: {
      main: '#00bcd4', // A vibrant cyan/teal for buttons and highlights
    },
    secondary: {
      main: '#ff4081', // A pink accent color
    },
    background: {
      default: '#121212', // A deep, rich black for the main background
      paper: '#1e1e1e',   // A slightly lighter black for surfaces like cards and forms
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
});

export default theme;