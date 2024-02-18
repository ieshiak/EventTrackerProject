package com.skilldistillery.dream.controllers;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skilldistillery.dream.entities.Dream;
import com.skilldistillery.dream.entities.Emotion;
import com.skilldistillery.dream.entities.Type;
import com.skilldistillery.dream.services.DreamService;

@ExtendWith(MockitoExtension.class)
class DreamControllerTest {

	private MockMvc mockMvc;

	@Mock
	private DreamService dreamService;

	@InjectMocks
	private DreamController dreamController;

	@BeforeEach
	void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(dreamController).build();
	}

	@Test
	void testFindDreamsByEmotion() throws Exception {
		List<Dream> dreams = new ArrayList<>();
		dreams.add(new Dream());
		when(dreamService.findDreamsByEmotion(Emotion.Joy)).thenReturn(dreams);
		mockMvc.perform(get("/api/dreams/search/emotion/Joy")).andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(1)));
	}

	@Test
	void testCreate() throws Exception {
		Dream dream = new Dream();
		dream.setTitle("My Dream Title");
		dream.setDescription("My Dream Description");
		dream.setType(Type.EpicDream);
		dream.setEmotion(Emotion.Joy);

		ObjectMapper objectMapper = new ObjectMapper();
		String json = objectMapper.writeValueAsString(dream);

		when(dreamService.create(any(Dream.class))).thenReturn(dream);

		mockMvc.perform(post("/api/dreams").contentType(MediaType.APPLICATION_JSON).content(json))
				.andExpect(status().isCreated()).andExpect(jsonPath("$.id").exists())
				.andExpect(jsonPath("$.title").value("My Dream Title"))
				.andExpect(jsonPath("$.description").value("My Dream Description"))
				.andExpect(jsonPath("$.type").value("EpicDream")).andExpect(jsonPath("$.emotion").value("Joy"));

		verify(dreamService, times(1)).create(any(Dream.class));
	}

}
