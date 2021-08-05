import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  const main_color = theme.palette.primary.main;
  return {
    root: {
      minHeight: '100vh',
      '& .MuiInput-underline:before': {
        borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
      },
    },

    branding: {
      gap: '1rem',
      '& .branding--logo': {
        width: '3rem',
        height: '3rem',
        padding: '0.35rem',
        borderRadius: '35%',
        background: main_color,

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
    },

    dashboard: {
      '& .dashboard--header': {
        padding: '1rem 2rem',
      },

      '& .dashboard--header--nav': {
        gap: '3rem',
      },

      '& .user-button': {
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
        overflow: 'hidden',
        padding: '0',

        '& *': {
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        },
      },

      '& .main--header': {
        backgroundColor: main_color,
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

      '& .material-icons': {
        fontFamily: 'Material Icons Outlined',
        lineHeight: '1em',
      },
    },

    drawerWrapper: {
      width: drawerWidth,
      [theme.breakpoints.up('md')]: {
        width: '300px',
      },
    },
  };
});

export default useStyles;
