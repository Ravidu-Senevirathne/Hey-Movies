package com.example.heymovies.Service;

import com.example.heymovies.Model.User;

public interface UserService {
    User registerUser(User user) throws Exception;
    User loginUser(String username, String password) throws Exception;
    User findByUsername(String username);
    User saveUser(User user);
    String encodePassword(String password);

    User updateUser(User user);
}
