import { useState, useContext, createContext, FunctionComponent } from 'react';
import { IBoardData, INewCard } from '../interface/Board';
import { IMoveAction } from '../interface/BoardActions';
import reducer from '../utils/reducer';
import { useImmerReducer } from 'use-immer';
import { useAuth } from './useAuthContext';
import createBoard from '../helpers/APICalls/createBoard';
import { useEffect } from 'react';

interface IBoardContext {
  state: IBoardData | undefined;
  dispatch: (arg: INewCard | IMoveAction | string | { title: string; side: string }) => void;
  setBoardIndex: (arg: number) => void;
}

export const BoardContext = createContext<IBoardContext>({
  state: undefined,
  dispatch: () => null,
  setBoardIndex: () => null,
});

export const BoardProvider: FunctionComponent = ({ children }): JSX.Element => {
  const { loggedInUser } = useAuth();
  const [boardIndex, setBoardIndex] = useState(0);
  const [selectedBoard, setSelectedBoard] = useState<IBoardData>(
    loggedInUser?.boards[boardIndex] ?? ({} as IBoardData),
  );

  useEffect(() => {
    const checkForBoard = async () => {
      if (loggedInUser && !loggedInUser.boards.length) {
        // if the user does not have any boards yet, create one
        const newBoard = await createBoard('New board', loggedInUser.id);
        if (newBoard.success) {
          loggedInUser.boards.push(newBoard.success.board);
        }
      } else if (loggedInUser?.boards.length) {
        setSelectedBoard(loggedInUser.boards[boardIndex]);
      }
    };
    checkForBoard();
  }, [loggedInUser, boardIndex]);

  const [state, dispatch] = useImmerReducer(reducer, selectedBoard);

  return <BoardContext.Provider value={{ state, dispatch, setBoardIndex }}>{children}</BoardContext.Provider>;
};

export function useBoard(): IBoardContext {
  return useContext(BoardContext);
}
