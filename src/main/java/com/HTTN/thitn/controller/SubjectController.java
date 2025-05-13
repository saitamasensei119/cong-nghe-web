package com.HTTN.thitn.controller;

import com.HTTN.thitn.dto.Request.SubjectRequest;
import com.HTTN.thitn.dto.Response.SubjectResponse;
import com.HTTN.thitn.entity.Subject;
import com.HTTN.thitn.service.SubjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/teacher/subjects")
public class SubjectController {
    // giáo viên xử lí với subject, thêm, sửa, tìm

    @Autowired
    private SubjectService subjectService;

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


    @GetMapping("/{id}")
    public ResponseEntity<SubjectResponse> getSubjectById(@PathVariable Integer id) {
        Subject subject = subjectService.getSubjectById(id);
        if (subject == null) {
            // Trả về mã lỗi 404 nếu không tìm thấy subject
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new SubjectResponse(subject));
    }

    @GetMapping
    public ResponseEntity<List<SubjectResponse>> getAllSubjects() {
        List<Subject> subjects = subjectService.getAllSubjects();
        List<SubjectResponse> response = subjects.stream()
                .map(SubjectResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
}
