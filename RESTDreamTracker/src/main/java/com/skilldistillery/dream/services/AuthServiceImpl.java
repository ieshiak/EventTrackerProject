package com.skilldistillery.dream.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.dream.entities.User;
import com.skilldistillery.dream.repositories.UserRepository;

@Service
public class AuthServiceImpl implements AuthService {
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public User register(User user) {
		String encrypted = encoder.encode(user.getPassword());
		user.setPassword(encrypted);
		user.setEnabled(true);
		user.setRole("user");
		userRepo.saveAndFlush(user); // <==== Save to DB!
		return user; // <==== Return user
	}

	@Override
	public User getUserByUsername(String username) {
		return userRepo. findByUsername(username) ;
	}
}