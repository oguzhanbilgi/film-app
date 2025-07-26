package com.film_app.repository;

import com.film_app.entity.UserLibrary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserLibraryRepository extends JpaRepository<UserLibrary, Long> {
    
    List<UserLibrary> findByUserId(Long userId);
    
    @Query("SELECT ul FROM UserLibrary ul WHERE ul.user.id = :userId ORDER BY ul.addedDate DESC")
    List<UserLibrary> findByUserIdOrderByAddedDateDesc(@Param("userId") Long userId);
    
    Optional<UserLibrary> findByUserIdAndTmdbMovieId(Long userId, Long tmdbMovieId);
    
    boolean existsByUserIdAndTmdbMovieId(Long userId, Long tmdbMovieId);
    
    @Query("SELECT COUNT(ul) FROM UserLibrary ul WHERE ul.user.id = :userId")
    Long countByUserId(@Param("userId") Long userId);
} 