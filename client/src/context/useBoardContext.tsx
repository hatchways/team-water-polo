import { useState, useContext, createContext, FunctionComponent, useCallback } from 'react';
import { IBoardData } from '../interface/Board';
import { useEffect } from 'react';
import getBoard from '../helpers/APICalls/getBoard';
import { BoardApiData, BoardApiDataSuccess } from '../interface/BoardApiData';

interface IBoardContext {
  selectedBoard: IBoardData | undefined;
  updateBoard: (data: BoardApiDataSuccess) => void;
  setBoardId: (id: number) => void;
}

export const BoardContext = createContext<IBoardContext>({
  selectedBoard: undefined,
  updateBoard: () => null,
  setBoardId: () => null,
});

export const BoardProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [selectedBoard, setSelectedBoard] = useState<IBoardData>();
  const [boardId, setBoardId] = useState<number>(0);

  const updateBoard = useCallback((data: BoardApiDataSuccess) => {
    setSelectedBoard(data.board);
  }, []);

  useEffect(() => {
    getBoard(boardId).then((data: BoardApiData) => {
      if (data.success) {
        updateBoard(data.success);
      } else {
        console.log('could not retrieve board data from server');
      }
    });
  }, [boardId, updateBoard]);

  return <BoardContext.Provider value={{ selectedBoard, updateBoard, setBoardId }}>{children}</BoardContext.Provider>;
};

export function useBoard(): IBoardContext {
  return useContext(BoardContext);
}
