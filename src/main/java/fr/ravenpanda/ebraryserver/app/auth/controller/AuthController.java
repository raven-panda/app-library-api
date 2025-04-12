package fr.ravenpanda.ebraryserver.app.auth.controller;

import fr.ravenpanda.ebraryserver.app.auth.dto.LoginDto;
import fr.ravenpanda.ebraryserver.app.auth.dto.RegisterDto;
import fr.ravenpanda.ebraryserver.app.auth.dto.UserDto;
import fr.ravenpanda.ebraryserver.app.auth.service.AuthService;
import fr.ravenpanda.ebraryserver.app.auth.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final PasswordEncoder encoder;

    @Autowired
    public AuthController(UserService userService, PasswordEncoder encoder, AuthService authService) {
        this.authService = authService;
        this.userService = userService;
        this.encoder = encoder;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDto dto) {
        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, authService.generateRefreshTokenCookie(dto).toString())
            .header(HttpHeaders.SET_COOKIE, authService.generateAccessTokenCookie(dto).toString())
            .build();
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterDto dto, HttpServletResponse res) {
        if (!Objects.equals(dto.getPassword(), dto.getPasswordConfirm())) return ResponseEntity.badRequest().build();
        if (userService.existsByEmail(dto.getEmail())) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        UserDto newUserDto = UserDto.builder()
                .email(dto.getEmail())
                .username(dto.getUsername())
                .role(dto.getRole())
                .password(encoder.encode(dto.getPassword()))
                .build();

        userService.save(newUserDto);

        LoginDto loginDto = LoginDto.builder().email(dto.getEmail()).password(dto.getPassword()).build();

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, authService.generateRefreshTokenCookie(loginDto).toString())
            .header(HttpHeaders.SET_COOKIE, authService.generateAccessTokenCookie(loginDto).toString())
            .build();
    }

    @GetMapping("/refresh")
    public ResponseEntity<Object> refresh(HttpServletRequest request, HttpServletResponse response) {
        ResponseCookie newAccessToken = authService.refreshAccessTokenCookie(request);
        if (newAccessToken == null)
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, newAccessToken.toString())
            .build();
    }

}
