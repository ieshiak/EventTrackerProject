package com.skilldistillery.dream.services;

import java.util.List;
import java.util.Optional;

import com.skilldistillery.dream.entities.Dream;

public interface DreamService {
	
	List<Dream> index();
	
	Dream findById(int id);
	
	Dream create(Dream newDream);
	
	boolean delete(int id);
	Dream update(int id, Dream dream);
}
