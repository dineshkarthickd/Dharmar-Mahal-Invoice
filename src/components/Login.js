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
    <div className="login-container">
      <div className="login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <motion.div 
        className="login-box"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="logo-container"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <div className="logo-3d">
            <div className="cube">
              <div className="face front">D</div>
              <div className="face back">M</div>
              <div className="face right">H</div>
              <div className="face left">A</div>
              <div className="face top">R</div>
              <div className="face bottom">A</div>
            </div>
          </div>
          <h1>DHARMAR MAHAL</h1>
          <p>Invoice Management System</p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="login-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            className="input-group"
            whileFocus={{ scale: 1.02 }}
          >
            <div className="input-container">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="login-input"
              />
              <span className="input-icon">👤</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="input-group"
            whileFocus={{ scale: 1.02 }}
          >
            <div className="input-container">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
              />
              <span className="input-icon">🔒</span>
            </div>
          </motion.div>
          
          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error}
            </motion.div>
          )}
          
          <motion.button 
            type="submit" 
            className="login-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                Authenticating...
              </div>
            ) : (
              'Login to System'
            )}
          </motion.button>
        </motion.form>

        <motion.div 
          className="login-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>Secure Access Portal</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;