package com.example.heymovies.Controller;

import com.example.heymovies.Model.User;
import com.example.heymovies.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            registeredUser.setPassword(null);  // Don't send password back to client
            return new ResponseEntity<>(registeredUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Registration failed: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        try {
            User loggedInUser = userService.loginUser(user.getUsername(), user.getPassword());
            if (loggedInUser != null) {
                loggedInUser.setPassword(null);  // Don't send the password back to the client
                return new ResponseEntity<>(loggedInUser, HttpStatus.OK);  // Return the user object
            } else {
                return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Login failed: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/logout")
    public String logout() {
        return "You have been logged out successfully";
    }

    @GetMapping("/user")
    public ResponseEntity<User> getUser(@RequestParam("username") String username) {
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(user);
    }
    @GetMapping("/user/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        try {
            User existingUser = userService.findByUsername(user.getUsername());

            if (existingUser == null) {
                return ResponseEntity.status(404).body("User not found");
            }

            if (user.getEmail() != null && !user.getEmail().isEmpty()) {
                existingUser.setEmail(user.getEmail());
            }

            if (user.getName() != null && !user.getName().isEmpty()) {
                existingUser.setName(user.getName());
            }

            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                existingUser.setPassword(userService.encodePassword(user.getPassword())); // Hash the new password
            }

            userService.saveUser(existingUser);

            return ResponseEntity.ok("User updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating user: " + e.getMessage());
        }
    }
}