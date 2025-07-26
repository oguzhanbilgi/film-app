package com.film_app.service;

import com.film_app.dto.MovieDto;
import com.film_app.dto.UserLibraryDto;
import com.film_app.entity.User;
import com.film_app.entity.UserLibrary;
import com.film_app.repository.UserLibraryRepository;
import com.film_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserLibraryService {
    
    @Autowired
    private UserLibraryRepository userLibraryRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TmdbService tmdbService;
    
    public List<UserLibraryDto> getUserLibrary(Long userId) {
        List<UserLibrary> userLibraries = userLibraryRepository.findByUserIdOrderByAddedDateDesc(userId);
        return userLibraries.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    
    public UserLibraryDto addMovieToLibrary(Long userId, Long tmdbMovieId) {
        // Check if user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Check if movie already exists in user's library
        if (userLibraryRepository.existsByUserIdAndTmdbMovieId(userId, tmdbMovieId)) {
            throw new RuntimeException("Movie already exists in user's library");
        }
        
        // Get movie details from TMDB
        MovieDto movieDto = tmdbService.getMovieDetails(tmdbMovieId);
        
        // Create new UserLibrary entry
        UserLibrary userLibrary = new UserLibrary();
        userLibrary.setUser(user);
        userLibrary.setTmdbMovieId(tmdbMovieId);
        userLibrary.setMovieTitle(movieDto.getTitle());
        userLibrary.setMoviePosterPath(movieDto.getPosterPath());
        userLibrary.setMovieOverview(movieDto.getOverview());
        userLibrary.setMovieReleaseDate(movieDto.getReleaseDate());
        userLibrary.setMovieRating(movieDto.getVoteAverage());
        
        UserLibrary savedLibrary = userLibraryRepository.save(userLibrary);
        return mapToDto(savedLibrary);
    }
    
    public void removeMovieFromLibrary(Long userId, Long tmdbMovieId) {
        UserLibrary userLibrary = userLibraryRepository.findByUserIdAndTmdbMovieId(userId, tmdbMovieId)
                .orElseThrow(() -> new RuntimeException("Movie not found in user's library"));
        
        userLibraryRepository.delete(userLibrary);
    }
    
    public boolean isMovieInLibrary(Long userId, Long tmdbMovieId) {
        return userLibraryRepository.existsByUserIdAndTmdbMovieId(userId, tmdbMovieId);
    }
    
    public Long getUserLibraryCount(Long userId) {
        return userLibraryRepository.countByUserId(userId);
    }
    
    private UserLibraryDto mapToDto(UserLibrary userLibrary) {
        UserLibraryDto dto = new UserLibraryDto();
        dto.setId(userLibrary.getId());
        dto.setUserId(userLibrary.getUser().getId());
        dto.setTmdbMovieId(userLibrary.getTmdbMovieId());
        dto.setAddedDate(userLibrary.getAddedDate());
        dto.setMovieTitle(userLibrary.getMovieTitle());
        dto.setMoviePosterPath(userLibrary.getMoviePosterPath());
        dto.setMovieOverview(userLibrary.getMovieOverview());
        dto.setMovieReleaseDate(userLibrary.getMovieReleaseDate());
        dto.setMovieRating(userLibrary.getMovieRating());
        return dto;
    }
} 