package com.example.heymovies.Controller;

import com.example.heymovies.Model.Movie;
import com.example.heymovies.Service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {

    @Autowired
    private MovieService movieService;

    private final Logger logger = Logger.getLogger(MovieController.class.getName());

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieService.findAll();
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        Optional<Movie> movie = movieService.findById(id);
        return movie.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Movie> createMovie(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("genre") String genre,
            @RequestParam("releaseDate") String releaseDate,
            @RequestParam("imageFile") MultipartFile imageFile) {

        logger.info("Received request to create movie: " + title);
        try {
            // Validate and parse the releaseDate
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate localDate;
            try {
                localDate = LocalDate.parse(releaseDate, dateFormatter);  // Parse the release date
            } catch (DateTimeParseException e) {
                logger.severe("Invalid date format: " + releaseDate);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(null);  // Return 400 Bad Request if date is invalid
            }

            logger.info("Creating Movie object");
            Movie movie = new Movie();
            movie.setTitle(title);
            movie.setDescription(description);
            movie.setGenre(genre);
            movie.setReleaseDate(java.sql.Date.valueOf(localDate));  // Convert LocalDate to java.sql.Date

            logger.info("Saving image file");
            String imageUrl = movieService.saveImage(imageFile);
            movie.setImageUrl(imageUrl);

            logger.info("Saving movie to database");
            Movie savedMovie = movieService.saveMovie(movie);
            logger.info("Movie saved successfully with ID: " + savedMovie.getId());
            return ResponseEntity.ok(savedMovie);
        } catch (Exception e) {
            logger.severe("Error while saving the movie: " + e.getMessage());
            e.printStackTrace();  // This will print the full stack trace to your server logs
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
        return ResponseEntity.noContent().build();
    }

    // Serve the uploaded image
    @GetMapping("/uploads/{filename}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Path filePath = Paths.get("uploads").resolve(filename).normalize();
        Resource resource = new FileSystemResource(filePath.toFile());

        logger.info("Attempting to fetch file: " + filePath.toAbsolutePath());

        if (resource.exists() && resource.isReadable()) {
            logger.info("File found and is readable");
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(resource);
        } else {
            logger.warning("File not found or not readable: " + filePath.toAbsolutePath());
            return ResponseEntity.notFound().build();
        }
    }
}