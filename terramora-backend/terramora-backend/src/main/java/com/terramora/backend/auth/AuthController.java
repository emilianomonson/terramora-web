package com.terramora.backend.auth;

import com.terramora.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtService jwtService;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @GetMapping("/ping")
    public Map<String, Object> ping() {
        return Map.of(
                "status", "AUTH_PUBLIC_OK",
                "timestamp", Instant.now().toString(),
                "adminEmailConfigured", adminEmail != null && !adminEmail.isBlank(),
                "adminPasswordConfigured", adminPassword != null && !adminPassword.isBlank()
        );
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        String email = request.getEmail() == null ? "" : request.getEmail().trim().toLowerCase();
        String password = request.getPassword() == null ? "" : request.getPassword();

        String expectedEmail = adminEmail == null ? "" : adminEmail.trim().toLowerCase();
        String expectedPassword = adminPassword == null ? "" : adminPassword;

        if (!email.equals(expectedEmail) || !password.equals(expectedPassword)) {
            throw new InvalidLoginException();
        }

        String token = jwtService.generateToken(email);

        return new AuthResponse(token);
    }

    @ExceptionHandler(InvalidLoginException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Map<String, String> handleInvalidLogin() {
        return Map.of(
                "message", "Email o contraseña incorrectos."
        );
    }

    private static class InvalidLoginException extends RuntimeException {
    }
}