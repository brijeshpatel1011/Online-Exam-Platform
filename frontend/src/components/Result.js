import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ChevronDown, ChevronUp, Clock, AlertCircle } from 'lucide-react';
import { getToken } from '../services/authService';

const Result = () => {
  const [examResults, setExamResults] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [examLogs, setExamLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [expandedCandidate, setExpandedCandidate] = useState(null);
  const [candidateDetails, setCandidateDetails] = useState(null);

  useEffect(() => {
    if (selectedExamId) {
      fetchExamResults(selectedExamId);
      fetchExamStatistics(selectedExamId);
      fetchExamLogs(selectedExamId);
    }
  }, [selectedExamId]);

  const fetchExamLogs = async (examId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/exam-logs/${examId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setExamLogs(response.data);
    } catch (err) {
      setError('Failed to fetch exam logs.');
    }
  };

  const fetchExamResults = async (examId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/results/exam/${examId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setExamResults(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch exam results.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCandidateDetails = async (examId, candidateId) => {
    try {
      const [detailsResponse, logsResponse] = await Promise.all([
        axios.get(
          `http://localhost:8080/api/results/exam/${examId}/candidate/${candidateId}`,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        ),
        axios.get(
          `http://localhost:8080/api/exam-logs/candidate/${candidateId}/exam/${examId}`,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        )
      ]);

      setCandidateDetails({
        ...detailsResponse.data,
        logs: logsResponse.data
      });
    } catch (err) {
      setError('Failed to fetch candidate details.');
    }
  };

  const fetchExamStatistics = async (examId) => {
    try {
      const [passingRateResponse, averageScoresResponse] = await Promise.all([
        axios.get(`http://localhost:8080/api/results/exam/${examId}/passing-rate`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
        axios.get(`http://localhost:8080/api/results/exam/${examId}/average-scores`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
      ]);

      setStatistics({
        passingRate: passingRateResponse.data,
        averageScores: averageScoresResponse.data,
      });
    } catch (err) {
      setError('Failed to fetch exam statistics.');
    }
  };

  const getExamFlagText = (flag) => {
    const flags = {
      1: 'Started',
      2: 'In Progress',
      3: 'Submission Started',
      4: 'Terminated',
      5: 'Passed',
      6: 'Failed'
    };
    return flags[flag] || 'Unknown';
  };

  const getExamFlagIcon = (flag) => {
    switch (flag) {
      case 1:
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 4:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const handleRowClick = async (candidateId) => {
    if (expandedCandidate === candidateId) {
      setExpandedCandidate(null);
      setCandidateDetails(null);
    } else {
      setExpandedCandidate(candidateId);
      await fetchCandidateDetails(selectedExamId, candidateId);
    }
  };

  const filteredResults = examResults.filter(
    (result) =>
      result.candidateId.toString().includes(searchTerm) ||
      result.examTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Exam Results</h2>
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={(e) => setSelectedExamId(e.target.value)}
          value={selectedExamId || ''}
        >
          <option value="">Select Exam</option>
          <option value="13">Exam ID: 13</option>
        </select>
      </div>

      {statistics.passingRate && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Passing Statistics</h3>
            <p>Total Candidates: {statistics.passingRate.totalCandidates}</p>
            <p>Passed Candidates: {statistics.passingRate.passedCandidates}</p>
            <p>Passing Rate: {statistics.passingRate.passingRate.toFixed(2)}%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Average Scores</h3>
            <p>MCQ Score: {statistics.averageScores.averageMcqScore.toFixed(2)}</p>
            <p>Programming Score: {statistics.averageScores.averageProgrammingScore.toFixed(2)}</p>
            <p>Total Score: {statistics.averageScores.averageTotalScore.toFixed(2)}</p>
          </div>
        </div>
      )}

      {error && <div className="bg-red-50 text-red-900 p-4 mb-4 rounded-md">{error}</div>}

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by candidate ID or exam title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-10 px-6 py-3"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidate Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exam Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exam Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">College</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Questions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">MCQ Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center">Loading...</td>
              </tr>
            ) : (
              filteredResults.map((result) => (
                <React.Fragment key={result.candidateId}>
                  <tr
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRowClick(result.candidateId)}
                  >
                    <td className="px-6 py-4">
                      {expandedCandidate === result.candidateId ?
                        <ChevronUp className="h-4 w-4" /> :
                        <ChevronDown className="h-4 w-4" />
                      }
                    </td>
                    <td className="px-6 py-4">{result.candidateName}</td>
                    <td className="px-6 py-4">{result.examTitle}</td>
                    <td className="px-6 py-4">{result.examDate}</td>
                    <td className="px-6 py-4">{result.examCollege}</td>
                    <td className="px-6 py-4">{result.totalQuestions}</td>
                    <td className="px-6 py-4">{result.mcqScore}</td>
                    <td className="px-6 py-4">{result.totalScore}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {result.passed ? 'Passed' : 'Failed'}
                      </span>
                    </td>
                  </tr>
                  {expandedCandidate === result.candidateId && candidateDetails && (
                    <tr>
                      <td colSpan="9" className="px-6 py-4 bg-gray-50">
                        <div className="space-y-4">
                          {/* Exam Logs Section */}
                          <div className="bg-white p-4 rounded-lg shadow mb-4">
                            <h4 className="text-lg font-medium mb-3">Exam Activity Log</h4>
                            <div className="space-y-2">
                              {candidateDetails.logs && candidateDetails.logs.map((log, index) => (
                                <div key={index} className="flex items-center space-x-2 text-sm">
                                  {getExamFlagIcon(log.examFlag)}
                                  <span className="text-gray-600">
                                    {new Date(log.timestamp).toLocaleString()}
                                  </span>
                                  <span className="font-medium">
                                    {getExamFlagText(log.examFlag)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-6">
                            {candidateDetails.programmingSolutions?.map((solution) => (
                              <div key={solution.questionId} className="bg-white p-4 rounded-lg shadow">
                                <div className="flex justify-between items-center mb-2">
                                  <h5 className="font-medium">{solution.questionTitle}</h5>
                                  <span className="text-sm text-gray-500">
                                    Submitted: {new Date(solution.submittedAt).toLocaleString()}
                                  </span>
                                </div>
                                <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                  <code>{solution.solutionCode}</code>
                                </pre>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Result;