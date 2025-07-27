package com.film_app.controller;

import com.film_app.dto.UserLibraryDto;
import com.film_app.service.UserLibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-library")
@CrossOrigin(origins = {"http://localhost:3000", "https://film-app-delta.vercel.app", "https://film-qwi1jvwwu-oguzhanbilgi1-6614s-projects.vercel.app"})
public class UserLibraryController {
    
    @Autowired
    private UserLibraryService userLibraryService;
    
    @GetMapping("/{userId}")
    public ResponseEntity<List<UserLibraryDto>> getUserLibrary(@PathVariable Long userId) {
        List<UserLibraryDto> userLibrary = userLibraryService.getUserLibrary(userId);
        return ResponseEntity.ok(userLibrary);
    }
    
    @PostMapping("/{userId}/movies/{tmdbMovieId}")
    public ResponseEntity<UserLibraryDto> addMovieToLibrary(
            @PathVariable Long userId,
            @PathVariable Long tmdbMovieId) {
        UserLibraryDto addedMovie = userLibraryService.addMovieToLibrary(userId, tmdbMovieId);
        return ResponseEntity.ok(addedMovie);
    }
    
    @DeleteMapping("/{userId}/movies/{tmdbMovieId}")
    public ResponseEntity<Void> removeMovieFromLibrary(
            @PathVariable Long userId,
            @PathVariable Long tmdbMovieId) {
        userLibraryService.removeMovieFromLibrary(userId, tmdbMovieId);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/{userId}/movies/{tmdbMovieId}/check")
    public ResponseEntity<Boolean> isMovieInLibrary(
            @PathVariable Long userId,
            @PathVariable Long tmdbMovieId) {
        boolean isInLibrary = userLibraryService.isMovieInLibrary(userId, tmdbMovieId);
        return ResponseEntity.ok(isInLibrary);
    }
    
    @GetMapping("/{userId}/count")
    public ResponseEntity<Long> getUserLibraryCount(@PathVariable Long userId) {
        Long count = userLibraryService.getUserLibraryCount(userId);
        return ResponseEntity.ok(count);
    }
} 