package com.medisync.notification_service.controller;

import com.medisync.notification_service.entity.Notification;
import com.medisync.notification_service.repository.NotificationRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationRepository repo;

    public NotificationController(NotificationRepository repo) {
        this.repo = repo;
    }

    // 🔔 Get my notifications
    @GetMapping
    public List<Notification> getMyNotifications(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        return repo.findByUserIdOrderByCreatedAtDesc(userId);
    }

    // 🔔 Create notification (internal services)
    @PostMapping
    public Notification create(@RequestBody Notification notification) {
        return repo.save(notification);
    }
}
