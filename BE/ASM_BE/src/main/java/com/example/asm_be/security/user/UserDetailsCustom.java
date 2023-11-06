package com.example.asm_be.security.user;

import com.example.asm_be.entities.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
@AllArgsConstructor
public class UserDetailsCustom implements UserDetails {

     private String userName;
     private String password;
     private Collection<? extends GrantedAuthority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    public static UserDetails mapUserToUserDetails(Users users) {
        // Kiểm tra xem có vai trò hay không
        if (users.getRole() != null) {
            // Trường hợp có một vai trò
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(users.getRole());
            return new UserDetailsCustom(
                    users.getUserName(),
                    users.getPassword(),
                    Collections.singletonList(grantedAuthority)
            );
        } else {
            // Trường hợp không có vai trò (hoặc có thể xử lý khác tùy thuộc vào logic của bạn)
            return new UserDetailsCustom(
                    users.getUserName(),
                    users.getPassword(),
                    Collections.emptyList()
            );
        }
    }






    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() { // hết hạn account
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
