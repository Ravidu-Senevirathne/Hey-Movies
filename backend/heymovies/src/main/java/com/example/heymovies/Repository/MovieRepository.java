package com.example.heymovies.Repository;

import com.example.heymovies.Model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    @Query("SELECT m FROM Movie m WHERE LOWER(m.title) LIKE LOWER(CONCAT('%', :searchText, '%'))")
    List<Movie> searchMoviesByTitle(@Param("searchText") String searchText);

    // Method for case-insensitive search by movie title
    List<Movie> findByTitleContainingIgnoreCase(String title);
}