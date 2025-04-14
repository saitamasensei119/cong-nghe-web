package com.HTTN.thitn.controller;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHasher {
    public static void main(String[] args) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        // Mật khẩu bạn muốn băm
        String rawPasswordAdmin = "admin123";
        String rawPasswordTeacher = "teacher456";
        String rawPasswordStudent = "student789";

        // Băm các mật khẩu
        String hashedPasswordAdmin = passwordEncoder.encode(rawPasswordAdmin);
        String hashedPasswordTeacher = passwordEncoder.encode(rawPasswordTeacher);
        String hashedPasswordStudent = passwordEncoder.encode(rawPasswordStudent);

        // In ra các mật khẩu đã băm
        System.out.println("Hashed Password for admin_user: " + hashedPasswordAdmin);
        System.out.println("Hashed Password for teacher_user: " + hashedPasswordTeacher);
        System.out.println("Hashed Password for student_user: " + hashedPasswordStudent);
    }
}