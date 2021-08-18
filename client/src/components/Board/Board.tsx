import { useState } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './useStyles';
import { Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './Column';
import NewColumnButton from './NewColumnButton';
import MainModal from './Modals/MainModal';
import { IBoardData, INewCard } from '../../interface/Board';
import { setDraggedColumn, setDraggedCard, setNewColumn, setNewCard } from '../../utils/reducer';
import { addCardToDb, addColumnToDb } from '../../utils/thunk';
import { IMoveAction } from '../../interface/BoardActions';
import Saving from './Saving';

type dispatchTypes = INewCard | IMoveAction | string | { title: string; side: string };

interface Props {
  state: IBoardData;
  dispatch: (arg: dispatchTypes) => void;
}

export default function Board({ state, dispatch }: Props): JSX.Element {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [columnSide, setColumnSide] = useState('');
  const [saving, setSaving] = useState(false);

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

    const cardData = {
      ...columnData,
      sourceId: source.droppableId,
      destinationId: destination.droppableId,
    };

    dispatch(setDraggedCard(cardData));
  };

  const addCard = async (newCard: INewCard) => {
    await addCardToDb(newCard, state.id)
      .then((card) => {
        dispatch(setNewCard(card));
      })
      .catch((err) => console.log(err));
  };

  const addColumn = async (title: string) => {
    await addColumnToDb(title, columnSide, state.id)
      .then((column) => {
        dispatch(setNewColumn(column, columnSide));
      })
      .catch((err) => console.log(err));
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
                {state.id &&
                  state.columnOrder.map((columnId, index) => {
                    const column = state.columns[columnId];
                    const cards = column.cardOrder.map((cardId: string) => state.cards[cardId]);
                    return <Column key={column._id} column={column} cards={cards} index={index} addCard={addCard} />;
                  })}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
      <NewColumnButton toggleModal={toggleModal} setColumnSide={setColumnSide} side={'right'} />
      <MainModal isOpen={isOpen} closeModal={toggleModal} submitForm={addColumn} kind={'column'} />
    </Grid>
  );
}
