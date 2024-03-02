package com.skilldistillery.dream.services;

import java.util.List;

import com.skilldistillery.dream.entities.User;

public interface UserService {

	List<User> index();

	User findById(int id);

	User create(User newUser);

	User update(int id, User user);

	boolean delete(int id);

	//List<User> findByZodiacSign(ZodiacSign zodiacSign);

	//List<User> findUsersByRole(Role role);

	List<User> findUsersByUsername(String username);

	long countUsers();

	//User authenticateUser(String username, String password);

	//String getAvatarUrl(int id);




}
