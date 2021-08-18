import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  // MyCalendar Component
  calendarContainer: {
    minWidth: '90%',
    margin: '20px auto',
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid blue',
  },

  modalContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '50%',
    maxWidth: '50%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '75%',
    },
  },

  // Tag Component

  cardContent: {
    padding: '5px 5px',
    width: '100%',
    '&:last-child': {
      paddingBottom: 0,
    },
  },

  tag: {
    display: 'block',
    minHeight: 7,
    width: 50,
    borderRadius: '5px',
  },

  title: {
    marginTop: 5,
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 600,
  },

  // CardModal component

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

  cardTitle: {
    '& div': {
      width: '100%',
    },
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    minWidth: '100%',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    position: 'relative',
    minHeight: '800px',
  },

  header: {
    margin: '1% 0',
    display: 'flex',
    alignItems: 'center',
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
    '& span': {
      marginLeft: 5,
      textDecoration: 'underline',
      fontWeight: 800,
    },
  },

  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  button: {
    width: '20%',
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
    width: '5%',
    [theme.breakpoints.down('md')]: {
      width: '10%',
    },
  },

  notchedOutline: {
    padding: '1% 1%',
    borderWidth: '0',
    paddingLeft: 5,
    fontSize: 25,
    '& textarea': {
      cursor: 'pointer',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },

  images: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  imageContainer: {
    position: 'relative',
    width: '48%',
    margin: '1% 1%',
    maxHeight: '250px',
  },

  image: {
    width: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
    border: '1px solid #fff',
    cursor: 'pointer',
    opacity: '0.9',
    '&:hover': {
      border: '1px solid grey',
      opacity: '1',
    },
  },
  delete: {
    position: 'absolute',
    top: '0',
    right: '0',
    '&:hover': {
      color: 'red',
    },
  },
}));

export default useStyles;
