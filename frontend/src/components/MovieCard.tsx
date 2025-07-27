import React, { useContext, useState } from 'react';
import { Movie } from '../types';
import { StarIcon, PlusIcon, MinusIcon, EyeIcon } from '@heroicons/react/24/solid';
import { LibraryContext } from '../App';
import MovieModal from './MovieModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleLibraryAction = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        className="movie-card group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        onClick={handleCardClick}
      >
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={movie.posterPath || '/placeholder-movie.jpg'}
            alt={movie.title}
            className="movie-poster w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-movie.jpg';
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-semibold text-white">{movie.voteAverage?.toFixed(1) || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <EyeIcon className="w-5 h-5 text-white" />
                  <span className="text-sm text-white">Detaylar</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Library Action Button */}
          {showLibraryActions && (
            <button
              onClick={handleLibraryAction}
              className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 shadow-lg ${
                (libraryContext ? libraryContext.isInLibrary(movie.id) : isInLibrary)
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
              title={(libraryContext ? libraryContext.isInLibrary(movie.id) : isInLibrary) ? 'Kütüphaneden Çıkar' : 'Kütüphaneye Ekle'}
            >
              {(libraryContext ? libraryContext.isInLibrary(movie.id) : isInLibrary) ? (
                <MinusIcon className="w-4 h-4" />
              ) : (
                <PlusIcon className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        
        <div className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-b-xl">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors text-white">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">
              {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'Tarih Yok'}
            </p>
            <div className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">{movie.voteAverage?.toFixed(1) || 'N/A'}</span>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm line-clamp-2">
            {movie.overview || 'Açıklama bulunmuyor.'}
          </p>
        </div>
      </div>

      {/* Movie Modal */}
      <MovieModal
        movie={movie}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default MovieCard; 