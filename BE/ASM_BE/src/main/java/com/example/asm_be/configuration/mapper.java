package com.example.asm_be.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class mapper {
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

}
