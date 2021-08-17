import { IBoardData } from '../interface/Board';

const mockData: IBoardData = {
  id: 'schoolboard',
  title: 'My school board',
  cards: {
    'task-1': { _id: 'task-1', content: 'Essay on the environment', tag: '#5acd76' },
    'task-2': { _id: 'task-2', content: 'Midterm exam', date: new Date(2021, 3, 10), tag: '#ff5d48' },
    'task-3': { _id: 'task-3', content: 'Practice exam', tag: '#ff5d48' },
    'task-4': { _id: 'task-4', content: 'Homework', tag: '#ff5d48' },
    'task-5': { _id: 'task-5', content: 'Workshop', tag: '#edab1d' },
    'task-6': { _id: 'task-6', content: 'Practice exam', tag: '#ff5d48' },
    'task-7': { _id: 'task-7', content: 'Research', tag: '#5acd76' },
  },
  columns: {
    'column-1': {
      _id: 'column-1',
      title: 'Philosophy',
      cards: [{ 'task-1': { _id: 'task-1', content: 'Essay on the environment', tag: '#5acd76' } }],
      cardOrder: ['task-1'],
    },
    'column-2': {
      _id: 'column-2',
      title: 'Math',
      cards: [{ 'task-2': { _id: 'task-2', content: 'Midterm exam', date: new Date(2021, 3, 10), tag: '#ff5d48' } }],
      cardOrder: ['task-2'],
    },
    'column-3': {
      _id: 'column-3',
      title: 'In progress',
      cards: [
        { 'task-3': { _id: 'task-3', content: 'Practice exam', tag: '#ff5d48' } },
        { 'task-4': { _id: 'task-4', content: 'Homework', tag: '#ff5d48' } },
      ],
      cardOrder: ['task-3', 'task-4'],
    },
    'column-4': {
      _id: 'column-4',
      title: 'Completed',
      cards: [
        { 'task-5': { _id: 'task-5', content: 'Workshop', tag: '#edab1d' } },
        { 'task-6': { _id: 'task-6', content: 'Practice exam', tag: '#ff5d48' } },
        { 'task-7': { _id: 'task-7', content: 'Research', tag: '#5acd76' } },
      ],
      cardOrder: ['task-5', 'task-6', 'task-7'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

export default mockData;
