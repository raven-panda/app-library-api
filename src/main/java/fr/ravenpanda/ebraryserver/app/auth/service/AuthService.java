package fr.ravenpanda.ebraryserver.app.auth.service;

import fr.ravenpanda.ebraryserver.app.auth.dto.LoginDto;
import fr.ravenpanda.ebraryserver.config.security.JwtUtils;
import fr.ravenpanda.ebraryserver.config.security.UserDetailsImpl;
import fr.ravenpanda.ebraryserver.config.security.UserDetailsServiceImpl;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Objects;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;

    @Autowired
    public AuthService(JwtUtils jwtUtils, AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsService) {
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    public ResponseCookie generateRefreshTokenCookie(LoginDto dto) {
        return ResponseCookie.from("refresh_token", getJwtAuthenticated(dto, true))
            .httpOnly(true)
            .path("/")
            .maxAge(7 * 24 * 60 * 60)
            .build();
    }

    public ResponseCookie generateAccessTokenCookie(LoginDto dto) {
        return ResponseCookie.from("access_token", getJwtAuthenticated(dto, false))
            .httpOnly(true)
            .path("/")
            .maxAge(-1)
            .build();
    }

    public ResponseCookie refreshAccessTokenCookie(HttpServletRequest request) {
        if (request.getCookies() == null)
            return null;

        Cookie refreshTokenCookie = Arrays.stream(request.getCookies()).filter(c -> Objects.equals(c.getName(), "refresh_token")).findFirst().orElse(null);
        if (refreshTokenCookie == null)
            return null;

        String email = jwtUtils.getEmailFromJwtToken(refreshTokenCookie.getValue());
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return ResponseCookie.from("access_token", jwtUtils.generateJwtToken(authentication, false))
            .httpOnly(true)
            .path("/")
            .maxAge(-1)
            .build();
    }

    private String getJwtAuthenticated(LoginDto loginRequest, boolean isRefreshToken) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        Long id = ((UserDetailsImpl) authentication.getPrincipal()).getId();

        return jwtUtils.generateJwtToken(authentication, isRefreshToken);
    }

}
