package com.example.heymovies.Service;

import com.example.heymovies.Model.Slider;
import com.example.heymovies.Repository.SliderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SliderService {

    @Autowired
    private SliderRepository sliderRepository;

    private final String uploadDir = "/uploads/";  // External directory

    public List<Slider> getAllSliders() {
        return sliderRepository.findAll();
    }

    public Optional<Slider> getSliderById(Long id) {
        return sliderRepository.findById(id);
    }

    public Slider saveSlider(Slider slider) {
        return sliderRepository.save(slider);
    }

    public void deleteSlider(Long id) {
        sliderRepository.deleteById(id);
    }

    public String saveImage(MultipartFile imageFile) throws Exception {
        String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);

        // Log the file path for debugging
        System.out.println("Saving file to: " + filePath.toAbsolutePath());

        // Ensure directories exist and write the file
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, imageFile.getBytes());

        // Return the path to access the file
        return "/uploads/" + fileName;
    }
}