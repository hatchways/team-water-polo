import { addTaskToColumn, addColumnToBoard, moveColumn, moveTask } from './reducerFunctions';
import { IColumnAction, ITaskAction, IMoveAction } from '../interface/BoardActions';
import { IBoardData, INewTask } from '../interface/Board';

// Actions

const ADD_TASK = 'ADD_TASK';
const ADD_COLUMN = 'ADD_COLUMN';
const MOVE_TASK = 'MOVE_TASK';
const MOVE_COLUMN = 'MOVE_COLUMN';

// Action creators

export const setNewTask = (task: INewTask): ITaskAction => {
  return {
    type: ADD_TASK,
    ...task,
  };
};

export const setNewColumn = (title: string, side: string): IColumnAction => {
  return {
    type: ADD_COLUMN,
    title: title,
    side: side,
  };
};

export const setDraggedTask = (data: IMoveAction): IMoveAction => {
  return {
    type: MOVE_TASK,
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

type IActions = IColumnAction | ITaskAction | IMoveAction;

export default function reducer(draft: IBoardData, action: IActions): void {
  switch (action.type) {
    case ADD_TASK:
      return addTaskToColumn(draft, action);
    case ADD_COLUMN:
      return addColumnToBoard(draft, action);
    case MOVE_TASK:
      return moveTask(draft, action);
    case MOVE_COLUMN:
      return moveColumn(draft, action);
  }
}
