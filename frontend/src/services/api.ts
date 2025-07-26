import axios from 'axios';
import { Movie, User, UserLibrary } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Movie API calls
export const movieApi = {
  getPopular: (page: number = 1) => 
    api.get<Movie[]>(`/movies/popular?page=${page}`),
  
  getTopRated: (page: number = 1) => 
    api.get<Movie[]>(`/movies/top-rated?page=${page}`),
  
  getNowPlaying: (page: number = 1) => 
    api.get<Movie[]>(`/movies/now-playing?page=${page}`),
  
  getUpcoming: (page: number = 1) => 
    api.get<Movie[]>(`/movies/upcoming?page=${page}`),
  
  search: (query: string, page: number = 1) => 
    api.get<Movie[]>(`/movies/search?query=${encodeURIComponent(query)}&page=${page}`),
  
  getDetails: (movieId: number) => 
    api.get<Movie>(`/movies/${movieId}`),
};

// User API calls
export const userApi = {
  getAll: () => api.get<User[]>('/users'),
  getById: (id: number) => api.get<User>(`/users/${id}`),
  create: (user: Omit<User, 'id' | 'userLibraries'>) => api.post<User>('/users', user),
  update: (id: number, user: Partial<User>) => api.put<User>(`/users/${id}`, user),
  delete: (id: number) => api.delete(`/users/${id}`),
};

// User Library API calls
export const userLibraryApi = {
  getUserLibrary: (userId: number) => 
    api.get<UserLibrary[]>(`/user-library/${userId}`),
  
  addMovieToLibrary: (userId: number, tmdbMovieId: number) => 
    api.post<UserLibrary>(`/user-library/${userId}/movies/${tmdbMovieId}`),
  
  removeMovieFromLibrary: (userId: number, tmdbMovieId: number) => 
    api.delete(`/user-library/${userId}/movies/${tmdbMovieId}`),
  
  isMovieInLibrary: (userId: number, tmdbMovieId: number) => 
    api.get<boolean>(`/user-library/${userId}/movies/${tmdbMovieId}/check`),
  
  getLibraryCount: (userId: number) => 
    api.get<number>(`/user-library/${userId}/count`),
};

export default api; 