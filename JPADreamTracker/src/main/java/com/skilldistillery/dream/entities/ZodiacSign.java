package com.skilldistillery.dream.entities;
public enum ZodiacSign {
    ARIES("♈"),
    TAURUS("♉"),
    GEMINI("♊"),
    CANCER("♋"),
    LEO("♌"),
    VIRGO("♍"),
    LIBRA("♎"),
    SCORPIO("♏"),
    SAGITTARIUS("♐"),
    CAPRICORN("♑"),
    AQUARIUS("♒"),
    PISCES("♓");

    private final String symbol;

    ZodiacSign(String symbol) {
        this.symbol = symbol;
    }

    public String getSymbol() {
        return symbol;
    }

    public static ZodiacSign fromString(String text) {
        String input = text.trim().toLowerCase();
        for (ZodiacSign zodiacSign : ZodiacSign.values()) {
            if (zodiacSign.name().equalsIgnoreCase(input) || zodiacSign.getSymbol().equalsIgnoreCase(input)) {
                return zodiacSign;
            }
        }
        throw new IllegalArgumentException("Invalid zodiacSign: " + text);
    }
}
