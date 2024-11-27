package com.example.heymovies.Service;

import com.example.heymovies.Model.Movie;
import com.example.heymovies.Repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Logger;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    private final String uploadDir = "/uploads/";  // External directory
    private final Logger logger = Logger.getLogger(MovieService.class.getName());

    public MovieService() throws IOException {
        // Ensure the uploads folder exists
        Files.createDirectories(Paths.get(uploadDir));
    }

    public String saveImage(MultipartFile imageFile) throws Exception {
        logger.info("Saving image file: " + imageFile.getOriginalFilename());
        String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);

        logger.info("Saving file to: " + filePath.toAbsolutePath());

        try {
            // Ensure directories exist and write the file
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, imageFile.getBytes());
            logger.info("File saved successfully");

            // Return the path to access the file
            return "/uploads/" + fileName;
        } catch (IOException e) {
            logger.severe("Error saving file: " + e.getMessage());
            throw new Exception("Could not save image file", e);
        }
    }
    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public Optional<Movie> findById(Long id) {
        return movieRepository.findById(id);
    }

    public List<Movie> findAll() {
        return movieRepository.findAll();
    }

    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }
}