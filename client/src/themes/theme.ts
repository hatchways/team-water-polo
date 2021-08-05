import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  typography: {
    fontFamily: '"Open Sans", "sans-serif", "Roboto"',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  palette: {
    primary: {
      main: '#759CFC',
      contrastText: '#fff',
    },
  },
  shape: {
    borderRadius: 5,
  },
});
