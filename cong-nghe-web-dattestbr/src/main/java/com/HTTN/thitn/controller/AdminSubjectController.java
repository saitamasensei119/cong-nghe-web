package com.HTTN.thitn.controller;
import com.HTTN.thitn.dto.Request.SubjectRequest;
import com.HTTN.thitn.dto.Response.SubjectResponse;
import com.HTTN.thitn.entity.Subject;
import com.HTTN.thitn.entity.User;
import com.HTTN.thitn.service.SubjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/api/admin/subjects")

public class AdminSubjectController {
    //admin thêm, sửa, xóa subject, chấp nhận, từ chối môn học được đưa lên,gán, gỡ giáo viên khỏi môn học
    @Autowired
    private SubjectService subjectService;

    @GetMapping("/pending")
    public ResponseEntity<List<SubjectResponse>> getPendingSubjects() {
        List<Subject> pendingSubjects = subjectService.getSubjectsByStatus(0);
        List<SubjectResponse> response = pendingSubjects.stream()
                .map(SubjectResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<Void> approveSubject(@PathVariable Integer id) {
        subjectService.approveSubject(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<Void> rejectSubject(@PathVariable Integer id) {
        subjectService.rejectSubject(id);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/{subjectId}/assign-teacher/{teacherId}")
    public ResponseEntity<Void> assignTeacher(@PathVariable Integer subjectId, @PathVariable Integer teacherId) {
        subjectService.assignTeacherToSubject(subjectId, teacherId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{subjectId}/remove-teacher/{teacherId}")
    public ResponseEntity<Void> removeTeacher(@PathVariable Integer subjectId, @PathVariable Integer teacherId) {
        subjectService.removeTeacherFromSubject(subjectId, teacherId);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/{subjectId}/teachers")
    public ResponseEntity<List<User>> getTeachersForSubject(@PathVariable Integer subjectId) {
        List<User> teachers = subjectService.getTeachersForSubject(subjectId);
        return ResponseEntity.ok(teachers);
    }

    @PostMapping
    public ResponseEntity<SubjectResponse> createSubject(@Valid @RequestBody SubjectRequest request) {
        Subject subject = new Subject();
        subject.setName(request.getName());
        subject.setDescription(request.getDescription());
        Subject createdSubject = subjectService.createSubject(subject);
        return ResponseEntity.status(HttpStatus.CREATED).body(new SubjectResponse(createdSubject));
    }

    @PutMapping("/{id}")

    public ResponseEntity<SubjectResponse> updateSubject(@PathVariable Integer id, @Valid @RequestBody SubjectRequest request) {
        Subject subject = new Subject();
        subject.setName(request.getName());
        subject.setDescription(request.getDescription());
        Subject updatedSubject = subjectService.updateSubject(id, subject);
        return ResponseEntity.ok(new SubjectResponse(updatedSubject));
    }

    @DeleteMapping("/{id}")

    public ResponseEntity<Void> deleteSubject(@PathVariable Integer id) {
        subjectService.deleteSubject(id);
        return ResponseEntity.noContent().build();
    }

}
