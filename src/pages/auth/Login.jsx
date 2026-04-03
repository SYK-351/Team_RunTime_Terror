import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [signingIn, setSigningIn] = useState(false); // true while waiting for AuthContext to populate role
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Once AuthContext finishes loading the user+role, redirect to the right page
  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/home', { replace: true });
      }
    }
  }, [user, loading, navigate]);

  const switchMode = (signUpMode) => {
    setIsSignUp(signUpMode);
    setErrorMsg('');
    setEmail('');
    setPassword('');
  };

  const handleLogin = async () => {
    try {
      // Just authenticate — AuthContext's onAuthStateChanged will fetch the role
      // and the useEffect above will redirect once user+role are ready
      setSigningIn(true);
      await signInWithEmailAndPassword(auth, email, password);
      // Navigation is handled by the useEffect watching `user`
    } catch (error) {
      setSigningIn(false);
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        setErrorMsg('Invalid email or password. Please check your credentials.');
      } else if (error.code === 'auth/too-many-requests') {
        setErrorMsg('Too many failed attempts. Please try again later.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMsg('Please enter a valid email address.');
      } else {
        setErrorMsg('Sign in failed: ' + (error.message || 'Unknown error'));
      }
    }
  };

  const handleSignUp = async () => {
    if (!email.toLowerCase().endsWith('.edu') && !email.toLowerCase().endsWith('.ac.in')) {
      setErrorMsg('Only college email addresses (.edu or .ac.in) are allowed to sign up.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;
      const collegeId = email.toLowerCase().split('@')[1];
      await setDoc(doc(db, 'users', fbUser.uid), {
        uid: fbUser.uid,
        email: fbUser.email,
        name: fbUser.email.split('@')[0],
        role: 'organizer',
        collegeId: collegeId,
      });
      navigate('/home');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMsg('An account with this email already exists. Please sign in instead.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMsg('Please enter a valid email address.');
      } else if (error.code === 'auth/weak-password') {
        setErrorMsg('Password is too weak. Use at least 6 characters.');
      } else {
        setErrorMsg('Sign up failed: ' + (error.message || 'Unknown error'));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return; // prevent double-submit
    setErrorMsg('');
    setSubmitting(true);
    try {
      if (isSignUp) {
        await handleSignUp();
      } else {
        await handleLogin();
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-background)' }}>
      <p style={{ color: 'var(--color-text-muted)' }}>Loading...</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <div className="card" style={styles.card}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={styles.logoIcon}></div>
          <h2 style={{ marginTop: '1rem' }}>Event Flex</h2>
        </div>

        {/* Tab switcher */}
        <div style={styles.tabRow}>
          <button
            type="button"
            style={{ ...styles.tab, ...(isSignUp ? {} : styles.tabActive) }}
            onClick={() => switchMode(false)}
          >
            Sign In
          </button>
          <button
            type="button"
            style={{ ...styles.tab, ...(isSignUp ? styles.tabActive : {}) }}
            onClick={() => switchMode(true)}
          >
            Sign Up
          </button>
        </div>

        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: '1.25rem', textAlign: 'center' }}>
          {isSignUp ? 'Create an organizer account using your college email' : 'Enter your credentials to sign in'}
        </p>

        {errorMsg && (
          <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239,68,68,0.15)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--border-radius-sm)', marginBottom: '1rem', fontSize: 'var(--font-size-sm)' }}>
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">{isSignUp ? 'College Email (.edu / .ac.in)' : 'Email Address'}</label>
            <input
              type="email"
              className="input-field"
              placeholder="name@university.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label className="input-label">Password{isSignUp ? ' (min 6 characters)' : ''}</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: '0.5rem', padding: '0.75rem', opacity: (submitting || signingIn) ? 0.7 : 1 }}
            disabled={submitting || signingIn}
          >
            {signingIn
              ? 'Redirecting...'
              : submitting
                ? (isSignUp ? 'Creating Account...' : 'Signing In...')
                : (isSignUp ? 'Create Account' : 'Sign In')}
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
  },
  tabRow: {
    display: 'flex',
    backgroundColor: 'var(--color-background)',
    borderRadius: 'var(--border-radius-sm)',
    padding: '0.25rem',
    marginBottom: '1.25rem',
    gap: '0.25rem',
    border: '1px solid var(--color-border)'
  },
  tab: {
    flex: 1,
    padding: '0.5rem',
    border: 'none',
    borderRadius: 'calc(var(--border-radius-sm) - 2px)',
    background: 'transparent',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: 'var(--font-size-sm)',
    transition: 'all 0.2s'
  },
  tabActive: {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    boxShadow: '0 1px 4px rgba(99,102,241,0.3)'
  }
};

export default Login;
