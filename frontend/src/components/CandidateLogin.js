// src/components/CandidateLogin.js
import React, { useState } from 'react';
import { loginCandidate } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function CandidateLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginCandidate({ email, password });
      navigate('/candidate');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Candidate Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

export default CandidateLogin;
