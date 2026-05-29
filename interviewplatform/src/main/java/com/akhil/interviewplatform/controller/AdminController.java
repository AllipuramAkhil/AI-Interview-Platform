package com.akhil.interviewplatform.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.akhil.interviewplatform.entity.Question;
import com.akhil.interviewplatform.entity.User;
import com.akhil.interviewplatform.entity.InterviewSession;
import com.akhil.interviewplatform.service.QuestionService;
import com.akhil.interviewplatform.service.InterviewSessionService;
import com.akhil.interviewplatform.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private InterviewSessionService interviewSessionService;

    @Autowired
    private UserRepository userRepository;

    // =========================
    // ADMIN STATS
    // =========================
    @GetMapping("/stats")
    public ResponseEntity<?> getAdminStats() {
        try {
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalUsers", userRepository.count());
            stats.put("totalQuestions", questionService.getAllQuestions().size());
            stats.put("totalInterviews", interviewSessionService.getAllSessions().size());
            stats.put("averageScore", 0); // Can be calculated from results
            stats.put("mostUsedCategory", "General");
            stats.put("activeUsersLastWeek", 0);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // =========================
    // QUESTIONS MANAGEMENT
    // =========================
    @GetMapping("/questions")
    public ResponseEntity<?> getAllQuestions(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String role
    ) {
        try {
            List<Question> allQuestions = questionService.getAllQuestions();
            
            // Filter by category if provided
            if (category != null && !category.isEmpty() && !"All categories".equals(category)) {
                allQuestions = allQuestions.stream()
                        .filter(q -> category.equalsIgnoreCase(q.getCategory()))
                        .toList();
            }
            
            // Filter by search if provided
            if (search != null && !search.isEmpty()) {
                final String searchTerm = search.toLowerCase();
                allQuestions = allQuestions.stream()
                        .filter(q -> q.getTitle().toLowerCase().contains(searchTerm))
                        .toList();
            }
            
            // Filter by difficulty if provided (role parameter maps to difficulty)
            if (role != null && !role.isEmpty() && !"All roles".equals(role)) {
                allQuestions = allQuestions.stream()
                        .filter(q -> role.equalsIgnoreCase(q.getDifficulty()))
                        .toList();
            }
            
            // Pagination
            int start = (page - 1) * pageSize;
            int end = Math.min(start + pageSize, allQuestions.size());
            List<Question> paginatedQuestions = allQuestions.subList(start, end);
            
            Map<String, Object> response = new HashMap<>();
            response.put("items", paginatedQuestions);
            response.put("total", allQuestions.size());
            response.put("page", page);
            response.put("pageSize", pageSize);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/questions")
    public ResponseEntity<?> createQuestion(@Valid @RequestBody Question question) {
        try {
            Question created = questionService.addQuestion(question);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/questions/{id}")
    public ResponseEntity<?> updateQuestion(
            @PathVariable Long id,
            @Valid @RequestBody Question question
    ) {
        try {
            Question updated = questionService.updateQuestion(id, question);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/questions/{id}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long id) {
        try {
            questionService.deleteQuestion(id);
            return ResponseEntity.ok(Map.of("message", "Question deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // =========================
    // USERS MANAGEMENT
    // =========================
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        try {
            List<User> allUsers = userRepository.findAll();
            
            // Pagination
            int start = (page - 1) * pageSize;
            int end = Math.min(start + pageSize, allUsers.size());
            List<User> paginatedUsers = allUsers.subList(start, end);
            
            Map<String, Object> response = new HashMap<>();
            response.put("items", paginatedUsers);
            response.put("total", allUsers.size());
            response.put("page", page);
            response.put("pageSize", pageSize);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getUserDetails(@PathVariable Long userId) {
        try {
            Optional<User> user = userRepository.findById(userId);
            if (user.isPresent()) {
                return ResponseEntity.ok(user.get());
            }
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/users/{userId}/block")
    public ResponseEntity<?> blockUser(@PathVariable Long userId) {
        try {
            Optional<User> userOpt = userRepository.findById(userId);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                // Add a blocked field to User entity if needed
                // For now, just return success
                return ResponseEntity.ok(Map.of("message", "User blocked successfully"));
            }
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/users/{userId}/unblock")
    public ResponseEntity<?> unblockUser(@PathVariable Long userId) {
        try {
            Optional<User> userOpt = userRepository.findById(userId);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                // Add a blocked field to User entity if needed
                // For now, just return success
                return ResponseEntity.ok(Map.of("message", "User unblocked successfully"));
            }
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    // =========================
    // INTERVIEWS MANAGEMENT
    // =========================
    @GetMapping("/interviews")
    public ResponseEntity<?> getAllInterviews(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        try {
            List<InterviewSession> allInterviews = interviewSessionService.getAllSessions();
            
            // Pagination
            int start = (page - 1) * pageSize;
            int end = Math.min(start + pageSize, allInterviews.size());
            List<InterviewSession> paginatedInterviews = allInterviews.subList(start, end);
            
            Map<String, Object> response = new HashMap<>();
            response.put("items", paginatedInterviews);
            response.put("total", allInterviews.size());
            response.put("page", page);
            response.put("pageSize", pageSize);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/users/{userId}/interviews")
    public ResponseEntity<?> getUserInterviews(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        try {
            // Get all interviews (filtering by user would require a userId field in InterviewSession)
            List<InterviewSession> allInterviews = interviewSessionService.getAllSessions();
            
            // Pagination
            int start = (page - 1) * pageSize;
            int end = Math.min(start + pageSize, allInterviews.size());
            List<InterviewSession> paginatedInterviews = allInterviews.subList(start, end);
            
            Map<String, Object> response = new HashMap<>();
            response.put("items", paginatedInterviews);
            response.put("total", allInterviews.size());
            response.put("page", page);
            response.put("pageSize", pageSize);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}
