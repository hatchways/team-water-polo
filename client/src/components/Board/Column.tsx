import { Grid, Typography } from '@material-ui/core';
import useStyles from './useStyles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { IPropColumn, IPropTask } from '../../interface/Board';
import Task from './Task';
import { theme } from '../../themes/theme';

interface Props {
  column: IPropColumn;
  tasks: IPropTask[];
  index: number;
}

export default function Column({ column, tasks, index }: Props): JSX.Element {
  const classes = useStyles(theme);
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Grid container item className={classes.columnContainer} ref={provided.innerRef} {...provided.draggableProps}>
          <Grid
            container
            direction="row"
            alignItems="center"
            className={classes.columnHeader}
            {...provided.dragHandleProps}
          >
            <h2>{column.title}</h2>
            <MoreHorizIcon color="disabled" />
          </Grid>
          <Droppable droppableId={column.id} type="TASK">
            {(provided) => (
              <Grid className={classes.taskList} ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((task, idx) => (
                  <Task key={task.id} task={task} index={idx} />
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
          <Grid item className={classes.columnFooter}>
            <Typography variant="subtitle1">Add a card...</Typography>
          </Grid>
        </Grid>
      )}
    </Draggable>
  );
}
