import React from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  error?: string;
  isInLibrary?: (movieId: number) => boolean;
  onAddToLibrary?: (movieId: number) => void;
  onRemoveFromLibrary?: (movieId: number) => void;
  showLibraryActions?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  loading = false,
  error,
  isInLibrary,
  onAddToLibrary,
  onRemoveFromLibrary,
  showLibraryActions = true,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-lg mb-2">Hata oluştu</div>
        <div className="text-gray-400">{error}</div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-lg">Film bulunamadı</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isInLibrary={isInLibrary ? isInLibrary(movie.id) : false}
          onAddToLibrary={onAddToLibrary}
          onRemoveFromLibrary={onRemoveFromLibrary}
          showLibraryActions={showLibraryActions}
        />
      ))}
    </div>
  );
};

export default MovieGrid; 