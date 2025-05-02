package com.HTTN.thitn.service;

import com.HTTN.thitn.entity.Subject;
import com.HTTN.thitn.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public Subject createSubject(Subject subject, String userRole) {
        if (!userRole.equals("teacher") && !userRole.equals("admin")) {
            throw new SecurityException("Only teachers or admins can create subjects");
        }
        if (subjectRepository.existsByName(subject.getName())) {
            throw new IllegalArgumentException("Subject name already exists");
        }
        return subjectRepository.save(subject);
    }

    public Subject updateSubject(Integer id, Subject subject, String userRole) {
        if (!userRole.equals("teacher") && !userRole.equals("admin")) {
            throw new SecurityException("Only teachers or admins can update subjects");
        }
        Subject existingSubject = subjectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Subject not found with id: " + id));
        if (!existingSubject.getName().equals(subject.getName()) && subjectRepository.existsByName(subject.getName())) {
            throw new IllegalArgumentException("Subject name already exists");
        }
        existingSubject.setName(subject.getName());
        existingSubject.setDescription(subject.getDescription());
        return subjectRepository.save(existingSubject);
    }

    public void deleteSubject(Integer id, String userRole) {
        if (!userRole.equals("teacher") && !userRole.equals("admin")) {
            throw new SecurityException("Only teachers or admins can delete subjects");
        }
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Subject not found with id: " + id));
        subjectRepository.delete(subject);
    }

    public Subject getSubjectById(Integer id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Subject not found with id: " + id));
    }

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }
}
