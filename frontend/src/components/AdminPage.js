// src/components/AdminPage.js
import React from 'react';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminPage;
