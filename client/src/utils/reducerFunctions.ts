import { IBoardData } from '../interface/Board';
import { IBoardAction, IColumnAction, ICardAction, IMoveAction } from '../interface/BoardActions';
import { updateCardOrder, updateColumnOrder } from '../helpers/APICalls/updateBoard';

export function addCardToColumn(state: IBoardData, data: ICardAction): void {
  const { _id, columnId } = data;
  state.cards[_id] = data;
  state.columns[columnId].cardOrder.push(_id);
}

const getNewColumnOrder = (state: IBoardData, side: string, columnId: string) => {
  if (side === 'right') {
    return [...state.columnOrder, columnId];
  } else {
    return [columnId, ...state.columnOrder];
  }
};

export function addColumnToBoard(state: IBoardData, data: IColumnAction): void {
  const { _id, side } = data;

  state.columnOrder = getNewColumnOrder(state, side, _id);
  state.columns[_id] = data;
}

export function moveCard(state: IBoardData, data: IMoveAction): void {
  const { sourceIndex, destinationIndex, sourceId, destinationId, draggableId } = data;

  if (!sourceId || !destinationId) return;

  state.columns[sourceId].cardOrder.splice(sourceIndex, 1);

  // if moving task to a different column, both destination and source columns must be updated
  if (destinationId !== sourceId) {
    state.columns[destinationId].cardOrder.splice(destinationIndex, 0, draggableId);
  } else {
    state.columns[sourceId].cardOrder.splice(destinationIndex, 0, draggableId);
  }
  updateCardOrder(data);
}

export function moveColumn(state: IBoardData, data: IMoveAction): void {
  const { sourceIndex, destinationIndex, draggableId } = data;
  state.columnOrder.splice(sourceIndex, 1);
  state.columnOrder.splice(destinationIndex, 0, draggableId);
  updateColumnOrder(state.columnOrder, state.id);
}

export function setBoard(state: IBoardData, data: IBoardAction): void {
  const { id, title, cards, columns, columnOrder } = data;
  state.id = id;
  state.title = title;
  state.cards = cards;
  state.columns = { ...columns };
  state.columnOrder = [...columnOrder];
}
