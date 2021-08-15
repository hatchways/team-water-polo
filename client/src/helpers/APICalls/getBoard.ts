import { IBoardData } from '../../interface/Board';
import { FetchOptions } from '../../interface/FetchOptions';

const getBoard = async (boardId: string): Promise<IBoardData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/boards/${boardId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getBoard;
