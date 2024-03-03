package com.skilldistillery.dream.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skilldistillery.dream.entities.Dream;

@Repository
public interface DreamRepository extends JpaRepository<Dream, Integer> {

	Dream findById(int id);

//	List<Dream> findByEmotion(Emotion emotion);
//
//	List<Dream> findByType(Type type);
//
//	List<Dream> findByTitleIgnoreCaseContaining(String title);
//
//	long count();
//	
//	List<Dream> findByUserId(int userId);


}
