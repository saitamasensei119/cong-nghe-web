package com.HTTN.thitn.service;

import com.HTTN.thitn.dto.Request.StudentUpdateRequest;
import com.HTTN.thitn.dto.Request.TeacherUpdateRequest;
import com.HTTN.thitn.entity.User;
import com.HTTN.thitn.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void updateStudentInfo(String username, StudentUpdateRequest request) {
        User student = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy sinh viên với username: " + username));
        if (request.getEmail() != null) {
            student.setEmail(request.getEmail());
        }
        userRepository.save(student);
    }

    public void updateTeacherInfo(String username, TeacherUpdateRequest request) {
        User teacher = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy giáo viên với username: " + username));
        if (request.getEmail() != null) {
            teacher.setEmail(request.getEmail());
        }
        userRepository.save(teacher);
    }

    public void updateStudentById(Long studentId, StudentUpdateRequest request) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy sinh viên với ID: " + studentId));
        userRepository.save(student);
    }

    public void updateTeacherById(Long teacherId, TeacherUpdateRequest request) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy giáo viên với ID: " + teacherId));
        userRepository.save(teacher);
    }

    public List<User> findUsersByRoleName(String roleName) {
        return userRepository.findByRoles_Name(roleName);
    }

    public Optional<String> deleteStudentById(Long studentId) {
        Optional<String> response = Optional.empty();
        User student = userRepository.findById(studentId)
                .filter(user -> user.getRoles().stream().anyMatch(role -> role.getName().equals("STUDENT")))
                .orElse(null);

        if (student != null) {
            userRepository.delete(student);
            response = Optional.of("Sinh viên với ID " + studentId + " đã được xóa.");
        }
        return response;
    }

    public Optional<String> deleteTeacherById(Long teacherId) {
        Optional<String> response = Optional.empty();
        User teacher = userRepository.findById(teacherId)
                .filter(user -> user.getRoles().stream().anyMatch(role -> role.getName().equals("TEACHER")))
                .orElse(null);

        if (teacher != null) {
            userRepository.delete(teacher);
            response = Optional.of("Giáo viên với ID " + teacherId + " đã được xóa.");
        }
        return response;
    }

    public void changePassword(String username, String oldPassword, String newPassword) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy người dùng với username: " + username));

        if (!passwordEncoder.matches(oldPassword, user.getPasswordHash())) {
            throw new BadCredentialsException("Mật khẩu cũ không chính xác");
        }

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}

