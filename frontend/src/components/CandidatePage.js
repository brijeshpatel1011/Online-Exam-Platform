import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

import ProgrammingQuestionEditor from './ProgrammingQuestionEditor';

const CandidatePage = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [examStarted, setExamStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [examTimer, setExamTimer] = useState(null);
  const [warningShown, setWarningShown] = useState(false);

  const candidateId = localStorage.getItem('candidateId');

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const handleCopyPaste = (e) => e.preventDefault();
    const handleContextMenu = (e) => e.preventDefault();
    const handleDragStart = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x', 'a'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };

    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('cut', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('cut', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!candidateId) {
      navigate('/login');
      return;
    }
    fetchExams();
  }, [candidateId, navigate]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [navigate]);


const submitExam = useCallback(async (isAutoSubmit = false) => {
  try {
    const token = localStorage.getItem('token');
    const candidateId = localStorage.getItem('candidateId');
    if (!token || !candidateId) {
      alert('Session expired. Please login again.');
      handleLogout();
      return;
    }

    const mcqAnswers = selectedExam.mcqs
      .map(mcq => ({
        question: { id: mcq.id },
        selectedOption: answers[mcq.id] || ''
      }))
      .filter(answer => answer.selectedOption !== '');

    const programmingAnswers = selectedExam.programmingQuestions
      .map(q => ({
        question: { id: q.id },
        solutionCode: answers[q.id] || ''
      }))
      .filter(answer => answer.solutionCode !== '');

    const timeSpent = selectedExam.duration * 60 - examTimer;
    const url = `http://localhost:8080/api/answers/submit?candidateId=${candidateId}&examId=${selectedExam.examId}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mcqAnswers,
        programmingAnswers,
        isAutoSubmit,
        timeSpent
      })
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 403 || response.status === 401) {
        throw new Error('Session expired');
      }
      throw new Error(result.message || 'Failed to submit exam');
    }

    const successModal = document.createElement('div');
    successModal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      text-align: center;
      min-width: 300px;
    `;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
    `;

    successModal.innerHTML = `
      <h2 style="color: #059669; font-size: 1.5rem; margin-bottom: 1rem;">✅ Exam Submitted Successfully!</h2>
      <p style="color: #374151; margin-bottom: 1.5rem;">${
        isAutoSubmit
          ? 'Your exam has been auto-submitted due to time completion or tab change.'
          : 'Your exam has been submitted successfully.'
      }</p>
      <button onClick={handleLogout} style="
        background: #059669;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        border: none;
        cursor: pointer;
      ">Okay</button>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(successModal);

    const continueButton = successModal.querySelector('button');
    continueButton.onclick = () => {
      document.body.removeChild(overlay);
      document.body.removeChild(successModal);
      navigate('/candidate-login');
    };

  } catch (error) {
    console.error('Error submitting exam:', error);
    if (error.message.includes('Session expired') || error.message.includes('Unauthorized')) {
      alert('Session expired. Please login again.');
      handleLogout();
    } else if (isAutoSubmit) {
      alert('Auto-submission failed. Please retry.');
    } else {
      alert(error.message || 'Failed to submit exam');
    }
  }
}, [selectedExam, answers, examTimer, navigate, handleLogout]);


  useEffect(() => {
    const handleVisibilityChange = () => {
      if (examStarted && document.visibilityState === 'hidden') {
        submitExam(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [examStarted, submitExam]);



  const fetchExams = async () => {
    try {
      const token = localStorage.getItem('token');
      const candidateId = localStorage.getItem('candidateId');

      if (!candidateId) {
        throw new Error('Candidate ID missing. Please log in again.');
      }

      const candidateResponse = await fetch(
        `http://localhost:8080/api/examiner/candidate/${candidateId}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!candidateResponse.ok) throw new Error('Failed to fetch candidate details');

      const candidateData = await candidateResponse.json();
      const userCollege = candidateData.college;

      if (!userCollege) {
        throw new Error('College information missing. Please contact support.');
      }

      const examResponse = await fetch(
        `http://localhost:8080/api/exams/college/${userCollege}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!examResponse.ok) throw new Error('Failed to fetch exams');

      const examsData = await examResponse.json();
      const currentDate = new Date();

      const scheduledExams = examsData.filter(exam => {
        const examStart = new Date(`${exam.examStartDate}T${exam.examStartTime}`);
        const examEnd = new Date(`${exam.examEndDate}T${exam.examEndTime}`);
        return examStart <= currentDate && examEnd >= currentDate;
      });

      setExams(scheduledExams);
    } catch (error) {
      console.error('Error fetching exams:', error);
      setError(error.message || 'Failed to load exams');
    } finally {
      setLoading(false);
    }
  };

  const handleExamSelect = async (examId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/exams/${examId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch exam details');
      const examData = await response.json();

      const transformedMcqs = examData.mcqs.map(mcq => ({
        id: mcq.id,
        question: mcq.question,
        options: [
          { value: mcq.optionA, label: 'A' },
          { value: mcq.optionB, label: 'B' },
          { value: mcq.optionC, label: 'C' },
          { value: mcq.optionD, label: 'D' }
        ]
      }));

      const transformedProgrammingQuestions = examData.programmingQuestions.map(q => ({
        id: q.id,
        question: `${q.title}\n\n${q.description}\n\nInput Format: ${q.inputFormat}\nOutput Format: ${q.outputFormat}\nConstraints: ${q.constraints}\n\nSample Input: ${q.sampleInput}\nSample Output: ${q.sampleOutput}`
      }));

      setSelectedExam({
        ...examData,
        mcqs: transformedMcqs,
        programmingQuestions: transformedProgrammingQuestions
      });

      setCurrentQuestionIndex(0);
      setAnswers({});
    } catch (error) {
      console.error('Error fetching exam details:', error);
      setError('Failed to load exam details');
    }
  };

  const startExam = () => {
    if (!selectedExam) return;

    const examStartDateTime = new Date(`${selectedExam.examStartDate}T${selectedExam.examStartTime}`);
    const examEndDateTime = new Date(`${selectedExam.examEndDate}T${selectedExam.examEndTime}`);
    const currentDateTime = new Date();

    if (examStartDateTime > currentDateTime) {
      alert('This exam has not started yet.');
      return;
    }

    const remainingTimeInSeconds = Math.floor((examEndDateTime - currentDateTime) / 1000);
    const maxExamTimeInSeconds = selectedExam.duration * 60;

    const actualTimeInSeconds = Math.min(remainingTimeInSeconds, maxExamTimeInSeconds);

    if (actualTimeInSeconds <= 0) {
      alert('This exam has ended.');
      return;
    }

    const confirmed = window.confirm(
      'Important Instructions:\n\n' +
      '1. Do not switch tabs or windows during the exam\n' +
      '2. The exam will auto-submit if you switch tabs\n' +
      '3. The exam will auto-submit when the time is up\n' +
      `4. You have ${Math.ceil(actualTimeInSeconds / 60)} minutes to complete the exam\n\n` +
      'Are you ready to start?'
    );

    if (confirmed) {
      setExamStarted(true);
      setWarningShown(false);
      setExamTimer(actualTimeInSeconds);
      const allQuestions = [...selectedExam.mcqs, ...selectedExam.programmingQuestions];
      setCurrentQuestion(allQuestions[0]);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedExam) return;

    const allQuestions = [...selectedExam.mcqs, ...selectedExam.programmingQuestions];
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentQuestion(allQuestions[currentQuestionIndex + 1]);
    }
  };

  const handlePreviousQuestion = () => {
    if (!selectedExam) return;

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      const allQuestions = [...selectedExam.mcqs, ...selectedExam.programmingQuestions];
      setCurrentQuestion(allQuestions[currentQuestionIndex - 1]);
    }
  };

  const handleAnswerSubmit = (answer, optionLabel = null) => {
    if (!currentQuestion) return;

    if ('options' in currentQuestion) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: optionLabel
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: answer
      }));
    }
  };

  const formatDateTime = (date, time) => {
    try {
      return new Date(`${date}T${time}`).toLocaleString();
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const renderTimer = () => {
    if (!examTimer && !examStarted) return null;

    const timeColor = examTimer <= 300 ? 'text-red-600' : 'text-green-600';

    return (
      <div className={`fixed top-4 right-4 p-4 bg-white rounded-lg shadow-lg ${timeColor} font-bold text-xl`}>
        Time Remaining: {formatTime(examTimer)}
      </div>
    );
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    if ('options' in currentQuestion) {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Question {currentQuestionIndex + 1}</h3>
          <p className="whitespace-pre-wrap">{currentQuestion.question}</p>
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="mcq-answer"
                  value={option.value}
                  checked={answers[currentQuestion.id] === option.label}
                  onChange={() => handleAnswerSubmit(option.value, option.label)}
                  className="h-4 w-4"
                />
                <label htmlFor={`option-${index}`} className="ml-2">
                  {option.label}. {option.value}
                </label>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
         <div className="space-y-4">
           <h3 className="text-lg font-semibold">Programming Question {currentQuestionIndex + 1}</h3>
           <p className="whitespace-pre-wrap">{currentQuestion.question}</p>
           <ProgrammingQuestionEditor
             value={answers[currentQuestion.id] || ''}
             onChange={(value) => handleAnswerSubmit(value)}
           />
         </div>
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      {renderTimer()}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Candidate Dashboard</h1>
        <button
          onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <p>Loading exams...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : !examStarted ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Available Exams</h2>
            {exams.length === 0 ? (
              <p>No exams are currently available.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {exams.map((exam) => (
                  <div
                    key={exam.examId}
                    className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold">{exam.examName}</h3>
                    <p>Duration: {exam.duration} minutes</p>
                    <p>Start: {formatDateTime(exam.examStartDate, exam.examStartTime)}</p>
                    <p>End: {formatDateTime(exam.examEndDate, exam.examEndTime)}</p>
                    <button
                      onClick={() => handleExamSelect(exam.examId)}
                      className={`mt-2 px-4 py-2 rounded ${
                        selectedExam?.examId === exam.examId
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedExam && (
              <div className="mt-6 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Selected Exam: {selectedExam.examName}</h3>
                <p>Total Questions: {selectedExam.mcqs.length + selectedExam.programmingQuestions.length}</p>
                <p>MCQs: {selectedExam.mcqs.length}</p>
                <p>Programming Questions: {selectedExam.programmingQuestions.length}</p>
                <button
                  onClick={startExam}
                  className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                  Start Exam
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              {renderQuestion()}

              <div className="mt-6 flex justify-between">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-4 py-2 rounded ${
                    currentQuestionIndex === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Previous
                </button>

                {currentQuestionIndex === selectedExam.mcqs.length + selectedExam.programmingQuestions.length - 1 ? (
                  <button
                    onClick={() => submitExam(false)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Submit Exam
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-8 gap-2">
              {[...selectedExam.mcqs, ...selectedExam.programmingQuestions].map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentQuestionIndex(index);
                    setCurrentQuestion([...selectedExam.mcqs, ...selectedExam.programmingQuestions][index]);
                  }}
                  className={`p-2 rounded ${
                    currentQuestionIndex === index
                      ? 'bg-blue-500 text-white'
                      : answers[[...selectedExam.mcqs, ...selectedExam.programmingQuestions][index].id]
                      ? 'bg-green-200'
                      : 'bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  export default CandidatePage;