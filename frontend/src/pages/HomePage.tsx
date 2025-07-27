import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import { movieApi } from '../services/api';
import MovieGrid from '../components/MovieGrid';
import GenreFilter from '../components/GenreFilter';
import { FilmIcon, StarIcon, PlayIcon, CalendarIcon, FunnelIcon } from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [popular, topRated, nowPlaying, upcoming] = await Promise.all([
          movieApi.getPopular(),
          movieApi.getTopRated(),
          movieApi.getNowPlaying(),
          movieApi.getUpcoming(),
        ]);

        setPopularMovies(popular.data);
        setTopRatedMovies(topRated.data);
        setNowPlayingMovies(nowPlaying.data);
        setUpcomingMovies(upcoming.data);
      } catch (err) {
        setError('Filmler yüklenirken hata oluştu');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Filter movies by genre
  useEffect(() => {
    if (selectedGenre) {
      const allMovies = [
        ...popularMovies,
        ...topRatedMovies,
        ...nowPlayingMovies,
        ...upcomingMovies
      ];
      
      const filtered = allMovies.filter(movie => 
        movie.genres && movie.genres.some(genre => 
          typeof genre === 'string' ? 
            genre.toLowerCase().includes(getGenreName(selectedGenre).toLowerCase()) :
            genre === selectedGenre
        )
      );
      
      // Remove duplicates
      const uniqueMovies = filtered.filter((movie, index, self) => 
        index === self.findIndex(m => m.id === movie.id)
      );
      
      setFilteredMovies(uniqueMovies);
    } else {
      setFilteredMovies([]);
    }
  }, [selectedGenre, popularMovies, topRatedMovies, nowPlayingMovies, upcomingMovies]);

  const getGenreName = (genreId: number): string => {
    const genreMap: { [key: number]: string } = {
      28: 'Aksiyon', 12: 'Macera', 16: 'Animasyon', 35: 'Komedi', 80: 'Suç',
      99: 'Belgesel', 18: 'Drama', 10751: 'Aile', 14: 'Fantastik', 36: 'Tarih',
      27: 'Korku', 10402: 'Müzik', 9648: 'Gizem', 10749: 'Romantik', 878: 'Bilim Kurgu',
      10770: 'TV Film', 53: 'Gerilim', 10752: 'Savaş', 37: 'Vahşi Batı'
    };
    return genreMap[genreId] || 'Bilinmeyen';
  };

  const sections = [
    {
      title: 'Popüler Filmler',
      movies: popularMovies,
      icon: FilmIcon,
      color: 'text-blue-400',
    },
    {
      title: 'En Çok Oy Alan Filmler',
      movies: topRatedMovies,
      icon: StarIcon,
      color: 'text-yellow-400',
    },
    {
      title: 'Şu Anda Vizyonda',
      movies: nowPlayingMovies,
      icon: PlayIcon,
      color: 'text-green-400',
    },
    {
      title: 'Yakında Gelecek',
      movies: upcomingMovies,
      icon: CalendarIcon,
      color: 'text-purple-400',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Filmler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
              Film Kütüphanesi
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              En sevdiğiniz filmleri keşfedin, kişisel kütüphanenizi oluşturun ve yeni favorilerinizi bulun
            </p>
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <FunnelIcon className="w-5 h-5" />
              <span>Film Türleri</span>
            </button>
          </div>
        </div>
      </div>

      {/* Genre Filters */}
      {showFilters && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <GenreFilter
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />
        </div>
      )}

      {/* Filtered Movies */}
      {selectedGenre && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 mb-6">
            <FunnelIcon className="w-6 h-6 text-primary-400" />
            <h2 className="text-2xl font-bold text-white">
              {getGenreName(selectedGenre)} Filmleri
            </h2>
            <span className="text-gray-400">({filteredMovies.length} film)</span>
          </div>
          {filteredMovies.length > 0 ? (
            <MovieGrid
              movies={filteredMovies}
              showLibraryActions={true}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Bu türde film bulunamadı.</p>
            </div>
          )}
        </div>
      )}

      {/* Movie Sections */}
      {!selectedGenre && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-2 rounded-lg bg-gray-800/50 ${section.color.replace('text-', 'bg-')} bg-opacity-20`}>
                    <Icon className={`w-6 h-6 ${section.color}`} />
                  </div>
                  <h2 className="text-3xl font-bold text-white">{section.title}</h2>
                </div>
                <MovieGrid
                  movies={section.movies.slice(0, 10)}
                  showLibraryActions={true}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage; 