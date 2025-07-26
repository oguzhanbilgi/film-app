import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Movie } from '../types';
import { movieApi } from '../services/api';
import MovieGrid from '../components/MovieGrid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await movieApi.search(query);
      setMovies(response.data);
    } catch (err) {
      setError('Arama sırasında hata oluştu');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      handleSearch(query);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <div className="mb-8">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Film adı ara..."
                className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary"
              >
                Ara
              </button>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              "{searchTerm}" için arama sonuçları
            </h2>
            <p className="text-gray-400">
              {movies.length} film bulundu
            </p>
          </div>
        )}

        {/* Movies Grid */}
        <MovieGrid
          movies={movies}
          loading={loading}
          error={error || undefined}
          showLibraryActions={true}
        />
      </div>
    </div>
  );
};

export default SearchPage; 