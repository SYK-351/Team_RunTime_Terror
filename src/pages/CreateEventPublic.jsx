import React, { useState } from 'react';
import { 
  FileText, Calendar, Trophy, Users, Settings, 
  CheckCircle, ChevronRight, Image as ImageIcon,
  DollarSign, Target
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const STEPS = [
  { id: 1, title: 'Basic Details', icon: FileText, desc: 'Name, logo, type, etc.' },
  { id: 2, title: 'Dates & Deadlines', icon: Calendar, desc: 'Start, end & registration' },
  { id: 3, title: 'Prizes & Rewards', icon: Trophy, desc: 'Prize pool & certificates' },
  { id: 4, title: 'Registration Info', icon: Users, desc: 'Team size & fees' },
  { id: 5, title: 'Additional Details', icon: Settings, desc: 'Rules & visibility' }
];

const CreateEventPublic = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([1]);
  const { triggerWishlistNotification } = useNotification();
  const { user } = useAuth();

  const [hostOrganization, setHostOrganization] = useState('');
  const [eventTitle, setEventTitle] = useState('');

  const handleNext = async () => {
    if (activeStep < STEPS.length) {
      if (!completedSteps.includes(activeStep + 1)) {
        setCompletedSteps([...completedSteps, activeStep + 1]);
      }
      setActiveStep(activeStep + 1);
    } else {
      try {
        await addDoc(collection(db, 'events'), {
          title: eventTitle || 'Untitled Event',
          hostOrganization: hostOrganization || 'Unknown College',
          collegeId: user?.collegeId || 'unknown.edu',
          createdBy: user?.uid || 'anonymous',
          status: 'pending',
          createdAt: new Date().toISOString()
        });
        triggerWishlistNotification(eventTitle || 'Untitled Event', hostOrganization || 'Unknown College');
        alert('Event successfully created and sent for Admin review!');
      } catch (error) {
        alert('Error creating event: ' + error.message);
      }
    }
  };

  const handlePrev = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <div className="container" style={styles.headerInner}>
          <div>
            <h1 style={styles.pageTitle}>Create Opportunity</h1>
            <p style={styles.pageSubtitle}>Host hackathons, competitions, workshops & more</p>
          </div>
          <div style={styles.headerActions}>
            <button className="btn btn-secondary">Save Draft</button>
            <button className="btn btn-primary" onClick={() => alert('Previewing Event...')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Preview <Target size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={styles.contentWrapper}>
        {/* Sidebar Navigation */}
        <div style={styles.sidebar}>
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            const isCompleted = completedSteps.includes(step.id) && !isActive;
            const isSelectable = completedSteps.includes(step.id) || step.id === activeStep;

            return (
              <div 
                key={step.id} 
                style={{
                  ...styles.stepCard,
                  borderColor: isActive ? 'var(--color-primary)' : 'transparent',
                  backgroundColor: isActive ? 'var(--color-surface)' : 'transparent',
                  opacity: isSelectable ? 1 : 0.6,
                  cursor: isSelectable ? 'pointer' : 'not-allowed'
                }}
                onClick={() => isSelectable && setActiveStep(step.id)}
              >
                <div style={styles.stepIconWrapper}>
                  {isCompleted ? (
                    <CheckCircle size={20} color="var(--color-success)" />
                  ) : (
                    <div style={{
                      ...styles.stepNumberBadge,
                      backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-border)',
                      color: isActive ? 'white' : 'var(--color-text-muted)'
                    }}>
                      {step.id}
                    </div>
                  )}
                </div>
                <div style={styles.stepInfo}>
                  <h4 style={{ 
                    ...styles.stepTitle, 
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)' 
                  }}>
                    {step.title}
                  </h4>
                  <p style={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="card" style={styles.formContainer}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>{STEPS[activeStep - 1].title}</h2>
            <p style={styles.formSubtitle}>{STEPS[activeStep - 1].desc}</p>
          </div>

          <div style={styles.formBody}>
            {/* Step 1: Basic Details */}
            {activeStep === 1 && (
              <div className="animate-fade-in" style={styles.formSection}>
                <div className="input-group">
                  <label className="input-label">Opportunity Title <span style={styles.required}>*</span></label>
                  <input type="text" className="input-field" placeholder="e.g. Global Tech Hackathon 2026" value={eventTitle} onChange={e => setEventTitle(e.target.value)} />
                  <p style={styles.helperText}>Make it catchy! This is the first thing people will see.</p>
                </div>

                <div className="input-group">
                  <label className="input-label">Opportunity Type <span style={styles.required}>*</span></label>
                  <div style={styles.radioGrid}>
                    {['Hackathon', 'Coding Challenge', 'Workshop', 'Conference', 'Quiz'].map(type => (
                      <label key={type} style={styles.radioCard}>
                        <input type="radio" name="evt_type" style={{ marginRight: '8px' }} />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <div style={styles.grid2}>
                  <div className="input-group">
                    <label className="input-label">Mode of Event</label>
                    <select className="input-field">
                      <option>Online</option>
                      <option>Offline / In-person</option>
                      <option>Hybrid</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Host Organization</label>
                    <input type="text" className="input-field" placeholder="e.g. New York University" value={hostOrganization} onChange={e => setHostOrganization(e.target.value)} />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Event Banner / Logo</label>
                  <div style={styles.uploadBox}>
                    <ImageIcon size={32} color="var(--color-text-muted)" style={{ marginBottom: '8px' }} />
                    <p style={{ fontWeight: 500, marginBottom: '4px' }}>Click to upload or drag and drop</p>
                    <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>SVG, PNG, JPG or GIF (max. 5MB)</p>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Detailed Description</label>
                  <textarea className="input-field" rows="6" placeholder="Write a compelling description outlining the goals, scope, and expected outcomes..."></textarea>
                </div>
              </div>
            )}

            {/* Step 2: Dates */}
            {activeStep === 2 && (
              <div className="animate-fade-in" style={styles.formSection}>
                <div style={styles.timelineRow}>
                  <div style={styles.timelineBox}>
                    <h3 style={styles.timelineTitle}>Registration Timeline</h3>
                    <div style={styles.grid2}>
                      <div className="input-group">
                        <label className="input-label">Starts On <span style={styles.required}>*</span></label>
                        <input type="datetime-local" className="input-field" />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Ends On <span style={styles.required}>*</span></label>
                        <input type="datetime-local" className="input-field" />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={styles.timelineRow}>
                  <div style={styles.timelineBox}>
                    <h3 style={styles.timelineTitle}>Event Timeline</h3>
                    <div style={styles.grid2}>
                      <div className="input-group">
                        <label className="input-label">Starts On <span style={styles.required}>*</span></label>
                        <input type="datetime-local" className="input-field" />
                      </div>
                      <div className="input-group">
                        <label className="input-label">Ends On <span style={styles.required}>*</span></label>
                        <input type="datetime-local" className="input-field" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Rounds / Stages (Optional)</label>
                  <button className="btn btn-secondary" style={{ width: 'fit-content' }}>+ Add Round</button>
                  <p style={styles.helperText}>Break down your event into multiple phases like Idea Submission, Semi-Finals, and Finale.</p>
                </div>
              </div>
            )}

            {/* Step 3: Prizes */}
            {activeStep === 3 && (
              <div className="animate-fade-in" style={styles.formSection}>
                <div className="input-group">
                  <label className="input-label">Total Prize Pool <span style={styles.required}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <DollarSign size={18} style={styles.inputIcon} />
                    <input type="number" className="input-field" style={{ paddingLeft: '2.5rem' }} placeholder="e.g. 5000" min="0" />
                  </div>
                  <p style={styles.helperText}>Enter 0 if there is no cash prize.</p>
                </div>

                <label style={styles.toggleLabel}>
                  <input type="checkbox" style={{ transform: 'scale(1.2)' }} /> 
                  <span style={{ fontWeight: 500 }}>Provide Certificates to Participants</span>
                </label>

                <div style={{...styles.timelineBox, marginTop: '24px'}}>
                  <h3 style={styles.timelineTitle}>Prize Breakdown</h3>
                  
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', marginBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <label className="input-label">Position</label>
                      <input type="text" className="input-field" placeholder="e.g. First Prize" defaultValue="Winner" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label className="input-label">Reward Amount ($)</label>
                      <input type="number" className="input-field" placeholder="e.g. 2500" />
                    </div>
                    <button className="btn btn-secondary" style={{ height: '42px', padding: '0 16px', color: 'var(--color-error)', borderColor: 'var(--color-error)' }}>Remove</button>
                  </div>
                  
                  <button className="btn btn-secondary" style={{ width: 'fit-content' }}>+ Add Another Prize</button>
                </div>
              </div>
            )}

            {/* Step 4: Reg Info */}
            {activeStep === 4 && (
              <div className="animate-fade-in" style={styles.formSection}>
                <div style={styles.grid2}>
                  <div className="input-group">
                    <label className="input-label">Participation Type <span style={styles.required}>*</span></label>
                    <select className="input-field">
                      <option>Team</option>
                      <option>Individual</option>
                      <option>Both (Team & Individual)</option>
                    </select>
                  </div>
                </div>

                <div style={styles.grid2}>
                  <div className="input-group">
                    <label className="input-label">Min Team Size <span style={styles.required}>*</span></label>
                    <input type="number" className="input-field" defaultValue="1" min="1" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Max Team Size <span style={styles.required}>*</span></label>
                    <input type="number" className="input-field" defaultValue="4" min="1" />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Registration Fee / Ticket Price ($) <span style={styles.required}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <DollarSign size={18} style={styles.inputIcon} />
                    <input type="number" className="input-field" style={{ paddingLeft: '2.5rem' }} defaultValue="0" min="0" />
                  </div>
                  <p style={styles.helperText}>Leave as 0 for free events.</p>
                </div>

                <div className="input-group">
                  <label className="input-label">Eligibility / Target Audience</label>
                  <input type="text" className="input-field" placeholder="e.g. College Students, Working Professionals" />
                </div>
              </div>
            )}

            {/* Step 5: Additional */}
            {activeStep === 5 && (
              <div className="animate-fade-in" style={styles.formSection}>
                <div className="input-group">
                  <label className="input-label">Rules & Guidelines</label>
                  <textarea className="input-field" rows="5" placeholder="List rules, code of conduct, and evaluation criteria..."></textarea>
                </div>

                <div className="input-group">
                  <label className="input-label">Contact Email</label>
                  <input type="email" className="input-field" placeholder="support@event.com" />
                </div>

                <div style={styles.timelineBox}>
                  <h3 style={styles.timelineTitle}>Visibility & Access</h3>
                  
                  <label style={{...styles.toggleLabel, marginBottom: '12px'}}>
                    <input type="checkbox" style={{ transform: 'scale(1.2)' }} defaultChecked /> 
                    <div>
                      <span style={{ fontWeight: 500, display: 'block' }}>Public Event</span>
                      <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Anyone can search and register for this event.</span>
                    </div>
                  </label>
                  
                  <label style={styles.toggleLabel}>
                    <input type="checkbox" style={{ transform: 'scale(1.2)' }} /> 
                    <div>
                      <span style={{ fontWeight: 500, display: 'block' }}>Require Manual Approval</span>
                      <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>You must manually approve all registrations.</span>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div style={styles.formFooter}>
            <button 
              className="btn btn-secondary" 
              onClick={handlePrev}
              disabled={activeStep === 1}
              style={{ opacity: activeStep === 1 ? 0 : 1 }}
            >
              Back
            </button>
            
            <button 
              className="btn btn-primary" 
              onClick={handleNext}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
            >
              {activeStep === STEPS.length ? 'Publish Opportunity' : 'Save & Continue'} 
              {activeStep !== STEPS.length && <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: 'var(--color-background)',
    minHeight: '100vh',
    paddingBottom: '40px'
  },
  header: {
    backgroundColor: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)',
    padding: '24px 0',
    marginBottom: '32px'
  },
  headerInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--color-text-main)',
    marginBottom: '4px'
  },
  pageSubtitle: {
    fontSize: '15px',
    color: 'var(--color-text-muted)'
  },
  headerActions: {
    display: 'flex',
    gap: '12px'
  },
  contentWrapper: {
    display: 'flex',
    gap: '32px',
    alignItems: 'flex-start'
  },
  sidebar: {
    width: '280px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  stepCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '16px',
    borderRadius: '12px',
    border: '2px solid transparent',
    transition: 'all 0.2s ease',
    userSelect: 'none'
  },
  stepIconWrapper: {
    marginTop: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepNumberBadge: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 600
  },
  stepInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  stepTitle: {
    fontSize: '15px',
    fontWeight: 600,
    margin: 0
  },
  stepDesc: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    margin: 0
  },
  formContainer: {
    flex: 1,
    minHeight: '600px',
    display: 'flex',
    flexDirection: 'column',
    padding: '0', // zero padding initially to allow full width header
    overflow: 'hidden'
  },
  formHeader: {
    padding: '24px 32px',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)'
  },
  formTitle: {
    fontSize: '22px',
    fontWeight: 600,
    marginBottom: '4px',
    color: 'var(--color-text-main)'
  },
  formSubtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  formBody: {
    padding: '32px',
    flex: 1
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  formFooter: {
    padding: '20px 32px',
    borderTop: '1px solid var(--color-border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa'
  },
  required: {
    color: 'var(--color-error)'
  },
  helperText: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginTop: '6px'
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px'
  },
  radioGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '12px'
  },
  radioCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    transition: 'all 0.2s',
    '&:hover': {
      borderColor: 'var(--color-primary)',
      backgroundColor: 'rgba(59, 130, 246, 0.05)'
    }
  },
  uploadBox: {
    border: '2px dashed var(--color-border)',
    borderRadius: '12px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: 'var(--color-background)',
    transition: 'border-color 0.2s',
  },
  timelineRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  timelineBox: {
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    padding: '24px'
  },
  timelineTitle: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--color-border)'
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--color-text-muted)'
  },
  toggleLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    cursor: 'pointer',
    padding: '12px',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    transition: 'all 0.2s'
  }
};

export default CreateEventPublic;
