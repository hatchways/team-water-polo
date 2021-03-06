import { IMoveAction } from './BoardActions';

export interface IBoardData {
  id: string;
  title: string;
  cards: ICard;
  columns: IColumn;
  columnOrder: string[];
}

export interface IBoardContext {
  state: IBoardData | undefined;
  dispatch: (arg: INewCard | IMoveAction | string | { title: string; side: string }) => void;
  boardList: { title: string; id: string }[];
  setActiveBoard: (arg: string) => void;
  createNewBoard: (arg: string) => void;
}

export interface ICard {
  [name: string]: {
    _id: string;
    title: string;
    tag: string;
    date?: Date;
  };
}

export interface IColumn {
  [name: string]: {
    _id: string;
    title: string;
    cards: ICard[];
    cardOrder: string[];
  };
}

export interface IPropColumn {
  _id: string;
  title: string;
  cards: ICard[];
  cardOrder: string[];
}

export interface IPropCard {
  _id: string;
  title: string;
  tag: string;
  date?: Date;
}

export interface INewCard {
  id?: string;
  title: string;
  tag: string;
  columnId: string;
}
