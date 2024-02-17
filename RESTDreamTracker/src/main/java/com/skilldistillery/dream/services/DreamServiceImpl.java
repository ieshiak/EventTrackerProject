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
}
