package com.skilldistillery.dream.entities;

public enum Role {
    ADMIN("admin"), MODERATOR("moderator"), USER("user");

    private final String role;

    Role(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }

    public static Role fromString(String text) {
        for (Role role : Role.values()) {
            if (role.role.equalsIgnoreCase(text)) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid role: " + text);
    }
}
