import { IBoardData } from '../interface/Board';
import { IColumnAction, ITaskAction, IMoveAction } from '../interface/BoardActions';

export function addTaskToColumn(state: IBoardData, data: ITaskAction): void {
  const { content, tag, columnId } = data;
  const taskId = content; // for now use content as ID, later integrate back-end to return newly created contentID

  state.tasks[taskId] = {
    id: taskId,
    content: content,
    tag: tag,
  };
  state.columns[columnId].taskIds.push(taskId);
}

const getNewColumnOrder = (state: IBoardData, side: string, columnId: string) => {
  if (side === 'right') {
    return [...state.columnOrder, columnId];
  } else {
    return [columnId, ...state.columnOrder];
  }
};

export function addColumnToBoard(state: IBoardData, data: IColumnAction): void {
  const { title, side } = data;
  const columnId = title; // for now use title as ID, later integrate back-end

  state.columnOrder = getNewColumnOrder(state, side, columnId);
  state.columns[columnId] = {
    id: columnId,
    title: title,
    taskIds: [],
  };
}

export function moveTask(state: IBoardData, data: IMoveAction): void {
  const { sourceIndex, destinationIndex, sourceId, destinationId, draggableId } = data;

  if (!sourceId || !destinationId) return;

  state.columns[sourceId].taskIds.splice(sourceIndex, 1);

  // if moving task to a different column, both destination and source columns must be updated
  if (destinationId !== sourceId) {
    state.columns[destinationId].taskIds.splice(destinationIndex, 0, draggableId);
    return;
  }

  state.columns[sourceId].taskIds.splice(destinationIndex, 0, draggableId);
}

export function moveColumn(state: IBoardData, data: IMoveAction): void {
  const { sourceIndex, destinationIndex, draggableId } = data;
  state.columnOrder.splice(sourceIndex, 1);
  state.columnOrder.splice(destinationIndex, 0, draggableId);
}
