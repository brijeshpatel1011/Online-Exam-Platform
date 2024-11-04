// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import CandidateLogin from './components/CandidateLogin';
import AdminPage from './components/AdminPage';
import CandidatePage from './components/CandidatePage';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/candidate-login" element={<CandidateLogin />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/candidate"
          element={
            <PrivateRoute>
              <CandidatePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
