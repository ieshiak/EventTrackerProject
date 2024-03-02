package com.skilldistillery.dream.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skilldistillery.dream.entities.Role;
import com.skilldistillery.dream.entities.User;
import com.skilldistillery.dream.entities.ZodiacSign;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	User findById(int id);

	List<User> findByZodiacSign(ZodiacSign zodiacSign);

	List<User> findByRole(Role role);

	List<User> findByUsernameIgnoreCaseContaining(String username);

	long count();

	User findByUsernameAndPassword(String username, String password);

	User findByUsername(String username);

}
