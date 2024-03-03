package com.skilldistillery.dream.services;

import java.util.List;

import com.skilldistillery.dream.entities.Dream;

public interface DreamService {

	List<Dream> index();

	Dream findById(int id);

	Dream create(Dream newDream);
//
//	Dream update(int id, Dream dream);
//
//	boolean delete(int id);
//
//	List<Dream> findDreamsByEmotion(Emotion emotion);
//
//	List<Dream> findDreamsByType(Type type);
//
//	List<Dream> findDreamsByTitle(String title);
//
//	long countDreams();
//
//	List<Dream> findDreamsByUserId(int userId);

}
