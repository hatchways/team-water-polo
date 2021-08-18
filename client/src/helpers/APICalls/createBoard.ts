import { IBoardData } from '../../interface/Board';
import { FetchOptions } from '../../interface/FetchOptions';

const createBoard = async (title: string, userId: string): Promise<IBoardData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, userId }),
    credentials: 'include',
  };
  return await fetch(`/boards`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createBoard;
