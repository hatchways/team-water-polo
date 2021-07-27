import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  dashboard: {
    '--accent-color': '#759CFC',
    '& .dashboard--header': {
      display: 'grid',
      gridTemplateColumns: '25% auto auto 3rem',
      padding: '0 3rem',
      boxSizing: 'border-box',
      height: '5rem',
      alignItems: 'center',
    },

    '& .dashboard--header--branding': {
      display: 'flex',

      '& .branding--logo': {
        display: 'inline-block',
        width: '2rem',
        height: '2rem',
      },

      '& .branding--company-name': {
        fontSize: '1.5rem',
        fontWeight: 'bold',
      },
    },

    '& .dashboard--header--nav ul': {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'space-around',

      '& .nav--item': {
        '& a': {
          color: 'black',
          textDecoration: 'none',
          fontWeight: 'bold',
        },
        '&.active a': { color: 'var(--accent-color)' },
      },
    },

    '& .dashboard--header--actions': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      '& button': {
        color: 'white',
        backgroundColor: 'var(--accent-color)',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.25rem',
      },
    },

    '& .dashboard--header--user': {
      '& .user--avatar': {
        display: 'inline-block',
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
      },
    },

    '& .main--header': {
      backgroundColor: 'var(--accent-color)',
      color: 'white',
      padding: '1rem 3rem',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'space-between',

      '& h1': {
        fontSize: '1rem',
        fontWeight: 'bold',
        margin: 0,
      },
    },
  },
  drawerWrapper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: '300px',
    },
  },
}));

export default useStyles;
