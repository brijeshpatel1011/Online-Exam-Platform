import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, FileText, Edit, Trash2 } from 'lucide-react';
import { getToken } from '../services/authService';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState(null);
  const [form1Data, setform1Data] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
    difficultyLevel: '',
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/mcq/`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setQuestions(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditQuestionId(null);
    setform1Data({
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
      difficultyLevel: '',
    });
    setShowQuestionModal(true);
  };

  const handleEdit = (question) => {
    setEditQuestionId(question.id);
    setform1Data({
      question: question.question,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctAnswer: question.correctAnswer,
      difficultyLevel: question.difficultyLevel,
    });
    setShowQuestionModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editQuestionId) {
        await axios.put(
          `http://localhost:8080/api/mcq/update/${editQuestionId}`,
          form1Data,
          {
            headers: { Authorization: `Bearer ${getToken()}` }
          }
        );
      } else {
        await axios.post(`http://localhost:8080/api/mcq/add`, form1Data, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
      }
      setShowQuestionModal(false);
      fetchQuestions();
      setform1Data({
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: '',
        difficultyLevel: '',
      });
      setEditQuestionId(null);
      setError('');
    } catch (err) {
      setError(editQuestionId ? 'Failed to update question' : 'Failed to add question');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await axios.delete(`http://localhost:8080/api/mcq/delete/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        fetchQuestions();
        setError('');
      } catch (err) {
        setError('Failed to delete question');
      }
    }
  };

  const QuestionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editQuestionId ? 'Edit Question' : 'Add New Question'}
          </h2>
          <button
            onClick={() => setShowQuestionModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-1">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
            <input
              type="text"
              value={form1Data.question}
              onChange={(e) => setform1Data({ ...form1Data, question: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Option A</label>
            <input
              type="text"
              value={form1Data.optionA}
              onChange={(e) => setform1Data({ ...form1Data, optionA: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Option B</label>
            <input
              type="text"
              value={form1Data.optionB}
              onChange={(e) => setform1Data({ ...form1Data, optionB: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Option C</label>
            <input
              type="text"
              value={form1Data.optionC}
              onChange={(e) => setform1Data({ ...form1Data, optionC: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Option D</label>
            <input
              type="text"
              value={form1Data.optionD}
              onChange={(e) => setform1Data({ ...form1Data, optionD: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer</label>
            <input
              type="text"
              value={form1Data.correctAnswer}
              onChange={(e) => setform1Data({ ...form1Data, correctAnswer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
            <input
              type="text"
              value={form1Data.difficultyLevel}
              onChange={(e) => setform1Data({ ...form1Data, difficultyLevel: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowQuestionModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : editQuestionId ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Questions</h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <FileText className="h-4 w-4 mr-2" />
          Add Question
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-900 p-4 mb-4">{error}</div>
      )}

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Options</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Correct Answer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredQuestions.map((question) => (
              <tr key={question.id}>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {question.question}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  A: {question.optionA}, B: {question.optionB}, C: {question.optionC}, D: {question.optionD}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {question.correctAnswer}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {question.difficultyLevel}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(question)}
                    className="text-green-600 hover:text-green-900 mr-2"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(question.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showQuestionModal && <QuestionModal />}
    </div>
  );
};

export default Questions;