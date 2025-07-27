import React from 'react';
import { Movie } from '../types';
import { 
  XMarkIcon, 
  StarIcon, 
  CalendarIcon, 
  ClockIcon,
  PlusIcon,
  MinusIcon
} from '@heroicons/react/24/solid';
import { LibraryContext } from '../App';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {
  const libraryContext = React.useContext(LibraryContext);

  if (!isOpen || !movie) return null;

  const isInLibrary = libraryContext?.isInLibrary(movie.id) || false;

  const handleLibraryAction = () => {
    if (libraryContext) {
      if (isInLibrary) {
        libraryContext.removeFromLibrary(movie.id);
      } else {
        libraryContext.addToLibrary(movie.id);
      }
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Film Detayları</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Poster */}
          <div className="lg:w-1/3 p-6">
            <div className="relative group">
              <img
                src={movie.posterPath || '/placeholder-movie.jpg'}
                alt={movie.title}
                className="w-full rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-movie.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:w-2/3 p-6">
            <div className="space-y-6">
              {/* Title and Rating */}
              <div>
                <h1 className="text-3xl font-bold text-white mb-3">{movie.title}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-1 rounded-full">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">{movie.voteAverage?.toFixed(1) || 'N/A'}</span>
                  </div>
                  {movie.voteCount && (
                    <span className="text-gray-400 text-sm">({movie.voteCount.toLocaleString()} oy)</span>
                  )}
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm">
                {movie.releaseDate && (
                  <div className="flex items-center space-x-2 text-gray-300">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{new Date(movie.releaseDate).getFullYear()}</span>
                  </div>
                )}
                {movie.runtime && (
                  <div className="flex items-center space-x-2 text-gray-300">
                    <ClockIcon className="w-4 h-4" />
                    <span>{movie.runtime} dakika</span>
                  </div>
                )}
                {movie.originalLanguage && (
                  <div className="flex items-center space-x-2 text-gray-300">
                    <span className="uppercase bg-gray-700 px-2 py-1 rounded text-xs">
                      {movie.originalLanguage}
                    </span>
                  </div>
                )}
              </div>

              {/* Overview */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Özet</h3>
                <p className="text-gray-300 leading-relaxed">
                  {movie.overview || 'Bu film için henüz açıklama bulunmuyor.'}
                </p>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Türler</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="bg-primary-600/20 text-primary-400 px-3 py-1 rounded-full text-sm border border-primary-600/30"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleLibraryAction}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isInLibrary
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  {isInLibrary ? (
                    <>
                      <MinusIcon className="w-5 h-5" />
                      <span>Kütüphaneden Çıkar</span>
                    </>
                  ) : (
                    <>
                      <PlusIcon className="w-5 h-5" />
                      <span>Kütüphaneye Ekle</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg font-medium transition-all duration-200"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal; 