// src/components/AdminLogin.js
import React, { useState } from 'react';
import { loginExaminer } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginExaminer({ email, password });
      navigate('/admin');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

export default AdminLogin;
