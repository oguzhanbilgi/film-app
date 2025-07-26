import React, { useState, useEffect } from 'react';
import { UserLibrary } from '../types';
import { userLibraryApi } from '../services/api';
import MovieGrid from '../components/MovieGrid';
import { BookmarkIcon, TrashIcon } from '@heroicons/react/24/outline';

const LibraryPage: React.FC = () => {
  const [library, setLibrary] = useState<UserLibrary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number>(1); // Default to first user

  useEffect(() => {
    fetchLibrary();
  }, [selectedUserId]);

  const fetchLibrary = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userLibraryApi.getUserLibrary(selectedUserId);
      setLibrary(response.data);
    } catch (err) {
      setError('Kütüphane yüklenirken hata oluştu');
      console.error('Library fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromLibrary = async (movieId: number) => {
    try {
      await userLibraryApi.removeMovieFromLibrary(selectedUserId, movieId);
      setLibrary(library.filter(item => item.tmdbMovieId !== movieId));
    } catch (err) {
      console.error('Remove from library error:', err);
    }
  };

  // Convert UserLibrary to Movie format for MovieGrid
  const libraryMovies = library.map(item => ({
    id: item.tmdbMovieId,
    title: item.movieTitle,
    overview: item.movieOverview,
    posterPath: item.moviePosterPath,
    releaseDate: item.movieReleaseDate,
    voteAverage: item.movieRating,
    voteCount: 0,
    backdropPath: '',
    originalLanguage: '',
    originalTitle: '',
    adult: false,
    popularity: 0,
  }));

  const isInLibrary = (movieId: number) => {
    return library.some(item => item.tmdbMovieId === movieId);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookmarkIcon className="w-8 h-8 text-primary-500" />
            <h1 className="text-3xl font-bold text-white">Kütüphanem</h1>
          </div>
          
          {/* User Selector */}
          <div className="flex items-center gap-4 mb-6">
            <label className="text-gray-300">Kullanıcı:</label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(Number(e.target.value))}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value={1}>testuser1</option>
              <option value={2}>testuser2</option>
            </select>
          </div>

          <p className="text-gray-400">
            {library.length} film kütüphanenizde
          </p>
        </div>

        {/* Library Stats */}
        {library.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary-500">{library.length}</div>
              <div className="text-gray-400">Toplam Film</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-500">
                {(library.reduce((sum, item) => sum + item.movieRating, 0) / library.length).toFixed(1)}
              </div>
              <div className="text-gray-400">Ortalama Puan</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-500">
                {new Date(library[0]?.addedDate || '').toLocaleDateString('tr-TR')}
              </div>
              <div className="text-gray-400">Son Eklenen</div>
            </div>
          </div>
        )}

        {/* Movies Grid */}
        <MovieGrid
          movies={libraryMovies}
          loading={loading}
          error={error || undefined}
          isInLibrary={isInLibrary}
          onRemoveFromLibrary={handleRemoveFromLibrary}
          showLibraryActions={true}
        />

        {/* Empty State */}
        {!loading && library.length === 0 && (
          <div className="text-center py-12">
            <BookmarkIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Kütüphaneniz boş
            </h3>
            <p className="text-gray-500">
              Film eklemek için ana sayfaya gidin ve beğendiğiniz filmleri kütüphanenize ekleyin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage; 