import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Code, Edit, Trash2 } from 'lucide-react';
import { getToken } from '../services/authService';

const ProgrammingQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editQuestionId, setEditQuestionId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    inputFormat: '',
    outputFormat: '',
    constraints: '',
    sampleInput: '',
    sampleOutput: '',
    difficulty: '',
    marks: ''
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/programming-questions`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setQuestions(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch programming questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditQuestionId(null);
    setFormData({
      title: '',
      description: '',
      inputFormat: '',
      outputFormat: '',
      constraints: '',
      sampleInput: '',
      sampleOutput: '',
      difficulty: '',
      marks: ''
    });
    setShowQuestionModal(true);
  };

  const handleEdit = (question) => {
    setEditQuestionId(question.id);
    setFormData({
      title: question.title,
      description: question.description,
      inputFormat: question.inputFormat,
      outputFormat: question.outputFormat,
      constraints: question.constraints,
      sampleInput: question.sampleInput,
      sampleOutput: question.sampleOutput,
      difficulty: question.difficulty,
      marks: question.marks
    });
    setShowQuestionModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editQuestionId) {
        await axios.put(
          `http://localhost:8080/api/programming-questions/${editQuestionId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${getToken()}` }
          }
        );
      } else {
        await axios.post(`http://localhost:8080/api/programming-questions`, formData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
      }
      setShowQuestionModal(false);
      fetchQuestions();
      setFormData({
        title: '',
        description: '',
        inputFormat: '',
        outputFormat: '',
        constraints: '',
        sampleInput: '',
        sampleOutput: '',
        difficulty: '',
        marks: ''
      });
      setEditQuestionId(null);
      setError('');
    } catch (err) {
      setError(editQuestionId ? 'Failed to update programming question' : 'Failed to add programming question');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this programming question?')) {
      try {
        await axios.delete(`http://localhost:8080/api/programming-questions/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        fetchQuestions();
        setError('');
      } catch (err) {
        setError('Failed to delete programming question');
      }
    }
  };

  const ProgrammingQuestionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editQuestionId ? 'Edit Programming Question' : 'Add New Programming Question'}
          </h2>
          <button
            onClick={() => setShowQuestionModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Input Format</label>
            <textarea
              value={formData.inputFormat}
              onChange={(e) => setFormData({ ...formData, inputFormat: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Output Format</label>
            <textarea
              value={formData.outputFormat}
              onChange={(e) => setFormData({ ...formData, outputFormat: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Constraints (Optional)</label>
            <textarea
              value={formData.constraints}
              onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sample Input</label>
            <textarea
              value={formData.sampleInput}
              onChange={(e) => setFormData({ ...formData, sampleInput: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sample Output</label>
            <textarea
              value={formData.sampleOutput}
              onChange={(e) => setFormData({ ...formData, sampleOutput: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marks</label>
            <input
              type="number"
              value={formData.marks}
              onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              min="1"
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
    question.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Programming Questions</h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Code className="h-4 w-4 mr-2" />
          Add Programming Question
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-900 p-4 mb-4">{error}</div>
      )}

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search programming questions..."
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sample Input</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sample Output</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredQuestions.map((question) => (
              <tr key={question.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{question.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500 ">{question.description}</td>
                <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{question.sampleInput}</td>
                <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{question.sampleOutput}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{question.difficulty}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{question.marks}</td>
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

      {showQuestionModal && <ProgrammingQuestionModal />}
    </div>
  );
};

export default ProgrammingQuestions;