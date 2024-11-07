import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Welcome to Online Examination Platform
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Your trusted platform for secure and efficient online assessments
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <Link
              to="/admin-login"
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Admin Portal</h2>
              <p className="text-gray-500 mb-4">Manage exams, candidates, and results</p>
              <span className="text-blue-600 group-hover:text-blue-700 font-medium">
                Login as Admin →
              </span>
            </Link>

            <Link
              to="/candidate-login"
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Candidate Portal</h2>
              <p className="text-gray-500 mb-4">Take exams and view your results</p>
              <span className="text-green-600 group-hover:text-green-700 font-medium">
                Login as Candidate →
              </span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;