package com.terramora.backend.config;

import com.terramora.backend.model.AdminUser;
import com.terramora.backend.repository.AdminUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminUserSeeder implements CommandLineRunner {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Override
    public void run(String... args) {
        String email = adminEmail == null ? "admin@terramora.com" : adminEmail.trim().toLowerCase();
        String password = adminPassword == null || adminPassword.isBlank() ? "123123" : adminPassword;

        AdminUser adminUser = adminUserRepository.findByEmail(email)
                .orElseGet(() -> AdminUser.builder()
                        .email(email)
                        .role("ADMIN")
                        .enabled(true)
                        .build()
                );

        adminUser.setEmail(email);
        adminUser.setPassword(passwordEncoder.encode(password));
        adminUser.setRole("ADMIN");
        adminUser.setEnabled(true);

        adminUserRepository.save(adminUser);
    }
}