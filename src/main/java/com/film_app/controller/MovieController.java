package com.film_app.controller;

import com.film_app.dto.MovieDto;
import com.film_app.service.TmdbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = {"http://localhost:3000", "https://film-app-delta.vercel.app", "https://film-qwi1jvwwu-oguzhanbilgi1-6614s-projects.vercel.app"})
public class MovieController {
    
    @Autowired
    private TmdbService tmdbService;
    
    @GetMapping("/popular")
    public ResponseEntity<List<MovieDto>> getPopularMovies(
            @RequestParam(defaultValue = "1") int page) {
        List<MovieDto> movies = tmdbService.getPopularMovies(page);
        return ResponseEntity.ok(movies);
    }
    
    @GetMapping("/top-rated")
    public ResponseEntity<List<MovieDto>> getTopRatedMovies(
            @RequestParam(defaultValue = "1") int page) {
        List<MovieDto> movies = tmdbService.getTopRatedMovies(page);
        return ResponseEntity.ok(movies);
    }
    
    @GetMapping("/now-playing")
    public ResponseEntity<List<MovieDto>> getNowPlayingMovies(
            @RequestParam(defaultValue = "1") int page) {
        List<MovieDto> movies = tmdbService.getNowPlayingMovies(page);
        return ResponseEntity.ok(movies);
    }
    
    @GetMapping("/upcoming")
    public ResponseEntity<List<MovieDto>> getUpcomingMovies(
            @RequestParam(defaultValue = "1") int page) {
        List<MovieDto> movies = tmdbService.getUpcomingMovies(page);
        return ResponseEntity.ok(movies);
    }
    
    @GetMapping("/{movieId}")
    public ResponseEntity<MovieDto> getMovieDetails(@PathVariable Long movieId) {
        MovieDto movie = tmdbService.getMovieDetails(movieId);
        return ResponseEntity.ok(movie);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<MovieDto>> searchMovies(
            @RequestParam String query,
            @RequestParam(defaultValue = "1") int page) {
        List<MovieDto> movies = tmdbService.searchMovies(query, page);
        return ResponseEntity.ok(movies);
    }
} 