import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === 'Kumaravel' && password === 'Dharmarmahal@2017') {
      onLogin(true);
    } else {
      setError('Invalid username or password');
    }
    setIsLoading(false);
  };

  return (
    <div className="login-viewer">
      {/* Left Side: Cinematic Art */}
      <div className="login-hero">
        <div className="hero-overlay">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2>The Horizon of</h2>
            <h1>Elegance</h1>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Clean Form */}
      <div className="login-panel">
        <motion.div 
          className="login-form-wrapper"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="brand-header">
            <h1 className="brand-title">DHARMAR MAHAL</h1>
            <p className="brand-subtitle">WELCOME TO EXQUISITE EVENTS</p>
          </div>

          <form onSubmit={handleSubmit} className="premium-form">
            <div className="input-field">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="input-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && <div className="error-badge">{error}</div>}
            
            <button 
              type="submit" 
              className="action-btn"
              disabled={isLoading}
            >
              {isLoading ? 'AUTHENTICATING...' : 'LOGIN TO SYSTEM'}
            </button>
          </form>

          <div className="login-panel-footer">
            <p>Protected by Dharmar Mahal Security</p>
            <p className="dev-credit">Designed & Developed by Dinesh Karthick Durgadas</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;