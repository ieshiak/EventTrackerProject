package com.skilldistillery.dream.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.dream.entities.Role;
import com.skilldistillery.dream.entities.User;
import com.skilldistillery.dream.entities.ZodiacSign;
import com.skilldistillery.dream.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RequestMapping("api")
@RestController
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping("users")
	public List<User> index() {
		return userService.index();
	}

	@GetMapping("users/{id}")
	public User findById(@PathVariable("id") int id, HttpServletRequest request, HttpServletResponse response) {
		User user = userService.findById(id);
		if (user == null) {
			response.setStatus(404);
		}
		return user;
	}

	@PostMapping("users")
	public User create(@RequestBody User user, HttpServletRequest request, HttpServletResponse response) {
		User newUser = userService.create(user);
		if (newUser == null) {
			response.setStatus(400);
			return null;
		} else {
			response.setStatus(201);
			response.setHeader("Location", request.getRequestURL().append("/").append(newUser.getId()).toString());
			return newUser;
		}
	}

	@PutMapping("users/{id}")
	public User update(@PathVariable("id") Integer id, @RequestBody User user, HttpServletResponse res) {
		user = userService.update(id, user);
		if (user == null) {
			res.setStatus(404);
		}
		return user;
	}

	@DeleteMapping("users/{id}")
	public void delete(@PathVariable("id") int id, HttpServletRequest request, HttpServletResponse response) {
		try {
			if (userService.delete(id)) {
				response.setStatus(204);
			} else {
				response.setStatus(404);
			}
		} catch (Exception e) {
			response.setStatus(400);
			e.printStackTrace();
		}
	}

	@GetMapping("users/search/zodiacsign/{zodiacSign}")
	public List<User> findUsersByZodiacSign(@PathVariable("zodiacSign") String zodiacSignString, HttpServletRequest request, HttpServletResponse response) {
		ZodiacSign zodiacSign = ZodiacSign.fromString(zodiacSignString);
		if (zodiacSign == null) {
			response.setStatus(404);
			throw new IllegalArgumentException("Invalid user zodiacSign: " + zodiacSignString);
		}
		return userService.findByZodiacSign(zodiacSign);
	}

	@GetMapping("users/search/role/{role}")
	public List<User> findUsersByRole(@PathVariable("role") String roleString, HttpServletRequest request, HttpServletResponse response) {
		Role role = Role.fromString(roleString);
		if (role == null) {
			response.setStatus(404);
			throw new IllegalArgumentException("Invalid user role: " + roleString);
		}
		return userService.findUsersByRole(role);
	}

	@GetMapping("users/search/{username}")
	public List<User> findByUsersUsername(@PathVariable("username") String username, HttpServletRequest request, HttpServletResponse response) {
		List<User> users = userService.findUsersByUsername(username);
		if (users == null) {
			response.setStatus(404);
		}
		return users;
	}

	@GetMapping("users/count")
	public long countUsers() {
		return userService.countUsers();
	}
}
