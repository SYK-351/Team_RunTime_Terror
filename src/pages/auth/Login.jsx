import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect away
  if (user && !loading) {
    return <Navigate to="/home" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      // Simulate API authentication success
      // If email contains "org" or "admin", make them an organizer
      const role = email.includes('org') || email.includes('admin') ? 'organizer' : 'participant';
      
      login({ 
        name: email.split('@')[0], 
        email,
        role 
      });
      // Redirect to home as requested
      navigate('/home');
    }
  };

  if (loading) return null; // Prevent showing login form while checking auth

  return (
    <div style={styles.container}>
      <div className="card" style={styles.card}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={styles.logoIcon}></div>
          <h2 style={{ marginTop: '1rem' }}>Welcome Back</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Sign in to continue to Event Flex</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="user@university.edu (use 'org' in email for organizer role)" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '0.75rem' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-background)',
    padding: '1rem',
    backgroundImage: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.1), transparent 40%)'
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    padding: '2.5rem'
  },
  logoIcon: {
    width: '3rem',
    height: '3rem',
    borderRadius: '0.75rem',
    background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
    margin: '0 auto'
  }
};

export default Login;
