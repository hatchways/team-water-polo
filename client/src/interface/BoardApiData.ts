import { IBoardData } from './Board';

export interface BoardApiDataSuccess {
  message: string;
  board: IBoardData;
  token: string;
}

export interface BoardApiData {
  error?: { message: string };
  success?: BoardApiDataSuccess;
}
