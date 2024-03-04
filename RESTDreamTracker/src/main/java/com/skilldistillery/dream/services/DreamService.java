package com.skilldistillery.dream.services;

import java.util.List;

import com.skilldistillery.dream.entities.Dream;

public interface DreamService {

	List<Dream> index();

	Dream findById(int id);

	Dream create(Dream newDream);

	Dream update(int id, Dream dream);

	boolean delete(int id);

	List<Dream> findDreamsByEmotion(String emotion);

	List<Dream> findDreamsByType(String type);

	List<Dream> findDreamsByTitle(String title);
	
	List<Dream> findDreamsByDreamer(String dreamer);

	long countDreams();


}
