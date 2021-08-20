import { IBoardData } from './Board';

export interface User {
  id: string;
  email: string;
  username: string;
  boards: IBoardData[];
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
