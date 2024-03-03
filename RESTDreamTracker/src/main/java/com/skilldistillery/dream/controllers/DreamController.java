package com.skilldistillery.dream.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.dream.entities.Dream;
import com.skilldistillery.dream.entities.Emotion;
import com.skilldistillery.dream.entities.Type;
import com.skilldistillery.dream.services.DreamService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin({"*", "http://localhost/"})
@RequestMapping("api")
@RestController
public class DreamController {
	@Autowired
	private DreamService dreamService;

	@GetMapping("dreams")
	public List<Dream> index() {
		return dreamService.index();
	}

	@GetMapping("dreams/{id}")
	public Dream findById(@PathVariable("id") int id, HttpServletRequest request, HttpServletResponse response) {
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
			response.setStatus(400);
			return null;
		} else {
			response.setStatus(201);
			response.setHeader("Location", request.getRequestURL().append("/").append(newDream.getId()).toString());
			return newDream;
		}
	}

	@PutMapping("dreams/{id}")
	public Dream update(@PathVariable("id") Integer id, @RequestBody Dream dream, HttpServletResponse res) {
		dream = dreamService.update(id, dream);
		if (dream == null) {
			res.setStatus(404);
		}
		return dream;
	}

	@DeleteMapping("dreams/{id}")
	public void delete(@PathVariable("id") int id, HttpServletRequest request, HttpServletResponse response) {
		try {
			if (dreamService.delete(id)) {
				response.setStatus(204);
			} else {
				response.setStatus(404);
			}
		} catch (Exception e) {
			response.setStatus(400);
			e.printStackTrace();
		}
	}

	@GetMapping("dreams/search/emotion/{emotion}")
	public List<Dream> findDreamsByEmotion(@PathVariable("emotion") String emotionString, HttpServletRequest request, HttpServletResponse response) {
		Emotion emotion = Emotion.fromString(emotionString);
		if (emotion == null) {
			response.setStatus(404);
			throw new IllegalArgumentException("Invalid dream emotion: " + emotionString);
		}
		return dreamService.findDreamsByEmotion(emotion);
	}

	@GetMapping("dreams/search/type/{type}")
	public List<Dream> findDreamsByType(@PathVariable("type") String typeString, HttpServletRequest request, HttpServletResponse response) {
		Type type = Type.fromString(typeString);
		if (type == null) {
			response.setStatus(404);
			throw new IllegalArgumentException("Invalid dream type: " + typeString);
		}
		return dreamService.findDreamsByType(type);
	}

	@GetMapping("dreams/search/{title}")
	public List<Dream> findByDreamsTitle(@PathVariable("title") String title, HttpServletRequest request, HttpServletResponse response) {
		List<Dream> dreams = dreamService.findDreamsByTitle(title);
		if (dreams == null) {
			response.setStatus(404);
		}
		return dreams;
	}

	@GetMapping("dreams/count")
	public long countDreams() {
		return dreamService.countDreams();
	}
	
	@GetMapping("users/{userid}/dreams")
	public List<Dream> getDreamsByUser(@PathVariable("userid") int userId, HttpServletRequest request, HttpServletResponse response) {
		List<Dream> userDreams = dreamService.findDreamsByUserId(userId);
		if (userDreams == null) {
			response.setStatus(404);
		}
		return userDreams;
	}
}
