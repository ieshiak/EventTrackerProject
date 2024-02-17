package com.skilldistillery.dream.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.skilldistillery.dream.entities.Dream;
@SpringBootTest
class DreamRepositoryTest {
	@Autowired
	private DreamRepository  dreamRepo;

//	@Test
//    void testFindById() {
//		Optional<Dream> optionalDream = dreamRepo.findById(1);
//		Dream dream = null;
//		if(optionalDream.isPresent()) {
//			dream = optionalDream.get();
//		}
	

}
