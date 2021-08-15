import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  popover: {
    pointerEvents: 'none',
  },
  cardContent: {
    padding: '5px 5px',
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  title: {
    marginTop: 5,
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 600,
  },

  tag: {
    display: 'block',
    minHeight: 7,
    width: 50,
    borderRadius: '5px',
  },
}));

export default useStyles;
