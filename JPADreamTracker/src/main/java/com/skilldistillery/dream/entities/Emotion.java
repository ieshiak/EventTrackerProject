package com.skilldistillery.dream.entities;
public enum Emotion {
    Joy,
    Bliss,
    Anger,
    Fear,
    Dread,
    Wonder,
    Intrigue,
    Fascination,
    Happiness,
    Amazement,
    Relaxation,
    Disorientation,
    Sadness,
    Surprise,
    Disgust,
    Love,
    Amusement,
    Adventure,
    Guilt,
    Hope,
    Inspired,
    Interested,
    Prideful,
    Serenity,
    Curious,
    Hate,
    Trust,
    Excitement;
    
    public static Emotion fromString(String text) {
        System.out.println("Attempting to convert string: " + text);
        for (Emotion emotion : Emotion.values()) {
            System.out.println("Checking enum constant: " + emotion);
            if (emotion.toString().equalsIgnoreCase(text.trim())) {
                System.out.println("Match found for: " + text);
                return emotion;
            }
        }
        System.out.println("No match found for: " + text);
        throw new IllegalArgumentException("Invalid emotion: " + text);
    }
}

