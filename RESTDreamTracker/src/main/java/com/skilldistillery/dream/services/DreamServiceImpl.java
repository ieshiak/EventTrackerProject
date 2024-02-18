package com.skilldistillery.dream.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.dream.entities.Dream;
import com.skilldistillery.dream.entities.Emotion;
import com.skilldistillery.dream.entities.Type;
import com.skilldistillery.dream.repositories.DreamRepository;

@Service
public class DreamServiceImpl implements DreamService {
	@Autowired
	DreamRepository dreamRepo;

	@Override
	public List<Dream> index() {
		return dreamRepo.findAll();
	}

	@Override
	public Dream findById(int id) {
		return dreamRepo.findById(id);
	}

	@Override
	public Dream create(Dream newDream) {
		return dreamRepo.save(newDream);
	}

	@Override
	public Dream update(int id, Dream existingDream) {
		Dream dream = findById(id);
		dream.setTitle(existingDream.getTitle());
		dream.setDate(existingDream.getDate());
		dream.setTime(existingDream.getTime());
		dream.setDescription(existingDream.getDescription());
		dream.setEmotion(existingDream.getEmotion());
		dream.setType(existingDream.getType());
		return dreamRepo.save(dream);
	}

	@Override
	public boolean delete(int id) {
		Dream dream = dreamRepo.findById(id);
		if (dream != null) {
			dreamRepo.delete(dream);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public List<Dream> findDreamsByEmotion(Emotion emotion) {
		return dreamRepo.findByEmotion(emotion);
	}

	@Override
	public List<Dream> findDreamsByType(Type type) {
		return dreamRepo.findByType(type);
	}

	@Override
	public List<Dream> findDreamsByTitle(String title) {
		return dreamRepo.findByTitleIgnoreCaseContaining(title);
	}

	@Override
	public long countDreams() {
		return dreamRepo.count();
	}

}
