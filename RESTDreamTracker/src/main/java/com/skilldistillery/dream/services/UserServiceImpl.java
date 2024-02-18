package com.skilldistillery.dream.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.dream.entities.Role;
import com.skilldistillery.dream.entities.User;
import com.skilldistillery.dream.entities.ZodiacSign;
import com.skilldistillery.dream.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepo;

	@Override
	public List<User> index() {
		return userRepo.findAll();
	}

	@Override
	public User findById(int id) {
		return userRepo.findById(id);
	}

	@Override
	public User create(User newUser) {
		return userRepo.save(newUser);
	}

	@Override
	public User update(int id, User existingUser) {
		User user = findById(id);
		user.setUsername(existingUser.getUsername());
		user.setPassword(existingUser.getPassword());
		user.setFirstName(existingUser.getFirstName());
		user.setLastName(existingUser.getLastName());
		user.setBirthday(existingUser.getBirthday());
		user.setEmail(existingUser.getEmail());
		user.setAvatarURL(existingUser.getAvatarURL());
		user.setZodiacSign(existingUser.getZodiacSign());
		user.setRole(existingUser.getRole());
		return userRepo.save(user);
	}

	@Override
	public boolean delete(int id) {
		User user = userRepo.findById(id);
		if (user != null) {
			userRepo.delete(user);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public List<User> findByZodiacSign(ZodiacSign zodiacSign) {
		return userRepo.findByZodiacSign(zodiacSign);
	}

	@Override
	public List<User> findUsersByRole(Role role) {
		return userRepo.findByRole(role);
	}

	@Override
	public List<User> findUsersByUsername(String username) {
		return userRepo.findByUsernameIgnoreCaseContaining(username);
	}

	@Override
	public long countUsers() {
		return userRepo.count();
	}

}
