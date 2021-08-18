import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  closeButton: {
    top: 10,
    right: 10,
    position: 'relative',
  },
  icon: {
    height: 25,
    width: 25,
  },
  input: {
    margin: '30px 0',
    width: '80%',
  },
  createButton: {
    margin: '30px 0',
    width: '25%',
  },
}));

export default useStyles;
