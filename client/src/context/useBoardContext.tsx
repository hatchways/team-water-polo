import { useContext, createContext, FunctionComponent } from 'react';
import { IBoardData, IBoardContext } from '../interface/Board';
import reducer, { setNewBoard } from '../utils/reducer';
import { useImmerReducer } from 'use-immer';
import { useAuth } from './useAuthContext';
import createBoard from '../helpers/APICalls/createBoard';

export const BoardContext = createContext<IBoardContext>({
  state: undefined,
  dispatch: () => null,
  createNewBoard: () => null,
});

export const BoardProvider: FunctionComponent = ({ children }): JSX.Element => {
  const { loggedInUser, setLoggedInUser } = useAuth();

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

  return <BoardContext.Provider value={{ state, dispatch, createNewBoard }}>{children}</BoardContext.Provider>;
};

export function useBoard(): IBoardContext {
  return useContext(BoardContext);
}
