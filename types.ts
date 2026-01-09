
export enum UserRole {
  TUTOR = 'TUTOR',
  STUDENT = 'STUDENT'
}

export enum PostCategory {
  REGISTRATIONS = '📝 Registrations',
  BUS_TIMINGS = '🚌 Bus Timings',
  EVENTS = '🎉 College Events'
}

export enum CollegeYear {
  YEAR_1 = '1st Year',
  YEAR_2 = '2nd Year',
  YEAR_3 = '3rd Year',
  YEAR_4 = '4th Year',
  ALL = 'All Years'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  year?: CollegeYear; // Only for students
  profileImage?: string;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  category: PostCategory;
  targetYear: CollegeYear;
  date: string;
  time: string;
  tutorId: string;
  tutorName: string;
  attachment?: {
    name: string;
    type: string;
    data: string; // Base64
  };
  createdAt: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
