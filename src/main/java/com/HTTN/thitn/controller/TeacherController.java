package com.HTTN.thitn.controller;

import com.HTTN.thitn.dto.Request.TeacherUpdateRequest;
import com.HTTN.thitn.entity.User;
import com.HTTN.thitn.payload.ApiResponse;
import com.HTTN.thitn.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/teacher")
@RequiredArgsConstructor
public class TeacherController {

    private final UserService userService;

    @PutMapping("/update-info")
    public ResponseEntity<ApiResponse<String>> updateTeacherInfo(@RequestBody @Valid TeacherUpdateRequest request, Principal principal) {
        String username = principal.getName();
        userService.updateTeacherInfo(username, request);

        ApiResponse<String> response = new ApiResponse<>(true, "Thông tin giáo viên đã được cập nhật.", null);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/student/findall")
    public ResponseEntity<ApiResponse<List<User>>> findByRoles_Name() {
        List<User> users = userService.findUsersByRoleName("STUDENT");

        ApiResponse<List<User>> response = new ApiResponse<>(true, "Danh sách sinh viên.", users);
        return ResponseEntity.ok(response);
    }
}
