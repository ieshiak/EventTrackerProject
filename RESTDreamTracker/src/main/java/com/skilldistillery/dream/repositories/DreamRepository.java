package com.skilldistillery.dream.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skilldistillery.dream.entities.Dream;

@Repository
public interface DreamRepository extends JpaRepository<Dream, Integer> {

	Dream findById(int id);

	List<Dream> findByEmotion(String emotion);

	List<Dream> findByType(String type);

	List<Dream> findByTitleIgnoreCaseContaining(String title);

	List<Dream> findByDreamer(String dreamer);
}
