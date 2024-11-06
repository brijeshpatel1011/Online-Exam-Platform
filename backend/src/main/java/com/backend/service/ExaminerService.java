package com.backend.service;

import com.backend.model.Candidate;
import com.backend.repository.CandidateRepository;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;


@Service
public class ExaminerService {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerCandidate(Candidate candidate) {
        if (candidateRepository.findByEmail(candidate.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Candidate with this email already exists.");
        }
        candidate.setPassword(passwordEncoder.encode(candidate.getPassword()));
        candidateRepository.save(candidate);
    }

    public void deleteCandidate(Long cId) {
        if (!candidateRepository.existsById(cId)) {
            throw new IllegalArgumentException("Candidate with ID " + cId + " does not exist.");
        }
        candidateRepository.deleteById(cId);
    }

    public Candidate updateCandidate(Long candidateId, Candidate updatedCandidate) {
        Candidate existingCandidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new IllegalArgumentException("candidate not found"));

                existingCandidate.setName(updatedCandidate.getName());
                existingCandidate.setCollege(updatedCandidate.getCollege());
                existingCandidate.setEmail(updatedCandidate.getEmail());
                existingCandidate.setPhone(updatedCandidate.getPhone());
                existingCandidate.setBirthdate(updatedCandidate.getBirthdate());
                existingCandidate.setPassword(passwordEncoder.encode(updatedCandidate.getPassword()));

            return candidateRepository.saveAndFlush(existingCandidate);
        }

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public List<Candidate> getCandidatesByCollege(String college) {
        return candidateRepository.findByCollege(college);
    }

    public void registerCandidatesFromFile(MultipartFile file) throws IOException {
        try (Workbook workbook = WorkbookFactory.create(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);

            int rowNum = 1;
            for (Row row : sheet) {
                if (rowNum > 0) {
                    try {
                        Candidate candidate = new Candidate();

                        candidate.setName(getStringValue(row.getCell(0)));
                        candidate.setCollege(getStringValue(row.getCell(1)));
                        candidate.setEmail(getStringValue(row.getCell(2)));
                        candidate.setPhone(getStringValue(row.getCell(3)));

                        Cell dateCell = row.getCell(4);
                        if (dateCell != null) {
                            candidate.setBirthdate(dateCell.getDateCellValue());
                        }

                        candidate.setPassword(getStringValue(row.getCell(5)));

                        if (isValidCandidate(candidate)) {
                            candidate.setPassword(passwordEncoder.encode(candidate.getPassword()));
                            candidateRepository.save(candidate);
                        }
                    } catch (Exception e) {
                        System.err.println("Error processing row " + rowNum + ": " + e.getMessage());
                    }
                }
                rowNum++;
            }
        }
    }

    private String getStringValue(Cell cell) {
        if (cell == null) {
            return "";
        }
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                return String.valueOf((long) cell.getNumericCellValue());
            default:
                return "";
        }
    }

    private boolean isValidCandidate(Candidate candidate) {
        return candidate.getName() != null && !candidate.getName().isEmpty() &&
                candidate.getEmail() != null && !candidate.getEmail().isEmpty() &&
                candidate.getPassword() != null && candidate.getPassword().length() >= 6;
    }
}

