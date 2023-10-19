package com.example.asm_be.jwt;

import com.example.asm_be.security.staff.CustomUserDetails;
import com.example.asm_be.security.user.UserDetailsCustom;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {

    @Value("${app.jwt-secret}")
    private String JWT_SECRET;
    @Value("${app-jwt-expiration-milliseconds}")
    private Long EXPIRATION;

    // Tạo JWT từ thông tin tài khoản nhân viên
    public String generateToken(CustomUserDetails customUserDetails) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + EXPIRATION);

        return Jwts.builder()
                .setSubject(customUserDetails.getUsername())
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(getKey())
                .compact();
    }
    // Tạo JWT từ thông tin tài khoản user
    public String generateTokenUser(UserDetailsCustom userDetailsCustom) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + EXPIRATION);

        return Jwts.builder()
                .setSubject(userDetailsCustom.getUsername())
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        // Đảm bảo JWT_SECRET có đủ kích thước, nếu không hãy thêm các ký tự để đạt đến kích thước mong muốn
        while (JWT_SECRET.length() < 32) {
            JWT_SECRET += JWT_SECRET;
        }

        // Lấy 32 ký tự đầu tiên để đảm bảo có đủ độ dài
        byte[] apiKeySecretBytes = JWT_SECRET.substring(0, 32).getBytes(StandardCharsets.UTF_8);
        return new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());
    }

    //lay thong tin account tu chuoi token
    public String getUserNameFromJWT(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        String username = claims.getSubject();
        return username;
    }

    // validate
    public boolean ValidateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parse(token);
            return true;
            } catch (MalformedJwtException ex) {
                log.error("Invalid JWT Token");
            } catch (ExpiredJwtException ex) {
                log.error("Expired JWT Token");
            } catch (UnsupportedJwtException ex) {
                log.error("Unsupported JWT Token");
            }catch (IllegalArgumentException ex) {
                log.error("JWT  claims string is empty");
            }
              return false;
    }

}
