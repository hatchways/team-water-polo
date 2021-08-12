import { useState } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './useStyles';
import { Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './Column';
import mockData from './mockData';

export default function Board(): JSX.Element {
  const classes = useStyles();
  const [boardState, setBoardState] = useState(mockData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    if (type === 'COLUMN') {
      const newColumnOrder = [...boardState.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      setBoardState({
        ...boardState,
        columnOrder: newColumnOrder,
      });
      return;
    }

    const sourceColumn = boardState.columns[source.droppableId];
    const sourceTaskIds = [...sourceColumn.taskIds];

    sourceTaskIds.splice(source.index, 1);

    // if moving task to a different column, both destination and source columns must be updated
    if (destination.droppableId !== source.droppableId) {
      const destColumn = boardState.columns[destination.droppableId];
      const destTaskIds = [...destColumn.taskIds];

      destTaskIds.splice(destination.index, 0, draggableId);

      const oldColumn = {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      };

      const newColumn = {
        ...destColumn,
        taskIds: destTaskIds,
      };

      const newState = {
        ...boardState,
        columns: {
          ...boardState.columns,
          [oldColumn.id]: oldColumn,
          [newColumn.id]: newColumn,
        },
      };

      setBoardState(newState);
      return;
    }

    sourceTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...sourceColumn,
      taskIds: sourceTaskIds,
    };

    const newState = {
      ...boardState,
      columns: {
        ...boardState.columns,
        [newColumn.id]: newColumn,
      },
    };

    setBoardState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="COLUMN">
        {(provided) => (
          <Grid
            container
            direction="row"
            className={classes.boardContainer}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {boardState &&
              boardState.columnOrder.map((columnId, index) => {
                const column = boardState.columns[columnId];
                const tasks = column.taskIds.map((taskId: string) => boardState.tasks[taskId]);
                return <Column key={column.id} column={column} tasks={tasks} index={index} />;
              })}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </DragDropContext>
  );
}
