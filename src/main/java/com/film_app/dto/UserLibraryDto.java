package com.film_app.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLibraryDto {
    private Long id;
    private Long userId;
    private Long tmdbMovieId;
    private LocalDateTime addedDate;
    private String movieTitle;
    private String moviePosterPath;
    private String movieOverview;
    private String movieReleaseDate;
    private Double movieRating;
} 