import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  popover: {
    pointerEvents: 'none',
  },
  cardcontent: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  title: {
    marginTop: 10,
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 600,
  },

  tag: {
    display: 'block',
    minHeight: 7,
    paddingTop: 5,
    width: 50,
    borderRadius: '5px',
  },
}));

export default useStyles;
