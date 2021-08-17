import { INewCard } from '../interface/Board';
import { addNewCard, addNewColumn } from '../helpers/APICalls/updateBoard';
import { ICardAction, IColumnAction } from '../interface/BoardActions';

export async function addCardToDb(newCard: INewCard, boardId: string): Promise<ICardAction> {
  return await addNewCard(newCard, boardId);
}

export async function addColumnToDb(title: string, side: string, boardId: string): Promise<IColumnAction> {
  return await addNewColumn(title, side, boardId);
}
