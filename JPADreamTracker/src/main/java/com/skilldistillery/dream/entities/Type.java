package com.skilldistillery.dream.entities;

public enum Type {
	Normal("Normal"),
    Lucid("Lucid"),
    Nightmare("Nightmare"),
    Day("Day"),
    Epic("Epic"),
    Awakening("Awakening"),
    Terror("Terror"),
    Progressive("Progressive"),
    Prophetic("Prophetic"),
    Recurring("Recurring"),
    Vivid("Vivid"),
    Surreal("Surreal"),
    Empowering("Empowering"),
    Inspirational("Inspirational"),
    Mystical("Mystical"),
    Transformational("Transformational"),
    Enlightening("Enlightening"),
    Symbolic("Symbolic"),
    Challenging("Challenging"),
    Guiding("Guiding"),
    Creative("Creative"),
    Harmonious("Harmonious");

    private final String label;

    Type(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
    
    public static Type fromString(String text) {
        System.out.println("Attempting to convert string: " + text);
        for (Type type : Type.values()) {
            System.out.println("Checking enum constant: " + type.getLabel());
            if (type.getLabel().replaceAll("\\s+", "").equalsIgnoreCase(text.trim().replaceAll("\\s+", ""))) {
                System.out.println("Match found for: " + text);
                return type;
            }
        }
        System.out.println("No match found for: " + text);
        throw new IllegalArgumentException("Invalid dream type: " + text);
    }




}

