
import { PostCategory, CollegeYear } from './types';

export const CATEGORIES = [
  PostCategory.REGISTRATIONS,
  PostCategory.BUS_TIMINGS,
  PostCategory.EVENTS
];

export const YEARS = [
  CollegeYear.YEAR_1,
  CollegeYear.YEAR_2,
  CollegeYear.YEAR_3,
  CollegeYear.YEAR_4
];

export const INITIAL_POSTS = [
  {
    id: '1',
    title: 'Orientation Registration',
    description: 'Registration for the freshman orientation is now open. Please fill out the form by Friday.',
    category: PostCategory.REGISTRATIONS,
    targetYear: CollegeYear.YEAR_1,
    date: '2024-09-01',
    time: '10:00 AM',
    tutorId: 'tutor-1',
    tutorName: 'Dr. Sarah Smith',
    createdAt: Date.now() - 86400000
  },
  {
    id: '2',
    title: 'Evening Bus Schedule Change',
    description: 'The 6:00 PM bus to City Center will now depart at 6:15 PM starting Monday.',
    category: PostCategory.BUS_TIMINGS,
    targetYear: CollegeYear.ALL,
    date: '2024-09-05',
    time: '06:00 PM',
    tutorId: 'tutor-1',
    tutorName: 'Dr. Sarah Smith',
    createdAt: Date.now() - 43200000
  }
];
