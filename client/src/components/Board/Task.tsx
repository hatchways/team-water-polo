import { Typography, CardContent, Card, Box } from '@material-ui/core';
import useStyles from './useStyles';
import { Draggable } from 'react-beautiful-dnd';
import { IPropTask } from '../../interface/Board';

interface Props {
  task: IPropTask;
  index: number;
}

export default function Task({ task, index }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes.taskContainer}
        >
          <Card className={snapshot.isDragging ? classes.draggingTask : undefined}>
            <CardContent>
              <Box className={classes.tag} style={{ backgroundColor: task.tag ?? 'white' }}></Box>
              <Typography variant="h6" className={classes.taskContent}>
                <strong>{task.content}</strong>
              </Typography>
              <Typography variant="subtitle2">
                {task.date?.toLocaleDateString('en-us', { month: 'long', day: '2-digit' }) ?? ''}
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
