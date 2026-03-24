import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Edit3, X } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const { triggerUpdate } = useNotification();
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) return;
      try {
        const q = query(collection(db, 'events'), where('createdBy', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(fetched);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchEvents();
  }, [user]);

  const handleEditClick = (evt) => {
    setEditingEvent({ ...evt });
    setIsEditModalOpen(true);
  };

  const saveChanges = async () => {
    try {
      const eventRef = doc(db, 'events', editingEvent.id);
      await updateDoc(eventRef, {
        description: editingEvent.description || '',
        date: editingEvent.date || '',
        time: editingEvent.time || ''
      });
      setEvents(events.map(e => e.id === editingEvent.id ? editingEvent : e));
      triggerUpdate(editingEvent.title);
      setIsEditModalOpen(false);
      alert('Event updated and notifications sent to registered users!');
    } catch(err) {
      console.error(err);
      alert('Failed to update event');
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading events...</div>;

  return (
    <div className="container" style={styles.page}>
      <h1 style={styles.title}>My Events</h1>
      <p style={styles.subtitle}>Manage the events you have organized.</p>

      {events.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: '12px' }}>
          <p style={{ color: 'var(--color-text-muted)' }}>You haven't created any events yet.</p>
        </div>
      ) : (
        <div style={styles.list}>
          {events.map((evt) => (
            <div key={evt.id} className="card" style={styles.eventCard}>
              <div style={styles.eventHeader}>
                <h3 style={styles.eventTitle}>{evt.title} <span style={styles.collegeName}>at {evt.collegeId}</span></h3>
                <span className={`badge`} style={{ 
                  backgroundColor: evt.status === 'approved' ? 'var(--color-success)' : evt.status === 'rejected' ? 'var(--color-danger)' : 'var(--color-warning)', 
                  color: 'white',
                  textTransform: 'capitalize'
                }}>
                  {evt.status || 'pending'}
                </span>
              </div>
              
              <p style={styles.eventDesc}>{evt.description || 'No description provided.'}</p>
              
              <div style={styles.eventFooter}>
                <div style={styles.eventMeta}>
                  {evt.date && <span style={styles.metaItem}><Calendar size={14} /> {evt.date}</span>}
                  {evt.time && <span style={styles.metaItem}><Clock size={14} /> {evt.time}</span>}
                </div>
                
                {evt.status === 'approved' && (
                  <button className="btn btn-secondary" style={styles.editBtn} onClick={() => handleEditClick(evt)}>
                    <Edit3 size={14} /> Edit Event
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

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
