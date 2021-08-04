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
      gap: '2rem',
    },
    '& .branding--logo': {
      width: '3rem',
      height: '3rem',
      padding: '0.35rem',
      borderRadius: '40%',
      background: 'var(--accent-color)',

      '& svg': {
        width: '100%',
        height: '100%',
        fill: 'white',

        '& rect:nth-child(3n+1)': {
          opacity: '0.5',
        },
      },
    },

    '& .branding--name': {
      fontSize: '2rem',
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: '700',
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
          display: 'inline-flex',
          gap: '0.5rem',
          justifyContent: 'flex-start',
          alignItems: 'center',
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
        padding: '0.6rem 1.5rem',
        borderRadius: '0.25rem',
        display: 'inline-flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '0.5rem',
      },
    },

    '& .dashboard--header--user': {
      '& .user--avatar': {
        display: 'inline-block',
        width: '3rem',
        height: '3rem',
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
      alignItems: 'center',

      '& h1': {
        fontSize: '1rem',
        fontWeight: 'bold',
        margin: 0,
      },
    },

    '& .material-icons-outlined': {
      fontFamily: 'Material Icons Outlined',
      fontSize: '2em',
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
