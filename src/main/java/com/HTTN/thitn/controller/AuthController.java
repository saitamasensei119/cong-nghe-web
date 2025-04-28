package com.HTTN.thitn.controller;

import com.HTTN.thitn.dto.Request.ChangePasswordRequest;
import com.HTTN.thitn.dto.Request.LoginRequest;
import com.HTTN.thitn.dto.Request.RegisterRequest;
import com.HTTN.thitn.dto.Response.LoginResponse;
import com.HTTN.thitn.entity.Role;
import com.HTTN.thitn.entity.User;
import com.HTTN.thitn.payload.ApiResponse;
import com.HTTN.thitn.repository.RoleRepository;
import com.HTTN.thitn.repository.UserRepository;
import com.HTTN.thitn.security.JwtUtil;
import com.HTTN.thitn.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(false, "Sai tên người dùng hoặc mật khẩu", null));
        }
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = jwtUtil.generateToken(userDetails);

        LoginResponse loginResponse = new LoginResponse(token);
        return ResponseEntity.ok(new ApiResponse<>(true, "Đăng nhập thành công", loginResponse));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, "Tên người dùng đã tồn tại", null));
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, "Email đã tồn tại", null));
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());

        Role studentRole = roleRepository.findByName("STUDENT")
                .orElseThrow(() -> new RuntimeException("Không tìm thấy role STUDENT"));
        user.getRoles().add(studentRole);

        userRepository.save(user);

        return ResponseEntity.ok(new ApiResponse<>(true, "Đăng ký thành công.", null));
    }

    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse<String>> changePassword(
            @RequestBody ChangePasswordRequest request, Principal principal) {

        String username = principal.getName();
        try {
            userService.changePassword(username, request.getOldPassword(), request.getNewPassword());
            return ResponseEntity.ok(new ApiResponse<>(true, "Mật khẩu đã được thay đổi thành công", null));
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(false, "Có lỗi xảy ra, vui lòng thử lại", null));
        }
    }
}
