package com.HTTN.thitn.repository;

import com.HTTN.thitn.entity.SubjectTeacher;
import com.HTTN.thitn.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SubjectTeacherRepository extends JpaRepository<SubjectTeacher, Integer> {
    @Query("SELECT st.teacher FROM SubjectTeacher st WHERE st.subject.id = :subjectId")
    List<User> findTeachersBySubjectId(@Param("subjectId") Integer subjectId);
    Optional<SubjectTeacher> findBySubjectIdAndTeacherId(Integer subjectId, Integer teacherId);
}
