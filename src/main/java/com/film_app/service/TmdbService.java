package com.film_app.service;

import com.film_app.dto.MovieDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;

@Service
public class TmdbService {
    
    @Value("${tmdb.api.key}")
    private String apiKey;
    
    @Value("${tmdb.api.base-url}")
    private String baseUrl;
    
    @Value("${tmdb.api.image-base-url}")
    private String imageBaseUrl;
    
    private final RestTemplate restTemplate = new RestTemplate();
    
    public List<MovieDto> getPopularMovies(int page) {
        String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/movie/popular")
                .queryParam("api_key", apiKey)
                .queryParam("page", page)
                .queryParam("language", "tr-TR")
                .toUriString();
        
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
        
        return results.stream()
                .map(this::mapToMovieDto)
                .toList();
    }
    
    public List<MovieDto> getTopRatedMovies(int page) {
        String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/movie/top_rated")
                .queryParam("api_key", apiKey)
                .queryParam("page", page)
                .queryParam("language", "tr-TR")
                .toUriString();
        
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
        
        return results.stream()
                .map(this::mapToMovieDto)
                .toList();
    }
    
    public List<MovieDto> getNowPlayingMovies(int page) {
        String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/movie/now_playing")
                .queryParam("api_key", apiKey)
                .queryParam("page", page)
                .queryParam("language", "tr-TR")
                .toUriString();
        
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
        
        return results.stream()
                .map(this::mapToMovieDto)
                .toList();
    }
    
    public List<MovieDto> getUpcomingMovies(int page) {
        String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/movie/upcoming")
                .queryParam("api_key", apiKey)
                .queryParam("page", page)
                .queryParam("language", "tr-TR")
                .toUriString();
        
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
        
        return results.stream()
                .map(this::mapToMovieDto)
                .toList();
    }
    
    public MovieDto getMovieDetails(Long movieId) {
        String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/movie/" + movieId)
                .queryParam("api_key", apiKey)
                .queryParam("language", "tr-TR")
                .toUriString();
        
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        return mapToMovieDto(response);
    }
    
    public List<MovieDto> searchMovies(String query, int page) {
        String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/search/movie")
                .queryParam("api_key", apiKey)
                .queryParam("query", query)
                .queryParam("page", page)
                .queryParam("language", "tr-TR")
                .toUriString();
        
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
        
        return results.stream()
                .map(this::mapToMovieDto)
                .toList();
    }
    
    private MovieDto mapToMovieDto(Map<String, Object> movieData) {
        MovieDto movieDto = new MovieDto();
        movieDto.setId(((Number) movieData.get("id")).longValue());
        movieDto.setTitle((String) movieData.get("title"));
        movieDto.setOverview((String) movieData.get("overview"));
        movieDto.setPosterPath(movieData.get("poster_path") != null ? 
                imageBaseUrl + movieData.get("poster_path") : null);
        movieDto.setReleaseDate((String) movieData.get("release_date"));
        movieDto.setVoteAverage(movieData.get("vote_average") != null ? 
                ((Number) movieData.get("vote_average")).doubleValue() : null);
        movieDto.setVoteCount(movieData.get("vote_count") != null ? 
                ((Number) movieData.get("vote_count")).intValue() : null);
        movieDto.setBackdropPath(movieData.get("backdrop_path") != null ? 
                imageBaseUrl + movieData.get("backdrop_path") : null);
        movieDto.setOriginalLanguage((String) movieData.get("original_language"));
        movieDto.setOriginalTitle((String) movieData.get("original_title"));
        movieDto.setAdult((Boolean) movieData.get("adult"));
        movieDto.setPopularity(movieData.get("popularity") != null ? 
                ((Number) movieData.get("popularity")).doubleValue() : null);
        
        return movieDto;
    }
} 