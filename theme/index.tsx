import { createTheme, colors } from '@mui/material';
import typography from './typography';
import shadows from '@mui/material/styles/shadows';

const theme = createTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white,
    },
    primary: {
      contrastText: '#ffffff',
      main: '#f4762a',
    },
    secondary: {
      contrastText: '#ffffff',
      main: '#6cac19',
    },
    error: {
      contrastText: '#ffffff',
      main: '#ff0000',
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c',
    },
  },
  shadows,
  typography,
});

export default theme;
