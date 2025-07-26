package com.film_app.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_libraries")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLibrary {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "tmdb_movie_id", nullable = false)
    private Long tmdbMovieId;
    
    @Column(name = "added_date", nullable = false)
    private LocalDateTime addedDate;
    
    @Column(name = "movie_title")
    private String movieTitle;
    
    @Column(name = "movie_poster_path")
    private String moviePosterPath;
    
    @Column(name = "movie_overview", columnDefinition = "TEXT")
    private String movieOverview;
    
    @Column(name = "movie_release_date")
    private String movieReleaseDate;
    
    @Column(name = "movie_rating")
    private Double movieRating;
    
    @PrePersist
    protected void onCreate() {
        addedDate = LocalDateTime.now();
    }
} 