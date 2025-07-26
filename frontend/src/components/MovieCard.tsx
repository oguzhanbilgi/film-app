import React, { useContext } from 'react';
import { Movie } from '../types';
import { StarIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { LibraryContext } from '../App';

interface MovieCardProps {
  movie: Movie;
  isInLibrary?: boolean;
  onAddToLibrary?: (movieId: number) => void;
  onRemoveFromLibrary?: (movieId: number) => void;
  showLibraryActions?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isInLibrary = false,
  onAddToLibrary,
  onRemoveFromLibrary,
  showLibraryActions = true,
}) => {
  const libraryContext = useContext(LibraryContext);
  
  const handleLibraryAction = () => {
    if (libraryContext) {
      if (libraryContext.isInLibrary(movie.id)) {
        libraryContext.removeFromLibrary(movie.id);
      } else {
        libraryContext.addToLibrary(movie.id);
      }
    } else if (isInLibrary && onRemoveFromLibrary) {
      onRemoveFromLibrary(movie.id);
    } else if (!isInLibrary && onAddToLibrary) {
      onAddToLibrary(movie.id);
    }
  };

  return (
    <div className="movie-card group">
      <div className="relative">
        <img
          src={movie.posterPath || '/placeholder-movie.jpg'}
          alt={movie.title}
          className="movie-poster"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-movie.jpg';
          }}
        />
        
        {showLibraryActions && (
          <button
            onClick={handleLibraryAction}
            className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
              (libraryContext ? libraryContext.isInLibrary(movie.id) : isInLibrary)
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
            title={(libraryContext ? libraryContext.isInLibrary(movie.id) : isInLibrary) ? 'Kütüphaneden Çıkar' : 'Kütüphaneye Ekle'}
                      >
              {(libraryContext ? libraryContext.isInLibrary(movie.id) : isInLibrary) ? (
                <MinusIcon className="w-5 h-5" />
              ) : (
                <PlusIcon className="w-5 h-5" />
              )}
            </button>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center gap-2 mb-2">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-semibold">{movie.voteAverage.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
          {movie.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-2">
          {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'Tarih Yok'}
        </p>
        
        <p className="text-gray-300 text-sm line-clamp-3">
          {movie.overview || 'Açıklama bulunmuyor.'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard; 