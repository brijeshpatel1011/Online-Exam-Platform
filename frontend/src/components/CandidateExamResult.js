import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CandidateExamResult = () => {
  const { candidateExamId } = useParams();
  const [candidateExam, setCandidateExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCandidateExamResult = async () => {
      try {
        const response = await axios.get(`/api/exams/${candidateExamId}/detailed-result`);
        setCandidateExam(response.data);
      } catch (err) {
        setError('Failed to fetch candidate exam result');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateExamResult();
  }, [candidateExamId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!candidateExam) {
    return null;
  }

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-bold mb-6">Candidate Exam Result</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Candidate Name:</p>
            <p>{candidateExam.candidateName}</p>
          </div>
          <div>
            <p className="font-bold">Exam Name:</p>
            <p>{candidateExam.examName}</p>
          </div>
          <div>
            <p className="font-bold">Exam Type:</p>
            <p>{candidateExam.examType}</p>
          </div>
          <div>
            <p className="font-bold">Total Marks:</p>
            <p>{candidateExam.totalMarks}</p>
          </div>
          <div>
            <p className="font-bold">Passing Marks:</p>
            <p>{candidateExam.passingMarks}</p>
          </div>
          <div>
            <p className="font-bold">Obtained Marks:</p>
            <p>{candidateExam.obtainedMarks}</p>
          </div>
          <div>
            <p className="font-bold">Result:</p>
            <p className={`px-2 py-1 text-xs rounded-full ${
              candidateExam.status === 'PASSED'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {candidateExam.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateExamResult;