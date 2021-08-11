import { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import useStyles from './useStyles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { IPropColumn, IPropTask, INewTask } from '../../interface/Board';
import Task from './Task';
import NewTaskForm from './Forms/NewTaskForm';
import { theme } from '../../themes/theme';

interface Props {
  column: IPropColumn;
  tasks: IPropTask[];
  index: number;
  addTask: (newTask: INewTask) => void;
}

export default function Column({ column, tasks, index, addTask }: Props): JSX.Element {
  const classes = useStyles(theme);
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm((showForm) => !showForm);
  };

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
                {showForm ? (
                  <NewTaskForm addTask={addTask} closeForm={handleClick} columnId={column.id} />
                ) : (
                  <Button className={classes.newTaskBtn} onClick={handleClick}>
                    Add a card...
                  </Button>
                )}
              </Grid>
            )}
          </Droppable>
        </Grid>
      )}
    </Draggable>
  );
}
