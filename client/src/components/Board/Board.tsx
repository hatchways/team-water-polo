import { useState } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './useStyles';
import { Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './Column';
import NewColumnButton from './NewColumnButton';
import mockData from './mockData';
import MainModal from './Modals/MainModal';
import { INewTask } from '../../interface/Board';
import { useImmerReducer } from 'use-immer';
import reducer, { setDraggedColumn, setDraggedTask, setNewColumn, setNewTask } from '../../utils/reducer';
import Saving from './Saving';

export default function Board(): JSX.Element {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [columnSide, setColumnSide] = useState('');

  // use setSaving(true) to trigger 'saving...' text
  const [saving, setSaving] = useState(false);

  const [state, dispatch] = useImmerReducer(reducer, mockData);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const columnData = {
      sourceIndex: source.index,
      destinationIndex: destination.index,
      draggableId: draggableId,
    };

    if (type === 'COLUMN') {
      dispatch(setDraggedColumn(columnData));
      return;
    }

    const taskData = {
      ...columnData,
      sourceId: source.droppableId,
      destinationId: destination.droppableId,
    };

    dispatch(setDraggedTask(taskData));
  };

  const addTask = (newTask: INewTask) => {
    dispatch(setNewTask(newTask));
  };

  const addColumn = (title: string) => {
    dispatch(setNewColumn(title, columnSide));
  };

  return (
    <Grid container direction="row" className={classes.boardContainer}>
      <NewColumnButton toggleModal={toggleModal} setColumnSide={setColumnSide} side={'left'} />
      <Grid container item md={10} direction="column">
        <Saving isSaving={saving} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="COLUMN">
            {(provided) => (
              <Grid
                container
                direction="row"
                className={classes.board}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {state &&
                  state.columnOrder.map((columnId, index) => {
                    const column = state.columns[columnId];
                    const tasks = column.taskIds.map((taskId: string) => state.tasks[taskId]);
                    return <Column key={column.id} column={column} tasks={tasks} index={index} addTask={addTask} />;
                  })}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
      <NewColumnButton toggleModal={toggleModal} setColumnSide={setColumnSide} side={'right'} />
      <MainModal isOpen={isOpen} isColumn={true} closeModal={toggleModal} addColumn={addColumn} />
    </Grid>
  );
}
