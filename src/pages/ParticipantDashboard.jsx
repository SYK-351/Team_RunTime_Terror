import React, { useState } from 'react';
import { Calendar, MapPin, Bell, MessageSquare, CheckCircle } from 'lucide-react';

const REGISTERED_EVENTS = [
  {
    id: 1,
    title: 'HackNY Summer 2026',
    organizer: 'NYU Computer Science Club',
    date: 'July 15 - 17, 2026',
    status: 'Upcoming',
    announcements: [
      { id: 1, time: '2 hours ago', text: 'Schedule has been updated! Dinner will be served at 7 PM instead of 6 PM.' },
      { id: 2, time: '1 day ago', text: 'Welcome all hackers! Please join our official Discord server for communication.' }
    ]
  }
];

const ParticipantDashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState(REGISTERED_EVENTS[0]);

  return (
    <div className="container" style={styles.page}>
      <h1 style={styles.pageTitle}>My Registered Events</h1>
      
      <div style={styles.layout}>
        {/* Sidebar List of Events */}
        <div style={styles.sidebar}>
          {REGISTERED_EVENTS.map(event => (
            <div 
              key={event.id}
              style={{
                ...styles.eventItem,
                ...(selectedEvent.id === event.id ? styles.eventItemActive : {})
              }}
              onClick={() => setSelectedEvent(event)}
            >
              <h4 style={styles.eventItemTitle}>{event.title}</h4>
              <p style={styles.eventItemDate}><Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />{event.date}</p>
              <div style={styles.registeredBadge}>
                <CheckCircle size={12} /> Registered
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        {selectedEvent && (
          <div style={styles.mainContent}>
            <div className="card" style={styles.card}>
              <div style={styles.header}>
                <h2 style={styles.title}>{selectedEvent.title}</h2>
                <span className="badge badge-primary">Event Hub</span>
              </div>
              
              <div style={styles.tabs}>
                <button style={{ ...styles.tabBtn, ...styles.activeTabBtn }}>
                  <Bell size={16} /> Announcements
                  <span style={styles.notificationCount}>2</span>
                </button>
                <button style={styles.tabBtn}>
                  <MessageSquare size={16} /> Discussions
                </button>
              </div>

              <div style={styles.feed}>
                <h3 style={styles.feedTitle}>Timeline</h3>
                <div style={styles.timeline}>
                  {selectedEvent.announcements.map((ann, idx) => (
                    <div key={ann.id} style={styles.timelineItem}>
                      <div style={styles.timelineDot}></div>
                      {idx !== selectedEvent.announcements.length - 1 && <div style={styles.timelineLine}></div>}
                      
                      <div className="card" style={styles.timelineContent}>
                        <div style={styles.announcementHeader}>
                          <strong>Organizer</strong>
                          <span style={styles.timeText}>{ann.time}</span>
                        </div>
                        <p style={styles.announcementText}>{ann.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    paddingTop: 'var(--spacing-8)',
    paddingBottom: 'var(--spacing-12)'
  },
  pageTitle: {
    fontSize: 'var(--font-size-2xl)',
    marginBottom: 'var(--spacing-6)'
  },
  layout: {
    display: 'flex',
    gap: 'var(--spacing-6)',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  sidebar: {
    flex: '0 0 300px',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-3)'
  },
  eventItem: {
    padding: 'var(--spacing-4)',
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--border-radius-lg)',
    border: '1px solid var(--color-border)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  eventItemActive: {
    borderColor: 'var(--color-primary)',
    boxShadow: '0 0 0 1px var(--color-primary)'
  },
  eventItemTitle: {
    fontSize: 'var(--font-size-base)',
    marginBottom: '0.25rem'
  },
  eventItemDate: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-text-muted)',
    marginBottom: '0.5rem'
  },
  registeredBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-success)',
    fontWeight: 500,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: '0.125rem 0.5rem',
    borderRadius: 'var(--border-radius-full)'
  },
  mainContent: {
    flex: '1 1 500px'
  },
  card: {
    padding: 'var(--spacing-6)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-6)'
  },
  title: {
    fontSize: 'var(--font-size-xl)'
  },
  tabs: {
    display: 'flex',
    gap: 'var(--spacing-4)',
    borderBottom: '1px solid var(--color-border)',
    marginBottom: 'var(--spacing-6)'
  },
  tabBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'none',
    border: 'none',
    padding: '0.75rem 0',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)',
    fontWeight: 500,
    cursor: 'pointer'
  },
  activeTabBtn: {
    color: 'var(--color-primary)',
    borderBottom: '2px solid var(--color-primary)'
  },
  notificationCount: {
    backgroundColor: 'var(--color-danger)',
    color: 'white',
    fontSize: '0.65rem',
    padding: '0.1rem 0.4rem',
    borderRadius: '1rem',
    fontWeight: 700
  },
  feed: {
    marginTop: 'var(--spacing-4)'
  },
  feedTitle: {
    fontSize: 'var(--font-size-lg)',
    marginBottom: 'var(--spacing-4)'
  },
  timeline: {
    position: 'relative',
    paddingLeft: '1rem'
  },
  timelineItem: {
    position: 'relative',
    paddingBottom: 'var(--spacing-6)'
  },
  timelineDot: {
    position: 'absolute',
    left: '-1rem',
    top: '0.25rem',
    width: '0.75rem',
    height: '0.75rem',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '50%',
    border: '2px solid var(--color-surface)',
    zIndex: 2
  },
  timelineLine: {
    position: 'absolute',
    left: '-0.6875rem', // Center of the 0.75rem dot
    top: '1rem',
    bottom: 0,
    width: '2px',
    backgroundColor: 'var(--color-border)',
    zIndex: 1
  },
  timelineContent: {
    padding: 'var(--spacing-4)',
    marginLeft: 'var(--spacing-4)',
    backgroundColor: 'var(--color-background)',
    boxShadow: 'none',
    border: '1px solid var(--color-border)'
  },
  announcementHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
    fontSize: 'var(--font-size-sm)'
  },
  timeText: {
    color: 'var(--color-text-muted)',
    fontSize: 'var(--font-size-xs)'
  },
  announcementText: {
    color: 'var(--color-text-main)',
    lineHeight: 1.6
  }
};

export default ParticipantDashboard;
