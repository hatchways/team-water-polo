import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  boardContainer: {
    maxWidth: '90%',
    flexWrap: 'nowrap',
    margin: '20px auto',
    justifyContent: 'space-evenly',
  },
  columnHeader: {
    justifyContent: 'space-between',
    padding: '5px 20px',
  },
  columnContainer: {
    margin: '8px',
    backgroundColor: theme.palette.info.main,
    borderRadius: '10px',
    flexDirection: 'column',
    blockSize: 'fit-content',
  },
  taskList: {
    blockSize: 'fit-content',
  },
  columnFooter: {
    padding: '10px 20px',
  },
  taskContainer: {
    width: '93%',
    margin: '10px auto',
    minHeight: '85px',
    maxHeight: '100px',
  },
  taskContent: {
    marginTop: '8px',
  },
  draggingTask: {
    transform: 'rotate(-5deg)', // gets overridden by dnd properties
  },
  tag: {
    backgroundColor: 'green',
    height: '8px',
    width: '60px',
    borderRadius: '5px',
  },
}));

export default useStyles;
