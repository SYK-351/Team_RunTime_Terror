import React, { useState } from 'react';
import { Info, Users, DollarSign, ListChecks, CheckCircle } from 'lucide-react';

const STEPS = [
  { id: 1, name: 'Basic Details', icon: <Info size={16} /> },
  { id: 2, name: 'Rules & Settings', icon: <ListChecks size={16} /> },
  { id: 3, name: 'Payment & Prize Pool', icon: <DollarSign size={16} /> }
];

const CreateEvent = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Create New Event</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Launch your next hackathon, workshop or sports event in minutes.</p>
      </div>

      <div style={styles.stepperContainer}>
        {STEPS.map((step, idx) => (
          <div key={step.id} style={styles.stepWrapper}>
            <div style={styles.stepColumn}>
              <div 
                style={{
                  ...styles.stepCircle,
                  backgroundColor: currentStep >= step.id ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: currentStep >= step.id ? 'white' : 'var(--color-text-muted)',
                  borderColor: currentStep >= step.id ? 'var(--color-primary)' : 'var(--color-border)'
                }}
              >
                {currentStep > step.id ? <CheckCircle size={16} /> : step.id}
              </div>
              <span style={{
                ...styles.stepName,
                color: currentStep >= step.id ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                fontWeight: currentStep >= step.id ? 600 : 400
              }}>
                {step.name}
              </span>
            </div>
            {idx !== STEPS.length - 1 && (
              <div style={{
                ...styles.stepLine,
                backgroundColor: currentStep > step.id ? 'var(--color-primary)' : 'var(--color-border)'
              }} />
            )}
          </div>
        ))}
      </div>

      <div className="card" style={styles.formCard}>
        {currentStep === 1 && (
          <div className="animate-fade-in" style={styles.formSection}>
            <h2 style={styles.sectionTitle}>Basic Details</h2>
            
            <div className="input-group">
              <label className="input-label">Event Name</label>
              <input type="text" className="input-field" placeholder="e.g. HackNY Summer 2026" />
            </div>
            
            <div style={styles.grid2}>
              <div className="input-group">
                <label className="input-label">Start Date & Time</label>
                <input type="datetime-local" className="input-field" />
              </div>
              <div className="input-group">
                <label className="input-label">End Date & Time</label>
                <input type="datetime-local" className="input-field" />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Location</label>
              <input type="text" className="input-field" placeholder="Venue or Online Link" />
            </div>

            <div className="input-group">
              <label className="input-label">Description</label>
              <textarea className="input-field" rows="4" placeholder="What is this event about?"></textarea>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-fade-in" style={styles.formSection}>
            <h2 style={styles.sectionTitle}>Rules & Settings</h2>
            
            <div className="input-group">
              <label className="input-label">Event Category</label>
              <select className="input-field">
                <option>Hackathon</option>
                <option>Culture & Art</option>
                <option>Sports</option>
                <option>Workshop</option>
              </select>
            </div>
            
            <div className="input-group">
              <label className="input-label">Event Rules (One per line)</label>
              <textarea className="input-field" rows="5" placeholder="e.g. Must be a university student..."></textarea>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" style={{ marginRight: '0.5rem' }} /> Require approval for registration
              </label>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" style={{ marginRight: '0.5rem' }} /> Hide event from public search
              </label>
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: 'var(--font-size-base)', marginBottom: '0.5rem' }}>Custom Registration Fields</h3>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Ask attendees specific questions during registration.</p>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <input type="text" className="input-field" style={{ flex: 2 }} placeholder="Field Name (e.g. T-Shirt Size)" />
                <select className="input-field" style={{ flex: 1 }}>
                  <option>Short Text</option>
                  <option>Dropdown Options</option>
                  <option>Checkbox</option>
                </select>
              </div>
              <button className="btn btn-secondary" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>+ Add Field</button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="animate-fade-in" style={styles.formSection}>
            <h2 style={styles.sectionTitle}>Payment & Prize Pool</h2>
            
            <div style={styles.grid2}>
              <div className="input-group">
                <label className="input-label">Event Type</label>
                <select className="input-field">
                  <option>Individual</option>
                  <option>Team Based</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Max Team Size</label>
                <input type="number" className="input-field" defaultValue="4" min="1" />
              </div>
            </div>

            <div className="input-group" style={{ marginTop: '1rem' }}>
              <label className="input-label">Registration Fee ($)</label>
              <input type="number" className="input-field" defaultValue="0" min="0" placeholder="0 for Free" />
              <small style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Leave as 0 for free events.</small>
            </div>

            <div className="input-group" style={{ marginTop: '1rem' }}>
              <label className="input-label">Prize Pool ($)</label>
              <input type="number" className="input-field" defaultValue="1000" min="0" placeholder="e.g. 1000" />
              <small style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Total reward for winners.</small>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div style={styles.footer}>
          <button 
            className="btn btn-secondary" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Back
          </button>
          
          <button 
            className="btn btn-primary"
            onClick={currentStep === STEPS.length ? () => alert('Event Created!') : nextStep}
          >
            {currentStep === STEPS.length ? 'Publish Event' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  header: {
    marginBottom: 'var(--spacing-8)'
  },
  pageTitle: {
    fontSize: 'var(--font-size-3xl)',
    marginBottom: '0.5rem'
  },
  stepperContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--spacing-8)',
    padding: '0 var(--spacing-4)'
  },
  stepWrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: 1
  },
  stepColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    position: 'relative',
    zIndex: 2
  },
  stepCircle: {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    border: '2px solid',
    transition: 'all var(--transition-normal)',
    backgroundColor: 'var(--color-surface)'
  },
  stepName: {
    fontSize: 'var(--font-size-sm)',
    whiteSpace: 'nowrap',
    position: 'absolute',
    top: '3rem'
  },
  stepLine: {
    flex: 1,
    height: '2px',
    margin: '0 0.5rem',
    transform: 'translateY(-1.25rem)',
    zIndex: 1,
    transition: 'all var(--transition-normal)'
  },
  formCard: {
    padding: 'var(--spacing-8)',
    marginTop: 'var(--spacing-8)' // Extra margin for step labels
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-2)'
  },
  sectionTitle: {
    fontSize: 'var(--font-size-xl)',
    marginBottom: 'var(--spacing-6)',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid var(--color-border)'
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--spacing-4)'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-main)',
    cursor: 'pointer',
    marginBottom: '0.75rem'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 'var(--spacing-8)',
    paddingTop: 'var(--spacing-6)',
    borderTop: '1px solid var(--color-border)'
  }
};

export default CreateEvent;
