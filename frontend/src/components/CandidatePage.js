import React from 'react';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function CandidatePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h1>Candidate Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default CandidatePage;
