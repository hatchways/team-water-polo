import { addCardToColumn, addColumnToBoard, moveColumn, moveCard, setBoard } from './reducerFunctions';
import { IBoardAction, IColumnAction, ICardAction, IMoveAction } from '../interface/BoardActions';
import { IBoardData } from '../interface/Board';

// Actions

const ADD_CARD = 'ADD_CARD';
const ADD_COLUMN = 'ADD_COLUMN';
const SET_BOARD = 'SET_BOARD';
const MOVE_CARD = 'MOVE_CARD';
const MOVE_COLUMN = 'MOVE_COLUMN';

// Action creators

export const setNewCard = (card: ICardAction): ICardAction => {
  return {
    type: ADD_CARD,
    ...card,
  };
};

export const setNewColumn = (column: IColumnAction, side: string): IColumnAction => {
  return {
    type: ADD_COLUMN,
    ...column,
    side: side,
  };
};

export const setNewBoard = (board: IBoardData): IBoardAction => {
  return {
    type: SET_BOARD,
    ...board,
  };
};

export const setDraggedCard = (data: IMoveAction): IMoveAction => {
  return {
    type: MOVE_CARD,
    ...data,
  };
};

export const setDraggedColumn = (data: IMoveAction): IMoveAction => {
  return {
    type: MOVE_COLUMN,
    ...data,
  };
};

// Reducer

type IActions = IBoardAction | IColumnAction | ICardAction | IMoveAction;

export default function reducer(draft: IBoardData, action: IActions): void | IBoardData {
  switch (action.type) {
    case ADD_CARD:
      return addCardToColumn(draft, action);
    case ADD_COLUMN:
      return addColumnToBoard(draft, action);
    case SET_BOARD:
      return setBoard(draft, action);
    case MOVE_CARD:
      return moveCard(draft, action);
    case MOVE_COLUMN:
      return moveColumn(draft, action);
  }
}
