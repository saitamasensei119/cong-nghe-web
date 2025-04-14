package main.java.com.example.examapp.entity;

import jakarta.persistence.*;

@Entity
public class ExamPaper {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String subject;
    private int totalMarks;

    @Lob
    private String content; // Có thể chứa đề bài ở dạng text hoặc JSON

    // Getters và Setters
    // (IDE sẽ tự generate, hoặc dùng Lombok nếu thích)
}
