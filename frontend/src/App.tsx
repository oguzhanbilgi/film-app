import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import LibraryPage from './pages/LibraryPage';
import { userLibraryApi } from './services/api';

// Context for library state
interface LibraryContextType {
  libraryMovieIds: Set<number>;
  addToLibrary: (movieId: number) => Promise<void>;
  removeFromLibrary: (movieId: number) => Promise<void>;
  isInLibrary: (movieId: number) => boolean;
  selectedUserId: number;
  setSelectedUserId: (userId: number) => void;
}

export const LibraryContext = React.createContext<LibraryContextType | null>(null);

const App: React.FC = () => {
  const [libraryMovieIds, setLibraryMovieIds] = useState<Set<number>>(new Set());
  const [selectedUserId, setSelectedUserId] = useState<number>(1);

  // Fetch library on mount and when user changes
  useEffect(() => {
    fetchLibrary();
  }, [selectedUserId]);

  const fetchLibrary = async () => {
    try {
      const response = await userLibraryApi.getUserLibrary(selectedUserId);
      const movieIds = new Set(response.data.map(item => item.tmdbMovieId));
      setLibraryMovieIds(movieIds);
    } catch (error) {
      console.error('Error fetching library:', error);
    }
  };

  const addToLibrary = async (movieId: number) => {
    try {
      await userLibraryApi.addMovieToLibrary(selectedUserId, movieId);
      setLibraryMovieIds(prev => {
        const newSet = new Set(Array.from(prev));
        newSet.add(movieId);
        return newSet;
      });
    } catch (error) {
      console.error('Error adding to library:', error);
    }
  };

  const removeFromLibrary = async (movieId: number) => {
    try {
      await userLibraryApi.removeMovieFromLibrary(selectedUserId, movieId);
      setLibraryMovieIds(prev => {
        const newSet = new Set(Array.from(prev));
        newSet.delete(movieId);
        return newSet;
      });
    } catch (error) {
      console.error('Error removing from library:', error);
    }
  };

  const isInLibrary = (movieId: number) => {
    return libraryMovieIds.has(movieId);
  };

  const contextValue: LibraryContextType = {
    libraryMovieIds,
    addToLibrary,
    removeFromLibrary,
    isInLibrary,
    selectedUserId,
    setSelectedUserId,
  };

  return (
    <LibraryContext.Provider value={contextValue}>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/popular" element={<HomePage />} />
              <Route path="/top-rated" element={<HomePage />} />
              <Route path="/now-playing" element={<HomePage />} />
              <Route path="/upcoming" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/library" element={<LibraryPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </LibraryContext.Provider>
  );
};

export default App;
