package com.example.asm_be.security;

import com.example.asm_be.jwt.JwtAuthenticationFilter;
import com.example.asm_be.security.staff.CustomDetailsService;
import com.example.asm_be.security.user.CustomUsersDetailsService;
import com.example.asm_be.security.user.UserDetailsCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class WebSecurityconfig {


    @Autowired
    private CustomDetailsService customDetailsService;

    @Autowired
    private CustomUsersDetailsService userDetailsCustom;

    @Bean
    public JwtAuthenticationFilter authenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationProvider customAuthenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(customDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationProvider userDetailsCustomAuthenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsCustom);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    //lấy dữ liệu của người dùng truyền vào rồi xác thực bằng cách gọi phương thức AuthenProvider
    @Bean
    public AuthenticationManager authenticationManager() {
        List<AuthenticationProvider> providers = Arrays.asList(
                userDetailsCustomAuthenticationProvider(),
                customAuthenticationProvider()
        );

        return new CustomProviderManager(providers);
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/api/test/**").authenticated()
                                .requestMatchers("/admin/User/insert").authenticated()
                                .requestMatchers("/admin/User/update").authenticated()
                                .requestMatchers("/CodeWalkers/User").permitAll()

                                .requestMatchers("/CodeWalkers/admin/Material/select").permitAll()
                                .requestMatchers("/CodeWalkers/admin/Material/insert").authenticated()
                                .requestMatchers("/CodeWalkers/admin/Material/update").authenticated()
                                .requestMatchers("/CodeWalkers/admin/Material/delete").authenticated()
                                .requestMatchers("/CodeWalkers/admin/admin/Category").permitAll()
                                .requestMatchers("/CodeWalkers/admin/Category/insert").authenticated()
                                .requestMatchers("/CodeWalkers/admin/Category/update").authenticated()
                                .requestMatchers("/CodeWalkers/admin/Category/delete").authenticated()
                                .requestMatchers("/CodeWalkers/admin/Bill/select").permitAll()
                                .requestMatchers("/CodeWalkers/admin/Bill/insert").authenticated()
                                .requestMatchers("/CodeWalkers/admin/Bill/update").authenticated()
                                .requestMatchers("/CodeWalkers/admin/Bill/delete").authenticated()
//                                .requestMatchers("/CodeWalkers/admin/Bill/updateStatus").authenticated()
                                //crus phải có đuôi authenticated() còn hiển thị thì đuôi permitAll()
                                .anyRequest().permitAll()
                )
                .cors().and()
                .csrf().disable()
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(authenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
//        return configuration.getAuthenticationManager();
//    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
