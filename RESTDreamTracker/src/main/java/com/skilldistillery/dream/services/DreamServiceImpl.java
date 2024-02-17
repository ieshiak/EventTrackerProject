package com.skilldistillery.dream.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.dream.entities.Dream;
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
	public boolean delete(int id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Dream update(int id, Dream dream) {
		// TODO Auto-generated method stub
		return null;
	}

}
