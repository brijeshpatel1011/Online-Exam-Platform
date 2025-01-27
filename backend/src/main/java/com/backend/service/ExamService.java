package com.backend.service;

import com.backend.model.Exam;
import com.backend.model.MCQ;
import com.backend.model.ProgrammingQuestion;
import com.backend.repository.ExamRepository;
import com.backend.repository.ProgrammingQuestionRepository;
import com.backend.repository.MCQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private MCQRepository mcqRepository;

    @Autowired
    private ProgrammingQuestionRepository programmingQuestionRepository;

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Optional<Exam> getExamById(int examId) {
        return examRepository.findById(examId);
    }

    public Exam createExam(Exam exam) {
        int programmingQuestionsCount = 3;

        if (exam.getTotalQuestions() < programmingQuestionsCount) {
            throw new IllegalArgumentException("Total questions must be at least " + programmingQuestionsCount);
        }

        List<ProgrammingQuestion> selectedProgrammingQuestions =
                programmingQuestionRepository.findRandomProgrammingQuestions(programmingQuestionsCount);

        int mcqQuestionsCount = exam.getTotalQuestions() - programmingQuestionsCount;
        List<MCQ> selectedMCQs = mcqRepository.findRandomQuestions(mcqQuestionsCount);

        exam.setProgrammingQuestions(selectedProgrammingQuestions);
        exam.setMcqs(selectedMCQs);

        int totalMarks = selectedMCQs.stream().mapToInt(MCQ::getMarks).sum() +
                selectedProgrammingQuestions.stream().mapToInt(ProgrammingQuestion::getMarks).sum();
        exam.setTotalMarks(totalMarks);

        return examRepository.save(exam);
    }

    public Exam updateExam(int examId, Exam examDetails) {
        Exam existingExam = examRepository.findById(examId)
                .orElseThrow(() -> new IllegalArgumentException("Exam with ID " + examId + " does not exist."));

        existingExam.setTitle(examDetails.getTitle());
        existingExam.setDescription(examDetails.getDescription());
        existingExam.setTotalQuestions(examDetails.getTotalQuestions());
        existingExam.setPassingScore(examDetails.getPassingScore());
        existingExam.setCollege(examDetails.getCollege());
        existingExam.setDuration(examDetails.getDuration());
        existingExam.setExamStartDate(examDetails.getExamStartDate());
        existingExam.setExamStartTime(examDetails.getExamStartTime());
        existingExam.setExamEndDate(examDetails.getExamEndDate());
        existingExam.setExamEndTime(examDetails.getExamEndTime());

        int programmingQuestionsCount = 3;

        if (examDetails.getTotalQuestions() < programmingQuestionsCount) {
            throw new IllegalArgumentException("Total questions must be at least " + programmingQuestionsCount);
        }

        List<ProgrammingQuestion> selectedProgrammingQuestions =
                programmingQuestionRepository.findRandomProgrammingQuestions(programmingQuestionsCount);

        int mcqQuestionsCount = examDetails.getTotalQuestions() - programmingQuestionsCount;
        List<MCQ> selectedMCQs = mcqRepository.findRandomQuestions(mcqQuestionsCount);

        existingExam.setProgrammingQuestions(selectedProgrammingQuestions);
        existingExam.setMcqs(selectedMCQs);

        int totalMarks = selectedMCQs.stream().mapToInt(MCQ::getMarks).sum() +
                selectedProgrammingQuestions.stream().mapToInt(ProgrammingQuestion::getMarks).sum();
        existingExam.setTotalMarks(totalMarks);

        return examRepository.save(existingExam);
    }

    public void deleteExamById(int examId) {
        if (examRepository.existsById(examId)) {
            examRepository.deleteById(examId);
        } else {
            throw new IllegalArgumentException("Exam with ID " + examId + " does not exist.");
        }
    }

    public List<Exam> getExamsByCollege(String college) {
        return examRepository.findByCollege(college);
    }

    public List<Exam> getExamsByDateRange(LocalDate startDate, LocalDate endDate) {
        return examRepository.findByExamStartDateBetween(startDate, endDate);
    }
}



