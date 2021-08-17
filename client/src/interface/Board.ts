export interface IBoardData {
  id: string;
  title: string;
  cards: ICard;
  columns: IColumn;
  columnOrder: string[];
}

export interface ICard {
  [name: string]: {
    _id: string;
    content: string;
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
  content: string;
  tag: string;
  date?: Date;
}

export interface INewCard {
  id?: string;
  content: string;
  tag: string;
  columnId: string;
}
