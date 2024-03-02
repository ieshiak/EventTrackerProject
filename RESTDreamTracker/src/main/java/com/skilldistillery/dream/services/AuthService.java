package com.skilldistillery.dream.services;

import com.skilldistillery.dream.entities.User;

public interface AuthService {

	User register(User user);

	User getUserByUsername(String username);

}
