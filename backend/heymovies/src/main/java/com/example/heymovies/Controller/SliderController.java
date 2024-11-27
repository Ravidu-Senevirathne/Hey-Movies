package com.example.heymovies.Controller;

import com.example.heymovies.Model.Slider;
import com.example.heymovies.Service.SliderService;
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
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/sliders")
@CrossOrigin(origins = "http://localhost:3000")
public class SliderController {

    @Autowired
    private SliderService sliderService;

    private final Logger logger = Logger.getLogger(SliderController.class.getName());

    @GetMapping
    public List<Slider> getAllSliders() {
        return sliderService.getAllSliders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Slider> getSliderById(@PathVariable Long id) {
        Optional<Slider> slider = sliderService.getSliderById(id);
        return slider.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Slider> createSlider(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("imageFile") MultipartFile imageFile) {

        try {
            Slider slider = new Slider();
            slider.setTitle(title);
            slider.setDescription(description);

            // Save the image and get the URL
            String imageUrl = sliderService.saveImage(imageFile);
            slider.setImageUrl(imageUrl);

            // Save the slider in the database
            Slider savedSlider = sliderService.saveSlider(slider);
            return ResponseEntity.ok(savedSlider);
        } catch (Exception e) {
            logger.severe("Error while saving the slider: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSlider(@PathVariable Long id,
                                          @RequestPart("title") String title,
                                          @RequestPart("description") String description,
                                          @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {

        return ResponseEntity.ok().body("Slider updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlider(@PathVariable Long id) {
        if (!sliderService.getSliderById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        sliderService.deleteSlider(id);
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