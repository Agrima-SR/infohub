
import { User, Post, UserRole } from '../types';
import { INITIAL_POSTS } from '../constants';

const USERS_KEY = 'infohub_users';
const POSTS_KEY = 'infohub_posts';
const CURRENT_USER_KEY = 'infohub_current_user';

export const storage = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUser: (user: User) => {
    const users = storage.getUsers();
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  getPosts: (): Post[] => {
    const data = localStorage.getItem(POSTS_KEY);
    return data ? JSON.parse(data) : INITIAL_POSTS;
  },

  savePost: (post: Post) => {
    const posts = storage.getPosts();
    localStorage.setItem(POSTS_KEY, JSON.stringify([post, ...posts]));
  },

  updatePost: (updatedPost: Post) => {
    const posts = storage.getPosts().map(p => p.id === updatedPost.id ? updatedPost : p);
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  },

  deletePost: (id: string) => {
    const posts = storage.getPosts().filter(p => p.id !== id);
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  }
};
