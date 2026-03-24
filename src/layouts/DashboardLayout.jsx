import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div style={styles.layout}>
      <Navbar />
      <div style={styles.container}>
        <Sidebar />
        <main style={styles.main}>
          <div style={styles.content}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--color-background)'
  },
  container: {
    display: 'flex',
    flex: 1
  },
  main: {
    flex: 1,
    overflowY: 'auto'
  },
  content: {
    padding: 'var(--spacing-8)',
    maxWidth: '1200px',
    margin: '0 auto'
  }
};

export default DashboardLayout;
