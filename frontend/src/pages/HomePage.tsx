import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import { movieApi } from '../services/api';
import MovieGrid from '../components/MovieGrid';
import { FilmIcon, StarIcon, PlayIcon, CalendarIcon } from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-xl mb-2">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Film Kütüphanesi
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              En sevdiğiniz filmleri keşfedin ve kişisel kütüphanenizi oluşturun
            </p>
          </div>
        </div>
      </div>

      {/* Movie Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={index} className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Icon className={`w-6 h-6 ${section.color}`} />
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              <MovieGrid
                movies={section.movies.slice(0, 10)}
                showLibraryActions={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage; 