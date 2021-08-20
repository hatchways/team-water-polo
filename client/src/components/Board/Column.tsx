import { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import useStyles from './useStyles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { IPropColumn, IPropCard, INewCard } from '../../interface/Board';
import Task from './Task';
import NewCardForm from './Forms/NewCardForm';
import { theme } from '../../themes/theme';

interface Props {
  column: IPropColumn;
  cards: IPropCard[];
  index: number;
  addCard: (newCard: INewCard) => void;
}

export default function Column({ column, cards, index, addCard }: Props): JSX.Element {
  const classes = useStyles(theme);
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm((showForm) => !showForm);
  };

  return (
    <Draggable draggableId={column._id} index={index}>
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
          <Droppable droppableId={column._id} type="CARD">
            {(provided) => (
              <Grid className={classes.cardList} ref={provided.innerRef} {...provided.droppableProps}>
                {cards.map((card, idx) => (
                  <Task key={card._id} card={card} index={idx} />
                ))}
                {provided.placeholder}
                {showForm ? (
                  <NewCardForm addCard={addCard} closeForm={handleClick} columnId={column._id} />
                ) : (
                  <Button className={classes.newCardButton} onClick={handleClick}>
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
