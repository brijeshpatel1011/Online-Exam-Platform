package com.backend.service;

import com.backend.model.ExamResult;
import com.backend.model.ProgrammingAnswer;
import com.backend.repository.ExamResultRepository;
import com.backend.repository.ProgrammingAnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExamResultsService {

    @Autowired
    private ExamResultRepository examResultRepository;

    @Autowired
    private ProgrammingAnswerRepository programmingAnswerRepository;

    public Map<String, Object> getExamPassingRate(Integer examId) {
        List<ExamResult> results = examResultRepository.findByExam_ExamId(examId);
        long totalCandidates = results.size();
        long passedCandidates = results.stream().filter(ExamResult::getPassed).count();

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("totalCandidates", totalCandidates);
        resultMap.put("passedCandidates", passedCandidates);
        resultMap.put("passingRate", totalCandidates > 0 ? (double) passedCandidates / totalCandidates * 100 : 0);
        return resultMap;
    }

    public Map<String, Double> getExamAverageScores(Integer examId) {
        List<ExamResult> results = examResultRepository.findByExam_ExamId(examId);

        double avgMcqScore = results.stream()
                .mapToInt(ExamResult::getMcqScore)
                .average()
                .orElse(0.0);

        double avgProgrammingScore = results.stream()
                .mapToDouble(ExamResult::getProgrammingScore)
                .average()
                .orElse(0.0);

        double avgTotalScore = results.stream()
                .mapToDouble(ExamResult::getTotalScore)
                .average()
                .orElse(0.0);

        Map<String, Double> scores = new HashMap<>();
        scores.put("averageMcqScore", avgMcqScore);
        scores.put("averageProgrammingScore", avgProgrammingScore);
        scores.put("averageTotalScore", avgTotalScore);
        return scores;
    }

    public List<Map<String, Object>> getAllExamsStatistics() {
        List<Integer> distinctExamIds = examResultRepository.findDistinctExamIds();
        List<Map<String, Object>> statistics = new ArrayList<>();

        for (Integer examId : distinctExamIds) {
            Map<String, Object> examStats = new HashMap<>();
            examStats.put("examId", examId);

            Map<String, Object> statsData = new HashMap<>();
            statsData.put("passingRate", getExamPassingRate(examId));
            statsData.put("averageScores", getExamAverageScores(examId));

            examStats.put("statistics", statsData);
            statistics.add(examStats);
        }
        return statistics;
    }

    public List<Map<String, Object>> getCandidatePerformance(Integer examId) {
        List<ExamResult> results = examResultRepository.findByExam_ExamId(examId);

        Map<Long, List<ProgrammingAnswer>> programmingAnswersMap = programmingAnswerRepository
                .findByExam_ExamId(examId)
                .stream()
                .collect(Collectors.groupingBy(answer -> answer.getCandidate().getCId()));

        return results.stream().map(result -> {
            Map<String, Object> performanceMap = new HashMap<>();

            performanceMap.put("candidateId", result.getCandidate().getCId());
            performanceMap.put("candidateName", result.getCandidate().getName());
            performanceMap.put("examTitle", result.getExam().getTitle());
            performanceMap.put("examCollege", result.getExam().getCollege());
            performanceMap.put("examDate", result.getExam().getExamStartDate());
            performanceMap.put("passingScore", result.getExam().getPassingScore());

            performanceMap.put("totalScore", result.getTotalScore());
            performanceMap.put("mcqScore", result.getMcqScore());
            performanceMap.put("programmingScore", result.getProgrammingScore());

            performanceMap.put("passed", result.getPassed());
            performanceMap.put("submittedAt", result.getSubmittedAt());
            performanceMap.put("correctAnswers", result.getCorrectAnswers());
            performanceMap.put("totalQuestions", result.getTotalQuestions());

            List<Map<String, Object>> programmingSolutions = new ArrayList<>();
            List<ProgrammingAnswer> candidateAnswers = programmingAnswersMap
                    .getOrDefault(result.getCandidate().getCId(), new ArrayList<>());

            for (ProgrammingAnswer answer : candidateAnswers) {
                Map<String, Object> solution = new HashMap<>();
                solution.put("questionId", answer.getQuestion().getId());
                solution.put("questionTitle", answer.getQuestion().getTitle());
                solution.put("solutionCode", answer.getSolutionCode());
                solution.put("submittedAt", answer.getSubmittedAt());
                programmingSolutions.add(solution);
            }
            performanceMap.put("programmingSolutions", programmingSolutions);

            return performanceMap;
        }).collect(Collectors.toList());
    }

    public Map<String, Object> getCandidateExamDetail(Integer examId, Long candidateId) {
        List<ExamResult> results = examResultRepository.findByExam_ExamIdAndCandidate_cId(examId, candidateId);
        if (results.isEmpty()) {
            throw new RuntimeException("Result not found for candidate " + candidateId + " in exam " + examId);
        } else if (results.size() > 1) {
            throw new RuntimeException("Multiple results found for candidate " + candidateId + " in exam " + examId);
        }
        ExamResult result = results.get(0);


        List<ProgrammingAnswer> programmingAnswers = programmingAnswerRepository
                .findByExam_ExamIdAndCandidate_cId(examId, candidateId);

        Map<String, Object> detailedResult = new HashMap<>();

        detailedResult.put("candidateId", candidateId);
        detailedResult.put("candidateName", result.getCandidate().getName());
        detailedResult.put("examTitle", result.getExam().getTitle());
        detailedResult.put("passingScore", result.getExam().getPassingScore());

        detailedResult.put("totalScore", result.getTotalScore());
        detailedResult.put("mcqScore", result.getMcqScore());
        detailedResult.put("programmingScore", result.getProgrammingScore());

        detailedResult.put("passed", result.getPassed());
        detailedResult.put("submittedAt", result.getSubmittedAt());

        List<Map<String, Object>> solutions = programmingAnswers.stream().map(answer -> {
            Map<String, Object> solution = new HashMap<>();
            solution.put("questionId", answer.getQuestion().getId());
            solution.put("questionTitle", answer.getQuestion().getTitle());
            solution.put("solutionCode", answer.getSolutionCode());
            solution.put("submittedAt", answer.getSubmittedAt());
            return solution;
        }).collect(Collectors.toList());

        detailedResult.put("programmingSolutions", solutions);

        return detailedResult;
    }
}
