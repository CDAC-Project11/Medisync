package com.medisync.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.medisync.backend.entity.Feedback;
import com.medisync.backend.exception.ResourceNotFoundException;
import com.medisync.backend.repository.FeedbackRepository;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    // ADD
    public Feedback addFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    // GET ALL
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    // GET BY ID
    public Feedback getFeedbackById(Long id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Feedback not found with id " + id));
    }

    // GET BY PATIENT
    public List<Feedback> getFeedbackByPatientId(Long patientId) {
        return feedbackRepository.findByPatientId(patientId);
    }

    // DELETE
    public void deleteFeedback(Long id) {
        Feedback feedback = getFeedbackById(id);
        feedbackRepository.delete(feedback);
    }
}
