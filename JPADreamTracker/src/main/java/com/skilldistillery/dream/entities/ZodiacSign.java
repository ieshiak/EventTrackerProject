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
}
