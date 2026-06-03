package com.terramora.backend.auth;

import com.terramora.backend.model.AdminUser;
import com.terramora.backend.repository.AdminUserRepository;
import com.terramora.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @GetMapping("/ping")
    public Map<String, Object> ping() {
        return Map.of(
                "status", "AUTH_PUBLIC_OK",
                "timestamp", Instant.now().toString()
        );
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        String email = request.getEmail() == null ? "" : request.getEmail().trim().toLowerCase();
        String password = request.getPassword() == null ? "" : request.getPassword();

        AdminUser adminUser = adminUserRepository.findByEmail(email)
                .orElseThrow(InvalidLoginException::new);

        if (!Boolean.TRUE.equals(adminUser.getEnabled())) {
            throw new InvalidLoginException();
        }

        boolean passwordMatches = passwordEncoder.matches(password, adminUser.getPassword());

        if (!passwordMatches) {
            throw new InvalidLoginException();
        }

        String token = jwtService.generateToken(adminUser.getEmail());

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