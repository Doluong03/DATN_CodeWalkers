package com.example.asm_be.jwt;

import com.example.asm_be.security.staff.CustomDetailsService;
import com.example.asm_be.security.user.CustomUsersDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private CustomDetailsService customDetailsService;
    @Autowired
    private CustomUsersDetailsService customUsersDetailsService;

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7);
        }

        return null;

    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);
            System.out.println(jwt);
            if (StringUtils.hasText(jwt) && jwtTokenProvider.ValidateToken(jwt)) {
                // Lấy username từ chuỗi token
                String userName = jwtTokenProvider.getUserNameFromJWT(jwt);

                // Thử tải thông tin người dùng từ cả hai nguồn
                UserDetails userDetails = customDetailsService.loadUserByUsername(userName);

                // Nếu không tìm thấy trong customDetailsService, thử tải từ customUsersDetailsService
                if (userDetails == null) {
//                    SecurityContextHolder.clearContext();  // Đảm bảo xóa thông tin người dùng hiện tại
                    userDetails = customUsersDetailsService.loadUserByUsername(userName);
                }

                if (userDetails != null) {

                    // Lấy danh sách quyền từ UserDetails
                    List<GrantedAuthority> authorities = new ArrayList<>(userDetails.getAuthorities());

                    // Chọn một quyền duy nhất từ danh sách (ở đây chọn quyền đầu tiên)
                    GrantedAuthority selectedAuthority = authorities.isEmpty() ? null : authorities.get(0);

                    // Tạo một danh sách mới chỉ chứa quyền đã chọn
                    List<GrantedAuthority> selectedAuthorities = selectedAuthority == null ? Collections.emptyList() : Collections.singletonList(selectedAuthority);

                    // Nếu thông tin tài khoản hợp lệ, đặt vào Security Context
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userDetails, null, selectedAuthorities);
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (Exception ex) {
            log.error("Fail on set authentication " + ex);
        }

        filterChain.doFilter(request, response);
    }

}
