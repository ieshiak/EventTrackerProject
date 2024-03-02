package com.skilldistillery.dream.entities;
public enum ZodiacSign {
	Aries("♈"),
	Taurus("♉"),
	Gemini("♊"),
	Cancer("♋"),
	Leo("♌"),
	Virgo("♍"),
	Libra("♎"),
	Scorpio("♏"),
	Sagittarius("♐"),
	Capricorn("♑"),
	Aquarius("♒"),
	Pisces("♓");


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
