package com.skilldistillery.dream.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;

class ZodiacTest {
    private static EntityManagerFactory emf;
    private EntityManager em;
    
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
    }
    
    @AfterEach
    void tearDown() throws Exception {
        em.close();
    }
    
    @Test
    void testZodiacMappings() {
        String jpql = "SELECT z FROM Zodiac z";
        TypedQuery<Zodiac> query = em.createQuery(jpql, Zodiac.class);
        List<Zodiac> zodiacs = query.getResultList();
        
        assertNotNull(zodiacs);
        assertEquals(12, zodiacs.size()); // Assuming there are 12 zodiac signs
        
        for (Zodiac zodiac : zodiacs) {
            assertNotNull(zodiac.getId());
            assertNotNull(zodiac.getZodiacSign());
            assertNotNull(zodiac.getStartDate());
            assertNotNull(zodiac.getEndDate());
            assertNotNull(zodiac.getBackgroundImg());
            assertNotNull(zodiac.getSleepPatternInfo());
        }
    }
}
