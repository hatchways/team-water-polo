import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      marginBottom: '1%',
      width: '100%',
      '& div': {
        marginTop: 0,
        cursor: 'pointer',
      },
      '& textarea': {
        cursor: 'pointer',
      },
    },
  },
  typography: {
    padding: theme.spacing(2),
  },
  popover: {
    // pointerEvents: 'none',
  },
  cardContent: {
    padding: '5px 5px',
    width: '100%',
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  title: {
    marginTop: 5,
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 600,
  },

  cardTitle: {
    // width: '100%',
    '& div': {
      width: '100%',
    },
  },

  tag: {
    display: 'block',
    minHeight: 7,
    width: 50,
    borderRadius: '5px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid blue',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: '100%',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: 'relative',
    minHeight: '800px',
  },

  // bullet: {
  //   display: 'inline-block',
  //   margin: '0 2px',
  //   transform: 'scale(0.8)',
  // },

  modalContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '50%',
  },

  header: {
    margin: '1% 0',
    display: 'flex',
    alignItems: 'center', // borderBottom: '1px solid blue',
    '& svg:nth-child(1)': {
      marginRight: '10px',
    },
  },
  title2: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 0,
    marginLeft: 5,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  button: {
    marginTop: '1%',
    width: '25%',
  },

  media: {
    width: '48%',
    margin: '1%',
  },
  closeButton: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: theme.palette.grey[500],
    marginTop: 0,
    // marginRight: 7,
    width: '5%',
  },
  // cssLabel: {
  //   color: 'rgb(61, 158, 116) !important',
  // },
  notchedOutline: {
    padding: '1% 1%',
    borderWidth: '0',
    paddingLeft: 5,
    fontSize: 25,
    '& textarea': {
      cursor: 'pointer',
    },
  },
}));

export default useStyles;
