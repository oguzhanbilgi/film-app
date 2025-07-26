export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  backdropPath: string;
  genres?: string[];
  originalLanguage: string;
  originalTitle: string;
  adult: boolean;
  status?: string;
  runtime?: number;
  tagline?: string;
  homepage?: string;
  popularity: number;
  imdbId?: string;
  budget?: string;
  revenue?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  userLibraries: UserLibrary[];
}

export interface UserLibrary {
  id: number;
  userId: number;
  tmdbMovieId: number;
  addedDate: string;
  movieTitle: string;
  moviePosterPath: string;
  movieOverview: string;
  movieReleaseDate: string;
  movieRating: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
} 