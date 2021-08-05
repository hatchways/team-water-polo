export interface IBoardData {
  tasks: ITask;
  columns: IColumn;
  columnOrder: string[];
}

export interface ITask {
  [name: string]: {
    id: string;
    content: string;
    tag?: string;
    date?: Date;
  };
}

export interface IColumn {
  [name: string]: {
    id: string;
    title: string;
    taskIds: string[];
  };
}

export interface IPropColumn {
  id: string;
  title: string;
  taskIds: string[];
}

export interface IPropTask {
  id: string;
  content: string;
  tag?: string;
  date?: Date;
}
