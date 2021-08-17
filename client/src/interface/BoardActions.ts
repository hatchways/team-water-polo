export interface IColumnAction {
  type?: 'ADD_COLUMN';
  _id: string;
  title: string;
  side: string;
  cards: [];
  cardOrder: [];
}

export interface ICardAction {
  type?: 'ADD_CARD';
  _id: string;
  content: string;
  tag: string;
  columnId: string;
}

export interface IMoveAction {
  type?: 'MOVE_COLUMN' | 'MOVE_CARD';
  sourceIndex: number;
  destinationIndex: number;
  sourceId?: string;
  destinationId?: string;
  draggableId: string;
}
