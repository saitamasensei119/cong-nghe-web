package com.HTTN.thitn.controller;

import com.HTTN.thitn.dto.Request.StudentUpdateRequest;
import com.HTTN.thitn.dto.Request.TeacherUpdateRequest;
import com.HTTN.thitn.entity.User;
import com.HTTN.thitn.payload.ApiResponse;
import com.HTTN.thitn.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;

    @PutMapping("/students/update/{studentId}")
    public ResponseEntity<ApiResponse<Void>> updateStudentByAdmin(
            @PathVariable Long studentId,
            @RequestBody @Valid StudentUpdateRequest request) {

        userService.updateStudentById(studentId, request);
        ApiResponse<Void> response = new ApiResponse<>(true,
                String.format("Thông tin sinh viên có ID %d đã được cập nhật.", studentId),
                null);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/teachers/update/{teacherId}")
    public ResponseEntity<ApiResponse<Void>> updateTeacherByAdmin(
            @PathVariable Long teacherId,
            @RequestBody @Valid TeacherUpdateRequest request) {

        userService.updateTeacherById(teacherId, request);
        ApiResponse<Void> response = new ApiResponse<>(true,
                String.format("Thông tin giáo viên có ID %d đã được cập nhật.", teacherId),
                null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/users/role/{role}")
    public ResponseEntity<ApiResponse<List<User>>> findUsersByRole(@PathVariable String role) {
        List<User> users = userService.findUsersByRoleName(role.toUpperCase());
        ApiResponse<List<User>> response = new ApiResponse<>(true,
                String.format("Found %d user(s) with role %s.", users.size(), role.toUpperCase()),
                users);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/student/delete/{studentId}")
    public ResponseEntity<ApiResponse<String>> deleteStudentById(@PathVariable Long studentId) {
        Optional<String> response = userService.deleteStudentById(studentId);

        ApiResponse<String> apiResponse;
        if (response.isPresent()) {
            apiResponse = new ApiResponse<>(true, response.get(), null);
            return ResponseEntity.ok(apiResponse);
        } else {
            apiResponse = new ApiResponse<>(false, "Không tìm thấy sinh viên với ID " + studentId, null);
            return ResponseEntity.badRequest().body(apiResponse);
        }
    }

    @DeleteMapping("/teacher/delete/{teacherId}")
    public ResponseEntity<ApiResponse<String>> deleteTeacherById(@PathVariable Long teacherId) {
        Optional<String> response = userService.deleteTeacherById(teacherId);

        ApiResponse<String> apiResponse;
        if (response.isPresent()) {
            apiResponse = new ApiResponse<>(true, response.get(), null);
            return ResponseEntity.ok(apiResponse);
        } else {
            apiResponse = new ApiResponse<>(false, "Không tìm thấy giáo viên với ID " + teacherId, null);
            return ResponseEntity.badRequest().body(apiResponse);
        }
    }
}
