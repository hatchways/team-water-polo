import { IBoardData } from '../../interface/Board';

const mockData: IBoardData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Essay on the environment', tag: '#5acd76' },
    'task-2': { id: 'task-2', content: 'Midterm exam', date: new Date(2021, 3, 10), tag: '#ff5d48' },
    'task-3': { id: 'task-3', content: 'Practice exam', tag: '#ff5d48' },
    'task-4': { id: 'task-4', content: 'Homework', tag: '#ff5d48' },
    'task-5': { id: 'task-5', content: 'Workshop', tag: '#edab1d' },
    'task-6': { id: 'task-6', content: 'Practice exam', tag: '#ff5d48' },
    'task-7': { id: 'task-7', content: 'Research', tag: '#5acd76' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Philosophy',
      taskIds: ['task-1'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Math',
      taskIds: ['task-2'],
    },
    'column-3': {
      id: 'column-3',
      title: 'In progress',
      taskIds: ['task-3', 'task-4'],
    },
    'column-4': {
      id: 'column-4',
      title: 'Completed',
      taskIds: ['task-5', 'task-6', 'task-7'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};

export default mockData;
