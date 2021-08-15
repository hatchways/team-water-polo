import { useState, useContext, createContext, FunctionComponent, useCallback } from 'react';
import { IBoardData } from '../interface/Board';
import { useEffect } from 'react';
import getBoard from '../helpers/APICalls/getBoard';
import { BoardApiData, BoardApiDataSuccess } from '../interface/BoardApiData';
import mockData from '../mocks/mockBoard';
import createBoard from '../helpers/APICalls/createBoard';

interface IBoardContext {
  selectedBoard: IBoardData | undefined;
  setBoardId: (id: string) => void;
}

export const BoardContext = createContext<IBoardContext>({
  selectedBoard: undefined,
  setBoardId: () => null,
});

export const BoardProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [selectedBoard, setSelectedBoard] = useState<IBoardData>();
  const [boardId, setBoardId] = useState<string>('61173b890df1143ce405abcf');

  const updateBoard = useCallback((board: IBoardData) => {
    setSelectedBoard(board);
  }, []);

  useEffect(() => {
    if (!boardId) {
      createBoard('New board');
    } else {
      getBoard(boardId).then((board: IBoardData) => {
        if (board) {
          updateBoard(board);
        } else {
          console.log('Failed to retrieve board data from server');
        }
      });
    }
  }, [boardId, updateBoard]);

  return <BoardContext.Provider value={{ selectedBoard, setBoardId }}>{children}</BoardContext.Provider>;
};

export function useBoard(): IBoardContext {
  return useContext(BoardContext);
}
