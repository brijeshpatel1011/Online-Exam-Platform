import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, UserPlus, Users, FileText, LogOut, Filter, Trash2, Edit } from 'lucide-react';
import { getToken, logout } from '../services/authService';
import Exam from '../components/Exam';
import Questions from '../components/Questions';

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('candidates');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editCandidateId, setEditCandidateId] = useState(null);
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    phone: '',
    birthdate:'',
    password: ''
  });

  useEffect(() => {
    fetchCandidates();
  }, [selectedCollege]);

const fetchCandidates = async () => {
  setLoading(true);
  try {
    const token = getToken();
    const endpoint = selectedCollege === 'all'
      ? `http://localhost:8080/api/examiner/candidates`
      : `http://localhost:8080/api/examiner/candidates/college/${selectedCollege}`;

    const response = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.status === 200) {
      setCandidates(response.data);
    } else {
      setError('Failed to fetch candidates');
    }
  } catch (err) {
    setError('Failed to fetch candidates');
    console.error(err);
  } finally {
    setLoading(false);
  }
};

const handleEdit = (candidate) => {
  setEditCandidateId(candidate.cid);
  setFormData({
    name: candidate.name,
    email: candidate.email,
    college: candidate.college,
    phone: candidate.phone,
    birthdate: candidate.birthdate,
    password: ''
  });
  setShowRegisterModal(true);
};

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editCandidateId) {
        await axios.put(`http://localhost:8080/api/examiner/update/candidate/${editCandidateId}`, formData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
      } else {
        await axios.post(`http://localhost:8080/api/examiner/register/candidate`, formData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
      }
      setShowRegisterModal(false);
      fetchCandidates();
      setFormData({ name: '', email: '', college: '', phone: '', birthdate: '', password: '' });
      setEditCandidateId(null);
      setError('');
    } catch (err) {
      setError(editCandidateId ? 'Failed to update candidate' : 'Failed to register candidate');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cid) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await axios.delete(`http://localhost:8080/api/examiner/delete/candidate/${cid}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        fetchCandidates();
        setError('');
      } catch (err) {
        setError('Failed to delete candidate');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const RegisterModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Register New Candidate</h2>
          <button
            onClick={() => setShowRegisterModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              College
            </label>
            <input
              type="text"
              value={formData.college}
              onChange={(e) => setFormData({...formData, college: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Birth Date
            </label>
            <input
              type="date"
              value={formData.birthdate}
              onChange={(e) =>
                setFormData({ ...formData, birthdate: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowRegisterModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );


  const handleFileUpload = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        await axios.post(`http://localhost:8080/api/examiner/register/candidates`, formData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        setFile(null);
        fetchCandidates();
        setError('');
      } catch (err) {
        setError('Failed to upload candidates file');
      } finally {
        setLoading(false);
      }
    };


  return (
    <div className="min-h-screen bg-gray-50">
      {error && (
        <div className="bg-red-50 text-red-900 p-4 mb-4">
          {error}
        </div>
      )}

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          <div className="w-64 space-y-2">
            <button
              onClick={() => setActiveTab('candidates')}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'candidates'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="h-4 w-4 mr-3" />
              Candidates
            </button>
            <button
              onClick={() => setActiveTab('Questions')}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'Questions'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="h-4 w-4 mr-3" />
              Questions
            </button>
            <button
              onClick={() => setActiveTab('Exams')}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'Exams'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="h-4 w-4 mr-3" />
              Exams
            </button>

          </div>

          <div className="flex-1 bg-white rounded-lg shadow">
            {activeTab === 'candidates' && (
              <div className="p-6">
                <div className="flex justify-between mb-6">
                  <div className="flex space-x-4">

                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search candidates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </button>
                  </div>

                    <label htmlFor="file-upload" className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Upload Candidates
                    </label>
                    <input
                       id="file-upload"
                       type="file"
                       onChange={(e) => setFile(e.target.files[0])}
                       className="hidden"
                    />
                    {file && (
                    <button
                      onClick={handleFileUpload}
                      disabled={loading}
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                    {loading ? 'Uploading...' : 'Upload'}
                    </button>
                    )}

                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Candidate
                  </button>
                </div>

                {showFilters && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <div className="flex items-center space-x-4">
                      <label className="text-sm font-medium text-gray-700">College:</label>
                      <input
                        type="text"
                        value={selectedCollege}
                        onChange={(e) => setSelectedCollege(e.target.value)}
                        placeholder="Type college name"
                        className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">birthdate</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center">
                            Loading...
                          </td>
                        </tr>
                      ) : filteredCandidates.map((candidate) => (
                        <tr key={candidate.cid}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {candidate.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {candidate.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {candidate.college}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {candidate.phone}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {candidate.birthdate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleEdit(candidate)}
                                className="text-green-600 hover:text-green-900"
                              >
                                <Edit className="h-4 w-4" />
                              </button>

                              <button
                                onClick={() => handleDelete(candidate.cid)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

             {activeTab === 'Questions' && <Questions />}
             {activeTab === 'Exams' && <Exam />}

          </div>
        </div>
      </div>

      {showRegisterModal && <RegisterModal />}
    </div>
  );
};

export default AdminPage;