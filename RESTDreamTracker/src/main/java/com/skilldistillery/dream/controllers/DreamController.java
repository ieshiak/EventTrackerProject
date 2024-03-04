package com.skilldistillery.dream.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
import com.skilldistillery.dream.entities.ImgUrl;
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
	
	@GetMapping("dreams/emotions")
	public List<String> getEmotionOptions() {
	    List<String> emotionOptions = Arrays.stream(Emotion.values())
	                                        .map(Enum::toString)
	                                        .collect(Collectors.toList());
	    return emotionOptions;
	}

	@GetMapping("dreams/search/emotion/{emotion}")
	public List<Dream> findDreamsByEmotion(@PathVariable("emotion") String emotionString, HttpServletRequest request, HttpServletResponse response) {
	    return dreamService.findDreamsByEmotion(emotionString);
	}
	
	@GetMapping("dreams/types")
	public List<String> getTypeOptions() {
	    List<String> typeOptions = Arrays.stream(Type.values())
	                                     .map(Enum::toString)
	                                     .collect(Collectors.toList());
	    return typeOptions;
	}

	@GetMapping("dreams/search/type/{type}")
	public List<Dream> findDreamsByType(@PathVariable("type") String typeString, HttpServletRequest request, HttpServletResponse response) {
	    // No need for conversion, directly use the type string
	    return dreamService.findDreamsByType(typeString);
	}

	@GetMapping("dreams/search/title/{title}")
	public List<Dream> findByDreamsTitle(@PathVariable("title") String title, HttpServletRequest request, HttpServletResponse response) {
		List<Dream> dreams = dreamService.findDreamsByTitle(title);
		if (dreams == null) {
			response.setStatus(404);
		}
		return dreams;
	}
	
	@GetMapping("dreams/search/dreamer/{dreamer}")
	public List<Dream> findByDreamer(@PathVariable("dreamer") String dreamer, HttpServletRequest request, HttpServletResponse response) {
		List<Dream> dreams = dreamService.findDreamsByDreamer(dreamer);
		if (dreams == null) {
			response.setStatus(404);
		}
		return dreams;
	}

	@GetMapping("dreams/count")
	public long countDreams() {
		return dreamService.countDreams();
	}
	
	@GetMapping("images")
    public ResponseEntity<List<String>> getImageEnums() {
        List<String> enumValues = Arrays.stream(ImgUrl.values())
                                        .map(Enum::name)
                                        .collect(Collectors.toList());
        return ResponseEntity.ok().body(enumValues);
    }

	
	@GetMapping("images/{imageName}")
	public ResponseEntity<byte[]> getImage(@PathVariable("imageName") String imageName) {
	    try {
	        // Resolve enum value from imageName
	        ImgUrl imgUrl = ImgUrl.valueOf(imageName);

	        // Load the image from the resources directory
	        Resource resource = new ClassPathResource("static/images/" + imgUrl.getUrl());

	        // Read the image bytes
	        byte[] imageBytes = Files.readAllBytes(resource.getFile().toPath());

	        // Set the response headers
	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.IMAGE_PNG); // or MediaType.IMAGE_JPEG if needed

	        // Return the image bytes in the response
	        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
	    } catch (IOException | IllegalArgumentException e) {
	        // Handle file reading errors or invalid enum values
	        e.printStackTrace();
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}



}
