import { FetchOptions } from '../../interface/FetchOptions';
import { INewCard } from '../../interface/Board';
import { IColumnAction, ICardAction, IMoveAction } from '../../interface/BoardActions';

export const updateColumnOrder = async (columnOrder: string[], boardId: string): Promise<void> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ columnOrder: columnOrder, type: 'COLUMN' }),
    credentials: 'include',
  };
  return await fetch(`/boards/${boardId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const updateCardOrder = async ({
  sourceIndex,
  destinationIndex,
  sourceId,
  destinationId,
  draggableId,
}: IMoveAction): Promise<void> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sourceIndex, destinationIndex, sourceId, destinationId }),
    credentials: 'include',
  };
  return await fetch(`/cards/${draggableId}/move`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const addNewCard = async ({ columnId, title, tag }: INewCard, boardId: string): Promise<ICardAction> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ columnId, title, tag, boardId }),
    credentials: 'include',
  };
  return await fetch(`/cards`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const addNewColumn = async (title: string, side: string, boardId: string): Promise<IColumnAction> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, side, boardId }),
    credentials: 'include',
  };
  return await fetch(`/columns`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
