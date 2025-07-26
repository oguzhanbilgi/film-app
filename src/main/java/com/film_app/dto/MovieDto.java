package com.film_app.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDto {
    private Long id;
    private String title;
    private String overview;
    private String posterPath;
    private String releaseDate;
    private Double voteAverage;
    private Integer voteCount;
    private String backdropPath;
    private List<String> genres;
    private String originalLanguage;
    private String originalTitle;
    private Boolean adult;
    private String status;
    private Integer runtime;
    private String tagline;
    private String homepage;
    private Double popularity;
    private String imdbId;
    private String budget;
    private String revenue;
} 