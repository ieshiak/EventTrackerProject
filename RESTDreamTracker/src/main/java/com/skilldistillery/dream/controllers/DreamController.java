package com.skilldistillery.dream.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.dream.entities.Dream;
import com.skilldistillery.dream.services.DreamService;

@RequestMapping("api")
@RestController
public class DreamController {
	@Autowired
	private DreamService dreamService;

	@GetMapping("dreams")
	public List<Dream> index() {
		return dreamService.index();
	}
}
