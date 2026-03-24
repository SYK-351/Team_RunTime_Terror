import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, MapPin, Users, Globe, Share2, Heart, ShieldAlert } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');

  // Mock Event Data based on ID or just generic
  const event = {
    title: 'HackNY Summer 2026',
    organizer: 'NYU Computer Science Club',
    date: 'July 15 - 17, 2026',
    time: '09:00 AM EST',
    location: 'NYU Kimmel Center, New York, NY',
    attendees: 540,
    price: 'Free',
    tags: ['Hackathon', 'Coding', 'Open Source'],
    description: `Join us for the largest student-run hackathon in NYC! HackNY Summer 2026 brings together the brightest minds to build innovative solutions over 48 hours. Whether you are a beginner or a seasoned pro, there's a place for you here.
    
    Expect amazing workshops, mentorship from industry leaders, and loads of swag and free food!`,
    rules: [
      'All code must be written during the hackathon.',
      'Teams can have up to 4 members.',
      'Be respectful and follow the MLH Code of Conduct.'
    ]
  };

  const TABS = ['Overview', 'Announcements', 'Discussion'];

  return (
    <div style={styles.page}>
      {/* Event Banner */}
      <div style={styles.banner}>
        <div style={styles.bannerOverlay}></div>
        <div className="container" style={styles.bannerContent}>
          <div style={styles.tagsRow}>
            {event.tags.map((tag, idx) => (
              <span key={idx} style={styles.tag}>{tag}</span>
            ))}
          </div>
          <h1 style={styles.title}>{event.title}</h1>
          <p style={styles.organizer}>Hosted by <strong>{event.organizer}</strong></p>
        </div>
      </div>

      <div className="container" style={styles.contentLayout}>
        {/* Main Content Area */}
        <div style={styles.mainContent}>
          
          <div style={styles.tabsContainer}>
            {TABS.map(tab => (
              <button 
                key={tab}
                style={{
                  ...styles.tabBtn,
                  ...(activeTab === tab ? styles.activeTabBtn : {})
                }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={styles.tabContent}>
            {activeTab === 'Overview' && (
              <div className="animate-fade-in">
                <h3 style={styles.sectionHeader}>About Event</h3>
                <p style={styles.descriptionText}>{event.description}</p>
                
                <h3 style={styles.sectionHeader}>Rules & Guidelines</h3>
                <ul style={styles.rulesList}>
                  {event.rules.map((rule, idx) => (
                    <li key={idx} style={styles.ruleItem}>
                      <ShieldAlert size={16} color="var(--color-primary)" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'Announcements' && (
              <div className="animate-fade-in" style={styles.emptyState}>
                <div style={styles.emptyIcon}>📢</div>
                <h4>No announcements yet</h4>
                <p style={{ color: 'var(--color-text-muted)' }}>The organizers haven't posted any updates.</p>
              </div>
            )}

            {activeTab === 'Discussion' && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={styles.sectionHeader}>Q&A Discussion</h3>
                
                {/* Mocked Q&A */}
                <div style={{ padding: '1.25rem', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-md)', backgroundColor: 'var(--color-surface)' }}>
                  <p style={{ fontWeight: 600, fontSize: 'var(--font-size-base)' }}>Will there be hardware lending?</p>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Asked by Anonymous Student</p>
                  
                  <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius-sm)', borderLeft: '3px solid var(--color-primary)' }}>
                    <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '0.25rem' }}>Organizer Reply:</p>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-main)' }}>Yes! We will have a hardware lab sponsored by Major League Hacking.</p>
                  </div>
                </div>

                {/* Input for new question */}
                <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius-md)' }}>
                  <h4 style={{ marginBottom: '0.75rem' }}>Ask the Organizers</h4>
                  <textarea className="input-field" rows="3" placeholder="What would you like to know about this event?"></textarea>
                  <button className="btn btn-primary" style={{ marginTop: '0.75rem' }}>Post Question</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div style={styles.sidebar}>
          <div className="card" style={styles.infoCard}>
            <div style={styles.infoRow}>
              <Calendar size={20} style={styles.infoIcon} />
              <div>
                <p style={styles.infoLabel}>Date and Time</p>
                <p style={styles.infoValue}>{event.date}</p>
                <p style={styles.infoSub}>{event.time}</p>
              </div>
            </div>
            
            <div style={styles.infoRow}>
              <MapPin size={20} style={styles.infoIcon} />
              <div>
                <p style={styles.infoLabel}>Location</p>
                <p style={styles.infoValue}>{event.location}</p>
                <a href="#" style={{ fontSize: 'var(--font-size-sm)' }}>View on map</a>
              </div>
            </div>

            <div style={styles.separator}></div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <button className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
                Register Now - {event.price}
              </button>
              <div style={styles.actionRow}>
                <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Heart size={18} /> Save
                </button>
                <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  <Share2 size={18} /> Share
                </button>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
              <Users size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
              {event.attendees} people are attending
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    paddingBottom: 'var(--spacing-12)'
  },
  banner: {
    height: '340px',
    backgroundColor: 'var(--color-primary)',
    background: 'linear-gradient(135deg, #1e1b4b, var(--color-primary))',
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    paddingBottom: 'var(--spacing-8)'
  },
  bannerOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 70%)'
  },
  bannerContent: {
    position: 'relative',
    zIndex: 1,
    color: 'white',
    width: '100%'
  },
  tagsRow: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: 'var(--spacing-3)'
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(4px)',
    padding: '0.25rem 0.75rem',
    borderRadius: 'var(--border-radius-full)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 500
  },
  title: {
    color: 'white',
    fontSize: 'var(--font-size-3xl)',
    marginBottom: '0.5rem'
  },
  organizer: {
    fontSize: 'var(--font-size-lg)',
    color: 'rgba(255,255,255,0.8)'
  },
  contentLayout: {
    display: 'flex',
    flexDirection: 'row',
    gap: 'var(--spacing-8)',
    marginTop: 'var(--spacing-8)',
    flexWrap: 'wrap'
  },
  mainContent: {
    flex: '1 1 600px',
  },
  sidebar: {
    flex: '0 0 350px',
    marginTop: '-80px', // Pull it up over the banner
    position: 'sticky',
    top: '5rem',
    alignSelf: 'flex-start'
  },
  infoCard: {
    padding: 'var(--spacing-6)',
    backgroundColor: 'var(--color-surface)',
    boxShadow: 'var(--shadow-lg)'
  },
  tabsContainer: {
    display: 'flex',
    gap: 'var(--spacing-2)',
    borderBottom: '1px solid var(--color-border)',
    marginBottom: 'var(--spacing-6)'
  },
  tabBtn: {
    background: 'none',
    border: 'none',
    padding: '0.75rem 1.5rem',
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-muted)',
    fontWeight: 500,
    cursor: 'pointer',
    position: 'relative'
  },
  activeTabBtn: {
    color: 'var(--color-primary)',
    borderBottom: '2px solid var(--color-primary)'
  },
  tabContent: {
    minHeight: '400px'
  },
  sectionHeader: {
    fontSize: 'var(--font-size-xl)',
    marginBottom: 'var(--spacing-4)',
    marginTop: 'var(--spacing-6)'
  },
  descriptionText: {
    whiteSpace: 'pre-line',
    lineHeight: 1.7
  },
  rulesList: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  ruleItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    padding: '1rem',
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--border-radius-md)',
    border: '1px solid var(--color-border)'
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 1rem',
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--border-radius-lg)',
    border: '1px dashed var(--color-border)'
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  infoRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  infoIcon: {
    color: 'var(--color-primary)',
    marginTop: '0.25rem'
  },
  infoLabel: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)',
    marginBottom: '0.25rem'
  },
  infoValue: {
    fontWeight: 600,
    color: 'var(--color-text-main)',
    marginBottom: '0.125rem'
  },
  infoSub: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)'
  },
  separator: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '1.5rem 0'
  },
  actionRow: {
    display: 'flex',
    gap: '0.5rem'
  }
};

export default EventDetails;
