import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, FileText, Edit, Trash2, Calendar } from 'lucide-react';
import { getToken } from '../services/authService';

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);
  const [editExamId, setEditExamId] = useState(null);
  const [form1Data, setform1Data] = useState({
    title: '',
    description: '',
    totalQuestions: '',
    passingScore: '',
    college: '',
    duration: '',
    examStartDate: '',
    examStartTime: '',
    examEndDate: '',
    examEndTime: '',
    totalMarks: ''
  });

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/exams`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setExams(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch exams');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditExamId(null);
    setform1Data({
      title: '',
      description: '',
      totalQuestions: '',
      passingScore: '',
      college: '',
      duration: '',
      examStartDate: '',
      examStartTime: '',
      examEndDate: '',
      examEndTime: '',
      totalMarks: ''
    });
    setShowExamModal(true);
  };

  const handleEdit = (exam) => {
    setEditExamId(exam.id);
    setform1Data({ ...exam });
    setShowExamModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editExamId) {
        await axios.put(
          `http://localhost:8080/api/exams/${editExamId}`,
          form1Data,
          {
            headers: { Authorization: `Bearer ${getToken()}` }
          }
        );
      } else {
        await axios.post(`http://localhost:8080/api/exams`, form1Data, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
      }
      setShowExamModal(false);
      fetchExams();
      setform1Data({
        title: '',
        description: '',
        totalQuestions: '',
        passingScore: '',
        college: '',
        duration: '',
        examStartDate: '',
        examStartTime: '',
        examEndDate: '',
        examEndTime: '',
        totalMarks: ''
      });
      setEditExamId(null);
      setError('');
    } catch (err) {
      setError(editExamId ? 'Failed to update exam' : 'Failed to add exam');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      try {
        await axios.delete(`http://localhost:8080/api/exams/${id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        fetchExams();
        setError('');
      } catch (err) {
        setError('Failed to delete exam');
      }
    }
  };

  const filterExamsByCollege = async (college) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/exams/college/${college}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setExams(response.data);
    } catch (err) {
      setError('Failed to filter exams by college');
    }
  };

  const filterExamsByDateRange = async (startDate, endDate) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/exams/date-range`, {
        params: { startDate, endDate },
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setExams(response.data);
    } catch (err) {
      setError('Failed to filter exams by date range');
    }
  };

  const ExamModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editExamId ? 'Edit Exam' : 'Add New Exam'}
          </h2>
          <button
            onClick={() => setShowExamModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={form1Data.title}
              onChange={(e) => setform1Data({ ...form1Data, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form1Data.description}
              onChange={(e) => setform1Data({ ...form1Data, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows="3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Questions</label>
              <input
                type="number"
                value={form1Data.totalQuestions}
                onChange={(e) => setform1Data({ ...form1Data, totalQuestions: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Passing Score</label>
              <input
                type="number"
                value={form1Data.passingScore}
                onChange={(e) => setform1Data({ ...form1Data, passingScore: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
              <input
                type="text"
                value={form1Data.college}
                onChange={(e) => setform1Data({ ...form1Data, college: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
              <input
                type="number"
                value={form1Data.duration}
                onChange={(e) => setform1Data({ ...form1Data, duration: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={form1Data.examStartDate}
                onChange={(e) => setform1Data({ ...form1Data, examStartDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input
                type="time"
                value={form1Data.examStartTime}
                onChange={(e) => setform1Data({ ...form1Data, examStartTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={form1Data.examEndDate}
                onChange={(e) => setform1Data({ ...form1Data, examEndDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input
                type="time"
                value={form1Data.examEndTime}
                onChange={(e) => setform1Data({ ...form1Data, examEndTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
            <input
              type="number"
              value={form1Data.totalMarks}
              onChange={(e) => setform1Data({ ...form1Data, totalMarks: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowExamModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : editExamId ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Exams</h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <FileText className="h-4 w-4 mr-2" />
          Add Exam
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-900 p-4 mb-4">{error}</div>
      )}

      <div className="flex space-x-4 mb-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search exams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex space-x-2">
          <select
            onChange={(e) => filterExamsByCollege(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Filter by College</option>
            <option value="BVM">BVM</option>
            <option value="LD">LD</option>
            <option value="Nirma">Nirma</option>
          </select>

          <button
            onClick={() => {
              const startDate = prompt('Enter start date (YYYY-MM-DD):');
              const endDate = prompt('Enter end date (YYYY-MM-DD):');
              if (startDate && endDate) {
                filterExamsByDateRange(startDate, endDate);
              }
            }}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                College
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">Loading...</td>
              </tr>
            ) : filteredExams.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">No exams found</td>
              </tr>
            ) : (
              filteredExams.map((exam) => (
                <tr key={exam.examId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{exam.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{exam.college}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{exam.examStartDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{exam.examEndDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{exam.examStartTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{exam.examEndTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(exam)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(exam.examId)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          </table>
          </div>

          {showExamModal && <ExamModal />}
          </div>
            );
          };

export default Exams;