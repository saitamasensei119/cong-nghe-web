package com.HTTN.thitn.repository;

import com.HTTN.thitn.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {
    boolean existsByName(String name);
}
