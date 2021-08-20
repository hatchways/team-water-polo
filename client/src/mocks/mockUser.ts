import { User } from '../interface/User';

const mockLoggedInUser: User = {
  id: 'mockLoggedInUser',
  email: 'mockLoggedInUser@gmail.com',
  username: 'mock LoggedIn user',
  boards: [],
};

const mockOtherUser1: User = {
  id: 'mockOtherUser1',
  username: 'Mock test user 1',
  email: 'mockTestUser1@gmail.com',
  boards: [],
};
const mockOtherUser2: User = {
  id: 'mockOtherUser2',
  username: 'Mock test user 2',
  email: 'mockTestUser2@gmail.com',
  boards: [],
};
const mockOtherUser3: User = {
  id: 'mockOtherUser3',
  username: 'Mock test user 3',
  email: 'mockTestUser3@gmail.com',
  boards: [],
};

const mockOtherUsers: User[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
