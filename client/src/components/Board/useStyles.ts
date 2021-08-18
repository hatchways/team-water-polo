import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  boardContainer: {
    height: '70vh',
    margin: '5vh 0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  board: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  columnHeader: {
    justifyContent: 'space-between',
    padding: '5px 20px',
  },
  columnContainer: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.info.main,
    borderRadius: '10px',
    flex: 1,
    flexDirection: 'column',
    blockSize: 'fit-content',
  },
  taskList: {
    blockSize: 'fit-content',
  },
  columnFooter: {
    padding: '3%',
    marginBottom: '5%',
  },
  newTaskBtn: {
    color: '#b2b2b2',
    marginLeft: '3%',
  },
  inputContainer: {
    borderBottom: '1px solid #b2b2b2',
    padding: '12px 15px',
  },
  contentInput: {
    fontWeight: 'bolder',
  },
  tagButton: {
    height: 20,
    width: 20,
    borderRadius: 20,
    margin: '0 2px',
    padding: 0,
  },
  taskContainer: {
    width: '94%',
    margin: '5px auto',
    minHeight: '85px',
    maxHeight: '100px',
    borderRadius: 10,
  },
  newTaskContainer: {
    width: '94%',
    margin: '5px auto',
    height: '110px',
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
  },
  taskContent: {
    marginTop: '8px',
  },
  draggingTask: {
    transform: 'rotate(-5deg)',
    transition: 'transform 300ms ease',
  },
  tag: {
    backgroundColor: 'green',
    height: '8px',
    width: '60px',
    borderRadius: '5px',
  },
  hoverableZone: {
    height: '100%',
    width: '5%',
  },
  addColumnBtn: {
    height: '100%',
    width: '100%',
    borderRadius: '0',
  },
  icon: {
    height: 45,
    width: 45,
    color: '#FFF',
  },
}));

export default useStyles;
