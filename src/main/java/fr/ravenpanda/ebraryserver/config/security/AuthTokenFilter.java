package fr.ravenpanda.ebraryserver.config.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Objects;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = parseJwt(request, false);
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                updateSecurityContext(jwt, request);
            } else {
                String refreshJwt = parseJwt(request, true);
                if (refreshJwt != null && jwtUtils.validateJwtToken(refreshJwt)) {
                    UsernamePasswordAuthenticationToken authentication = getAuthentication(refreshJwt, request);
                    String newAccessToken = jwtUtils.generateJwtToken(authentication, false);

                    updateSecurityContext(newAccessToken, request);

                    Cookie newAccessTokenCookie = new Cookie("access_token", newAccessToken);
                    newAccessTokenCookie.setHttpOnly(true);
                    newAccessTokenCookie.setPath("/");
                    newAccessTokenCookie.setMaxAge(-1);

                    response.addCookie(newAccessTokenCookie);
                }
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String jwt, HttpServletRequest request) {
        String email = jwtUtils.getEmailFromJwtToken(jwt);

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        return authentication;
    }

    private void updateSecurityContext(String jwt, HttpServletRequest request) {
        SecurityContextHolder.getContext().setAuthentication(getAuthentication(jwt, request));
    }

    private String parseJwt(HttpServletRequest request, boolean isRefreshToken) {
        if (request.getCookies() == null)
            return null;

        Cookie accessTokenCookie = Arrays.stream(request.getCookies()).filter(c -> Objects.equals(c.getName(), isRefreshToken ? "refresh_token" : "access_token")).findFirst().orElse(null);
        if (accessTokenCookie == null)
            return null;

        return accessTokenCookie.getValue();
    }
}
