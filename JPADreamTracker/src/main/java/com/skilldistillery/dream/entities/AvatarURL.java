package com.skilldistillery.dream.entities;
public enum AvatarURL {
    AVATAR_1("images/IMG_STAR1.PNG"),
    AVATAR_2("images/IMG_STAR2.PNG"),
    AVATAR_3("images/IMG_STAR3.PNG"),
    AVATAR_4("images/IMG_STAR4.PNG"),
    AVATAR_5("images/IMG_STAR5.PNG"),
    AVATAR_6("images/IMG_STAR6.PNG"),
    AVATAR_7("images/IMG_STAR7.PNG"),
    AVATAR_8("images/IMG_STAR8.PNG"),
    AVATAR_9("images/IMG_STAR9.PNG"),
    AVATAR_10("images/IMG_STAR10.PNG"),
    AVATAR_11("images/IMG_STAR11.PNG"),
    AVATAR_12("images/IMG_STAR12.PNG"),
    AVATAR_13("images/IMG_STAR13.PNG"),
    AVATAR_14("images/IMG_STAR14.PNG"),
    AVATAR_15("images/IMG_STAR15.PNG"),
    AVATAR_16("images/IMG_STAR16.PNG"),
    AVATAR_17("images/IMG_STAR17.PNG"),
    AVATAR_18("images/IMG_STAR18.PNG"),
    AVATAR_19("images/IMG_STAR19.PNG"),
    AVATAR_20("images/IMG_STAR20.PNG"),
    AVATAR_21("images/IMG_STAR21.PNG"),
    AVATAR_22("images/IMG_STAR22.PNG");
	
    private final String url;

    AvatarURL(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }
}
