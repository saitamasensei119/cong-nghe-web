package com.HTTN.thitn.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; // Import annotation này
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')") // Sử dụng annotation này để bảo vệ endpoint
    public ResponseEntity<String> getAdminResource() {
        return ResponseEntity.ok("Đây là tài nguyên dành cho admin!");
    }
}