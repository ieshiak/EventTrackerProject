package com.skilldistillery.dream.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skilldistillery.dream.entities.Dream;

@Repository
public interface DreamRepository extends JpaRepository<Dream, Integer> {
	
}
