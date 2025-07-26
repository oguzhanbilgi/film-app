import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FilmIcon, MagnifyingGlassIcon, BookmarkIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Ana Sayfa', icon: FilmIcon },
    { path: '/popular', label: 'Popüler', icon: FilmIcon },
    { path: '/top-rated', label: 'En İyiler', icon: FilmIcon },
    { path: '/now-playing', label: 'Vizyonda', icon: FilmIcon },
    { path: '/upcoming', label: 'Yakında', icon: FilmIcon },
    { path: '/library', label: 'Kütüphanem', icon: BookmarkIcon },
    { path: '/search', label: 'Ara', icon: MagnifyingGlassIcon },
  ];

  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FilmIcon className="w-8 h-8 text-primary-500" />
            <span className="text-xl font-bold text-white">Film Kütüphanesi</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 