// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Online Examination Platform</h1>
      <Link to="/admin-login">Login as Admin</Link>
      <Link to="/candidate-login">Login as Candidate</Link>
    </div>
  );
}

export default HomePage;
