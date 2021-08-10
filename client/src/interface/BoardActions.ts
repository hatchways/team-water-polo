export interface IColumnAction {
  type: 'ADD_COLUMN';
  title: string;
  side: string;
}

export interface ITaskAction {
  type: 'ADD_TASK';
  content: string;
  tag: string;
  columnId: string;
}

export interface IMoveAction {
  type?: 'MOVE_COLUMN' | 'MOVE_TASK';
  sourceIndex: number;
  destinationIndex: number;
  sourceId?: string;
  destinationId?: string;
  draggableId: string;
}
