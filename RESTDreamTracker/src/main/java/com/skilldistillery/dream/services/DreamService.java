package com.skilldistillery.dream.services;

import java.util.List;

import com.skilldistillery.dream.entities.Dream;
import com.skilldistillery.dream.entities.Emotion;
import com.skilldistillery.dream.entities.Type;

public interface DreamService {

	List<Dream> index();

	Dream findById(int id);

	Dream create(Dream newDream);

	Dream update(int id, Dream dream);

	boolean delete(int id);

	List<Dream> findDreamsByEmotion(Emotion emotion);

	List<Dream> findDreamsByType(Type type);

	List<Dream> findDreamsByTitle(String title);

	long countDreams();

}
