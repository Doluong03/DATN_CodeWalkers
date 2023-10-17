package com.example.asm_be.security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.ProviderNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import java.util.List;

public class CustomProviderManager extends ProviderManager {

    public CustomProviderManager(List<AuthenticationProvider> providers) {
        super(providers);
    }

    @Override
    public Authentication authenticate(Authentication authentication) {
        AuthenticationException lastException = null;

        for (AuthenticationProvider provider : getProviders()) {
            if (!provider.supports(authentication.getClass())) {
                continue;
            }

            try {
                return provider.authenticate(authentication);
            } catch (AuthenticationException e) {
                lastException = e;
            }
        }

        if (lastException != null) {
            throw lastException;
        }

        throw new ProviderNotFoundException("No authentication provider found");
    }
}
