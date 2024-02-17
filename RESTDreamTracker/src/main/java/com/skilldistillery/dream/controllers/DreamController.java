package com.skilldistillery.dream.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.dream.entities.Dream;
import com.skilldistillery.dream.repositories.DreamRepository;
import com.skilldistillery.dream.services.DreamService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RequestMapping("api")
@RestController
public class DreamController {
	@Autowired
	private DreamService dreamService;
	
	@Autowired
	private DreamRepository  dreamRepo;

	@GetMapping("dreams")
	public List<Dream> index() {
		return dreamService.index();
	}
	
	@GetMapping("dreams/{id}")
	public Dream findDreamById(@PathVariable("id") int id, HttpServletRequest request, HttpServletResponse response) {
		Dream dream = dreamService.findById(id);
		if (dream == null) {
			response.setStatus(404);
		}
		return dream;
	}
	
	@PostMapping("dreams")
	public Dream create(@RequestBody Dream dream, HttpServletRequest request, HttpServletResponse response) {
		Dream newDream = dreamService.create(dream);
		if (newDream == null) {
			response.setStatus(409);
			return null;
		} else {
			response.setStatus(201);
			response.setHeader("Location", request.getRequestURL().append("/").append(newDream.getId()).toString());
			return newDream;
		}
	}

}
