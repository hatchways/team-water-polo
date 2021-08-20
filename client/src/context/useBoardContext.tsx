import { useState, useContext, createContext, FunctionComponent } from 'react';
import { IBoardData, IBoardContext } from '../interface/Board';
import reducer, { setNewBoard } from '../utils/reducer';
import { useImmerReducer } from 'use-immer';
import { useAuth } from './useAuthContext';
import createBoard from '../helpers/APICalls/createBoard';
import { useEffect } from 'react';

export const BoardContext = createContext<IBoardContext>({
  state: undefined,
  dispatch: () => null,
  boardList: [],
  setActiveBoard: () => null,
  createNewBoard: () => null,
});

export const BoardProvider: FunctionComponent = ({ children }): JSX.Element => {
  const { loggedInUser, setLoggedInUser } = useAuth();

  const [boardList, setBoardList] = useState([{ title: '', id: '' }]);
  const [state, dispatch] = useImmerReducer(reducer, loggedInUser?.boards[0] ?? ({} as IBoardData));

  async function createNewBoard(title: string): Promise<void> {
    if (loggedInUser) {
      const newBoard = await createBoard(title, loggedInUser.id);
      if (newBoard) {
        setLoggedInUser({
          ...loggedInUser,
          boards: [...loggedInUser.boards, newBoard],
        });
        dispatch(setNewBoard(newBoard));
      } else {
        console.log('there was a problem creating the board');
      }
    }
  }

  function setActiveBoard(boardId: string): void {
    const activeBoard = loggedInUser.boards.filter((board) => board.id === boardId)[0];
    dispatch(setNewBoard(activeBoard));
  }

  useEffect(() => {
    if (loggedInUser) {
      function mapToBoardList(boards: IBoardData[]) {
        const userBoards: { title: string; id: string }[] = [];
        boards.map((board) => {
          userBoards.push({ title: board.title, id: board.id });
        });
        setBoardList([...userBoards]);
      }
      mapToBoardList(loggedInUser.boards);
    }
  }, [loggedInUser]);

  return (
    <BoardContext.Provider value={{ state, dispatch, boardList, setActiveBoard, createNewBoard }}>
      {children}
    </BoardContext.Provider>
  );
};

export function useBoard(): IBoardContext {
  return useContext(BoardContext);
}
