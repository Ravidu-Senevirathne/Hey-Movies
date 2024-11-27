package com.example.heymovies.Service;

import com.example.heymovies.Model.User;
import com.example.heymovies.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public User registerUser(User user) throws Exception {
        // Check if username already exists
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new Exception("Username already exists");
        }
        // Encode password before saving
        user.setPassword(encodePassword(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User loginUser(String username, String password) throws Exception {
        User user = userRepository.findByUsername(username);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        } else {
            throw new Exception("Invalid credentials");
        }
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }
    @Override
    public User updateUser(User user) {
        User existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser == null) {
            throw new RuntimeException("User not found");
        }

        if (user.getEmail() != null) {
            existingUser.setEmail(user.getEmail());
        }

        if (user.getName() != null) {
            existingUser.setName(user.getName());
        }

        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existingUser.setPassword(encodePassword(user.getPassword())); // Hash the new password
        }

        return userRepository.save(existingUser);
    }
}
