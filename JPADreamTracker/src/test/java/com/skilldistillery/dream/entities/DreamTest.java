package com.skilldistillery.dream.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDate;
import java.time.LocalTime;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

class DreamTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Dream dream;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPADreamTracker");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		dream = em.find(Dream.class, 1);
		
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		dream = null;
	}
	
	@Test
    void test_Dream_entity_mapping() {
        // Create a new Dream object with the provided data
        Dream dream = new Dream();
        dream.setId(1);
        dream.setDreamer("unknown");
        dream.setTitle("Flying Dream");
        dream.setDate(LocalDate.of(2024, 2, 16)); // Matches the date from the database
        dream.setTime(LocalTime.of(10, 30)); // Matches the time from the database
        dream.setDescription("I was flying over a beautiful landscape");
        dream.setType(Type.Lucid);
        dream.setEmotion(Emotion.Excitement);
        dream.setImgUrl(ImgUrl.img_star13);

        // Perform assertions
        assertNotNull(dream);
        assertEquals(1, dream.getId());
        assertEquals("Flying Dream", dream.getTitle());
        assertEquals(Emotion.Excitement, dream.getEmotion());
        assertEquals(Type.Lucid, dream.getType());
    }
}


