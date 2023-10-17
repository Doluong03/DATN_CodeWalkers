package com.example.asm_be.security.user;

import com.example.asm_be.entities.Staff;
import com.example.asm_be.entities.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {

     private String userName;
     private String password;
     private Collection<? extends GrantedAuthority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    // tù thông tin accpunt chuyển sang thông tin UserDetails
    public static UserDetails mapAccountToUserDetails(Users Users){
        //lấy các quyên của account
        List<GrantedAuthority> grantedAuthorityList = Users.getRole().stream()
                .map(roles -> new SimpleGrantedAuthority(roles.getNameRole()))
                .collect(Collectors.toList());
        // trả về đổi tượng account của user
            return new CustomUserDetails(
                    Users.getUserName(),
                    Users.getPassword(),
                    grantedAuthorityList
            );
               
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
