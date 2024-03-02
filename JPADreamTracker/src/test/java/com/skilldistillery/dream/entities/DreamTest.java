package com.skilldistillery.dream.entities;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;

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
        assertNotNull(dream);
        assertEquals("Flying Dream", dream.getTitle());
        assertEquals(Emotion.Excitement, dream.getEmotion());
        assertEquals(Type.Lucid, dream.getType());
    }
	
	@Test
    void testDreamMappings() {
        // Create a Dream object with sample data
        Dream dream = new Dream();
        dream.setTitle("Test Dream");
        dream.setDescription("This is a test dream description.");
        dream.setType(Type.Lucid);
        dream.setEmotion(Emotion.Adventure);
        dream.setDateTime(LocalDateTime.now());
        
        // Persist the Dream object in the database
        em.getTransaction().begin();
        em.persist(dream);
        em.getTransaction().commit();
        
        // Retrieve the Dream object from the database
        Dream savedDream = em.find(Dream.class, dream.getId());
        
        // Test if the retrieved Dream object matches the original one
        assertNotNull(savedDream);
        assertEquals("Test Dream", savedDream.getTitle());
        assertEquals("This is a test dream description.", savedDream.getDescription());
        assertEquals(Type.Lucid, savedDream.getType());
        assertEquals(Emotion.Adventure, savedDream.getEmotion());
        assertNotNull(savedDream.getDateTime());
    }
	@Test
    void testDreamMappingsWithImgUrl() {
        // Create a Dream object with sample data
        Dream dream = new Dream();
        dream.setTitle("Test Dream");
        dream.setDescription("This is a test dream description.");
        dream.setType(Type.Lucid);
        dream.setEmotion(Emotion.Anger);
        dream.setDateTime(LocalDateTime.now());
        dream.setImgUrl(ImgUrl.img_star1); // Set the imgUrl
        
        // Persist the Dream object in the database
        em.getTransaction().begin();
        em.persist(dream);
        em.getTransaction().commit();
        
        // Retrieve the Dream object from the database
        Dream savedDream = em.find(Dream.class, dream.getId());
        
        // Test if the retrieved Dream object matches the original one
        assertNotNull(savedDream);
        assertEquals("Test Dream", savedDream.getTitle());
        assertEquals("This is a test dream description.", savedDream.getDescription());
        assertEquals(Type.Lucid, savedDream.getType());
        assertEquals(Emotion.Anger, savedDream.getEmotion());
        assertNotNull(savedDream.getDateTime());
        assertEquals(ImgUrl.img_star1, savedDream.getImgUrl()); // Check imgUrl
    }
}

