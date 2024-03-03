package com.skilldistillery.dream.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skilldistillery.dream.entities.Dream;
import com.skilldistillery.dream.entities.Emotion;
import com.skilldistillery.dream.entities.Type;

@Repository
public interface DreamRepository extends JpaRepository<Dream, Integer> {

	Dream findById(int id);

	List<Dream> findByEmotion(Emotion emotion);

	List<Dream> findByType(Type type);

	List<Dream> findByTitleIgnoreCaseContaining(String title);

	List<Dream> findByDreamer(String dreamer);
}
