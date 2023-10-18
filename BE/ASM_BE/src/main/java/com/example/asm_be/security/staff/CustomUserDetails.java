package com.example.asm_be.security.staff;

import com.example.asm_be.entities.Staff;
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

     private int id;
     private String userName;
     private String password;
     private boolean status;
     private Collection<? extends GrantedAuthority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    // tù thông tin accpunt chuyển sang thông tin UserDetails
    public static UserDetails mapAccountToUserDetails(Staff staff){
        //lấy các quyên của account
        List<GrantedAuthority> grantedAuthorityList = staff.getRoles().stream()
                .map(roles -> new SimpleGrantedAuthority(roles.getNameRole()))
                .collect(Collectors.toList());
        // trả về đổi tượng account của user
            return new CustomUserDetails(
                    staff.getId(),
                    staff.getUserName(),
                    staff.getPassword(),
                    staff.isStatus(),
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
