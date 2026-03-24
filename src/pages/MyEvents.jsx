import React, { useState } from 'react';
import { Calendar, Clock, Edit3, X } from 'lucide-react';

const INITIAL_EVENTS = [
  { id: 1, title: 'Annual Tech Fest', college: 'NYU', date: '2026-08-20', time: '09:00', description: 'A great tech festival.', status: 'Upcoming' },
  { id: 2, title: 'Coding Bootcamp', college: 'Columbia University', date: '2025-11-15', time: '10:00', description: 'Intensive weekend bootcamp.', status: 'Completed' }
];

const MyEvents = () => {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleEditClick = (evt) => {
    setEditingEvent({ ...evt });
    setIsEditModalOpen(true);
  };

  const saveChanges = () => {
    setEvents(events.map(e => e.id === editingEvent.id ? editingEvent : e));
    setIsEditModalOpen(false);
  };

  return (
    <div className="container" style={styles.page}>
      <h1 style={styles.title}>My Events</h1>
      <p style={styles.subtitle}>Manage the events you have organized.</p>

      <div style={styles.list}>
        {events.map((evt) => (
          <div key={evt.id} className="card" style={styles.eventCard}>
            <div style={styles.eventHeader}>
              <h3 style={styles.eventTitle}>{evt.title} <span style={styles.collegeName}>at {evt.college}</span></h3>
              <span className={`badge ${evt.status === 'Completed' ? 'badge-primary' : ''}`} style={{ backgroundColor: evt.status === 'Completed' ? 'var(--color-primary)' : 'var(--color-background)', color: evt.status === 'Completed' ? 'white' : 'var(--color-text-muted)' }}>
                {evt.status}
              </span>
            </div>
            
            <p style={styles.eventDesc}>{evt.description}</p>
            
            <div style={styles.eventFooter}>
              <div style={styles.eventMeta}>
                <span style={styles.metaItem}><Calendar size={14} /> {evt.date}</span>
                <span style={styles.metaItem}><Clock size={14} /> {evt.time}</span>
              </div>
              
              {evt.status !== 'Completed' && (
                <button className="btn btn-secondary" style={styles.editBtn} onClick={() => handleEditClick(evt)}>
                  <Edit3 size={14} /> Edit Event
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isEditModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2>Edit Event</h2>
              <button style={styles.closeBtn} onClick={() => setIsEditModalOpen(false)}><X size={20} /></button>
            </div>
            
            <div className="input-group">
              <label className="input-label">Date</label>
              <input type="date" className="input-field" value={editingEvent.date} onChange={e => setEditingEvent({...editingEvent, date: e.target.value})} />
            </div>

            <div className="input-group">
              <label className="input-label">Time</label>
              <input type="time" className="input-field" value={editingEvent.time} onChange={e => setEditingEvent({...editingEvent, time: e.target.value})} />
            </div>

            <div className="input-group">
              <label className="input-label">Description</label>
              <textarea className="input-field" rows="4" value={editingEvent.description} onChange={e => setEditingEvent({...editingEvent, description: e.target.value})}></textarea>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={saveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { padding: 'var(--spacing-8) 0', maxWidth: '800px', margin: '0 auto' },
  title: { fontSize: 'var(--font-size-2xl)', marginBottom: '0.25rem' },
  subtitle: { color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-6)' },
  list: { display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' },
  eventCard: { padding: 'var(--spacing-5)' },
  eventHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' },
  eventTitle: { fontSize: 'var(--font-size-lg)', margin: 0 },
  collegeName: { fontSize: 'var(--font-size-sm)', fontWeight: 400, color: 'var(--color-text-muted)', marginLeft: '0.5rem' },
  eventDesc: { color: 'var(--color-text-main)', marginBottom: '1rem', fontSize: 'var(--font-size-sm)' },
  eventFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' },
  eventMeta: { display: 'flex', gap: '1rem', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' },
  metaItem: { display: 'flex', alignItems: 'center', gap: '0.25rem' },
  editBtn: { padding: '0.25rem 0.75rem', fontSize: 'var(--font-size-sm)' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-6)', borderRadius: 'var(--border-radius-lg)', width: '400px', maxWidth: '90%' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' },
  closeBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }
};

export default MyEvents;
