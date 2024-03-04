package com.skilldistillery.dream.services;

import java.io.IOException;

import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.skilldistillery.dream.entities.ImgUrl;

public class ImgUrlDeserializer extends JsonDeserializer<ImgUrl> {
    
    @Override
    public ImgUrl deserialize(com.fasterxml.jackson.core.JsonParser jsonParser, DeserializationContext deserializationContext)
            throws IOException {
        String value = jsonParser.getValueAsString();
        if (value == null || value.trim().isEmpty()) {
            return null; // Handle empty strings by returning null or any default value
        }
        // Otherwise, parse the enum value normally
        return ImgUrl.valueOf(value);
    }
}
