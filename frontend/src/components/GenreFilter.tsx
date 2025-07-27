import React from 'react';
import { 
  FireIcon, 
  HeartIcon, 
  BoltIcon, 
  ExclamationTriangleIcon,
  SparklesIcon,
  FaceSmileIcon,
  MusicalNoteIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface Genre {
  id: number;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface GenreFilterProps {
  selectedGenre: number | null;
  onGenreChange: (genreId: number | null) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenre, onGenreChange }) => {
  const genres: Genre[] = [
    { id: 28, name: 'Aksiyon', icon: BoltIcon, color: 'text-red-400' },
    { id: 12, name: 'Macera', icon: GlobeAltIcon, color: 'text-green-400' },
    { id: 16, name: 'Animasyon', icon: SparklesIcon, color: 'text-purple-400' },
    { id: 35, name: 'Komedi', icon: FaceSmileIcon, color: 'text-yellow-400' },
    { id: 80, name: 'Suç', icon: ExclamationTriangleIcon, color: 'text-gray-400' },
    { id: 99, name: 'Belgesel', icon: DocumentTextIcon, color: 'text-blue-400' },
    { id: 18, name: 'Drama', icon: HeartIcon, color: 'text-pink-400' },
    { id: 10751, name: 'Aile', icon: UserGroupIcon, color: 'text-orange-400' },
    { id: 14, name: 'Fantastik', icon: SparklesIcon, color: 'text-indigo-400' },
    { id: 36, name: 'Tarih', icon: DocumentTextIcon, color: 'text-amber-400' },
    { id: 27, name: 'Korku', icon: ExclamationTriangleIcon, color: 'text-red-600' },
    { id: 10402, name: 'Müzik', icon: MusicalNoteIcon, color: 'text-green-500' },
    { id: 9648, name: 'Gizem', icon: ExclamationTriangleIcon, color: 'text-purple-500' },
    { id: 10749, name: 'Romantik', icon: HeartIcon, color: 'text-pink-500' },
    { id: 878, name: 'Bilim Kurgu', icon: BoltIcon, color: 'text-cyan-400' },
    { id: 10770, name: 'TV Film', icon: FireIcon, color: 'text-orange-500' },
    { id: 53, name: 'Gerilim', icon: ExclamationTriangleIcon, color: 'text-red-500' },
    { id: 10752, name: 'Savaş', icon: BoltIcon, color: 'text-gray-500' },
    { id: 37, name: 'Vahşi Batı', icon: GlobeAltIcon, color: 'text-amber-500' },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <FireIcon className="w-5 h-5 text-primary-400" />
          <span>Film Türleri</span>
        </h3>
        {selectedGenre && (
          <button
            onClick={() => onGenreChange(null)}
            className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
          >
            Filtreyi Temizle
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {genres.map((genre) => {
          const Icon = genre.icon;
          const isSelected = selectedGenre === genre.id;
          
          return (
            <button
              key={genre.id}
              onClick={() => onGenreChange(isSelected ? null : genre.id)}
              className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                isSelected
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg'
                  : 'bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-600 hover:border-primary-500'
              }`}
            >
              <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : genre.color}`} />
              <span className="text-xs font-medium text-center">{genre.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GenreFilter; 