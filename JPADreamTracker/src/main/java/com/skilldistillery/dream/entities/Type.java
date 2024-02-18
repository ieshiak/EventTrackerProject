package com.skilldistillery.dream.entities;

public enum Type {
    LucidDream("Lucid Dream"),
    Nightmare("Nightmare"),
    DayDream("Day Dream"),
    EpicDream("Epic Dream"),
    FalseAwakening("False Awakening"),
    NightTerror("Night Terror"),
    ProgressiveDream("Progressive Dream"),
    PropheticDream("Prophetic Dream"),
    RecurringDream("Recurring Dream"),
    VividDream("Vivid Dream"),
    SurrealDream("Surreal Dream"),
    EmpoweringDream("Empowering Dream"),
    InspirationalDream("Inspirational Dream"),
    MysticalDream("Mystical Dream"),
    TransformationalDream("Transformational Dream"),
    EnlighteningDream("Enlightening Dream"),
    SymbolicDream("Symbolic Dream"),
    ChallengingDream("Challenging Dream"),
    GuidingDream("Guiding Dream"),
    CreativeDream("Creative Dream"),
    HarmoniousDream("Harmonious Dream");

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

