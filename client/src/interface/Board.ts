export interface IBoardData {
  tasks: ITask;
  columns: IColumn;
  columnOrder: string[];
}

export interface ITask {
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
    cards: ITask[];
    cardOrder: string[];
  };
}

export interface IPropColumn {
  _id: string;
  title: string;
  cards: ITask[];
  cardOrder: string[];
}

export interface IPropTask {
  _id: string;
  content: string;
  tag: string;
  date?: Date;
}

export interface INewTask {
  content: string;
  tag: string;
  columnId: string;
}
