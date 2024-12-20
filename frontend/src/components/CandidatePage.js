import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

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

  const candidateId = localStorage.getItem('candidateId');

  useEffect(() => {
    if (!candidateId) {
      navigate('/login');
      return;
    }
    fetchExams();
  }, [candidateId, navigate]);

  useEffect(() => {
    const handleCopyPaste = (e) => e.preventDefault();
    const handleContextMenu = (e) => e.preventDefault();
    const handleDragStart = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ['c', 'v', 'x', 'a'].includes(e.key.toLowerCase())
      ) {
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

 const fetchExams = async () => {
   try {
     const token = localStorage.getItem('token');
     const candidateId = localStorage.getItem('candidateId');

     if (!candidateId) {
       throw new Error('Candidate ID missing. Please log in again.');
     }

     const candidateResponse = await fetch(`http://localhost:8080/api/examiner/candidate/${candidateId}`, {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json',
       },
     });

     if (!candidateResponse.ok) throw new Error('Failed to fetch candidate details');

     const candidateData = await candidateResponse.json();
     const userCollege = candidateData.college;

     console.log(userCollege);

     if (!userCollege) {
       throw new Error('College information missing. Please contact support.');
     }

     const examResponse = await fetch(`http://localhost:8080/api/exams/college/${userCollege}`, {
       headers: {
         'Authorization': `Bearer ${token}`,
       },
     });

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
        options: [mcq.optionA, mcq.optionB, mcq.optionC, mcq.optionD]
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

      setExamStarted(false);
      setCurrentQuestionIndex(0);
      setAnswers({});
    } catch (error) {
      console.error('Error fetching exam details:', error);
      setError('Failed to load exam details');
    }
  };

  const startExam = () => {
    if (!selectedExam) return;

    const examDateTime = new Date(`${selectedExam.examStartDate}T${selectedExam.examStartTime}`);
    const currentDate = new Date();

    if (examDateTime > currentDate) {
      alert('This exam has not started yet.');
      return;
    }

    setExamStarted(true);
    const allQuestions = [...selectedExam.mcqs, ...selectedExam.programmingQuestions];
    setCurrentQuestion(allQuestions[0]);
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

    const allQuestions = [...selectedExam.mcqs, ...selectedExam.programmingQuestions];
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setCurrentQuestion(allQuestions[currentQuestionIndex - 1]);
    }
  };

   const handleAnswerSubmit = (answer) => {
      if (!currentQuestion) return;

      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: answer,
      }));
    };

    const submitExam = async () => {
      const token = localStorage.getItem('token');
      const mcqAnswers = Object.entries(answers)
        .filter(([_, value]) => typeof value === 'string')
        .map(([questionId, answer]) => {
          const mcqQuestion = selectedExam.mcqs.find(mcq => mcq.id === parseInt(questionId));

          if (!mcqQuestion) {
            console.error(`MCQ question with ID ${questionId} not found.`);
            return null;
          }

          const isCorrect = mcqQuestion.correctOption === answer;

          return {
            candidateId,
            examId: selectedExam.examId,
            questionId,
            selectedOption: answer,
            isCorrect,
          };
        })
        .filter(answer => answer !== null);

      const programmingAnswers = Object.entries(answers)
        .filter(([_, value]) => typeof value !== 'string')
        .map(([questionId, answer]) => ({
          candidateId,
          examId: selectedExam.examId,
          questionId,
          solutionCode: answer,
        }));

      try {
        const response = await fetch(`http://localhost:8080/api/answers/submit`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ candidateId, examId: selectedExam.examId, mcqAnswers, programmingAnswers }),
        });

        if (!response.ok) throw new Error('Failed to submit exam');
        alert('Exam submitted successfully!');
        navigate('/results');
      } catch (error) {
        console.error('Error submitting exam:', error);
        alert('Error submitting exam');
      }
    };


  const formatDateTime = (date, time) => {
    try {
      return new Date(`${date}T${time}`).toLocaleString();
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
                  value={option}
                  checked={answers[currentQuestion.id] === option}
                  onChange={() => handleAnswerSubmit(option)}
                  className="h-4 w-4"
                />
                <label htmlFor={`option-${index}`} className="ml-2">{option}</label>
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
          <textarea
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswerSubmit(e.target.value)}
            className="w-full h-48 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your code here..."
          />
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
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
        <div className="space-y-4">
          {!selectedExam ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exams.map((exam) => (
                <div
                  key={exam.examId}
                  className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer bg-white"
                  onClick={() => handleExamSelect(exam.examId)}
                >
                  <h2 className="text-xl font-semibold mb-2">{exam.title}</h2>
                  <p className="text-gray-600">Start: {formatDateTime(exam.examStartDate, exam.examStartTime)}</p>
                  <p className="text-gray-600">End: {formatDateTime(exam.examEndDate, exam.examEndTime)}</p>
                  <p className="text-gray-600">Duration: {exam.duration} minutes</p>
                  <p className="text-gray-600">Total Questions: {exam.totalQuestions}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-lg p-6 bg-white shadow">
              <h2 className="text-xl font-semibold mb-4">{selectedExam.title}</h2>
              <p className="mb-2">Duration: {selectedExam.duration} minutes</p>
              <p className="mb-2">Total Questions: {selectedExam.totalQuestions}</p>
              <p className="mb-2">Total Marks: {selectedExam.totalMarks}</p>
              <p className="mb-4">Passing Score: {selectedExam.passingScore}</p>
              <button
                onClick={startExam}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Start Exam
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="border rounded-lg p-6 bg-white shadow">
          {renderQuestion()}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded ${
                currentQuestionIndex === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
            >
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === (selectedExam?.mcqs.length + selectedExam?.programmingQuestions.length - 1)}
              className={`px-4 py-2 rounded ${
                currentQuestionIndex === (selectedExam?.mcqs.length + selectedExam?.programmingQuestions.length - 1)
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
            >
              Next
            </button>
          </div>
           <button onClick={submitExam} className="btn btn-primary mt-4">Submit Exam</button>
        </div>
      )}
    </div>
  );
};

export default CandidatePage;
