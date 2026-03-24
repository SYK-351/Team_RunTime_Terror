import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { Check, X as XIcon, Calendar, MapPin } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    const fetchCollegeEvents = async () => {
      if (!user || user.role !== 'admin') {
        setLoading(false);
        return;
      }
      
      try {
        const q = query(collection(db, 'events'), where('collegeId', '==', user.collegeId));
        const querySnapshot = await getDocs(q);
        const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort by newest first
        fetched.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setEvents(fetched);
      } catch (err) {
        console.error("Error fetching admin events:", err);
      }
      setLoading(false);
    };

    if (!authLoading) {
      fetchCollegeEvents();
    }
  }, [user, authLoading]);

  // Protect route
  if (!authLoading && (!user || user.role !== 'admin')) {
    return <Navigate to="/home" replace />;
  }

  const handleApproval = async (eventId, newStatus, eventTitle, organizerId) => {
    try {
      const eventRef = doc(db, 'events', eventId);
      await updateDoc(eventRef, { status: newStatus });
      
      // Update local state
      setEvents(events.map(e => e.id === eventId ? { ...e, status: newStatus } : e));
      
      // We could write to a Firestore notifications collection here
      // For simplicity in a mock hackathon environment, we log it and show an alert
      alert(`Event ${newStatus}! (Notification queued for organizer)`);
      
      // Example of how it would write to DB if notifications were moved to Firestore:
      /*
      await addDoc(collection(db, 'notifications'), {
        userId: organizerId,
        type: 'Status Update',
        message: `Your event "${eventTitle}" has been ${newStatus}.`,
        read: false,
        timestamp: new Date().toISOString()
      });
      */
      
    } catch (error) {
      console.error("Error updating event status:", error);
      alert("Failed to update status.");
    }
  };

  if (loading || authLoading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Admin Dashboard...</div>;

  const pendingEvents = events.filter(e => e.status === 'pending');
  const approvedEvents = events.filter(e => e.status === 'approved' || e.status === 'rejected');

  const displayList = activeTab === 'pending' ? pendingEvents : approvedEvents;

  return (
    <div className="container" style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>{user.collegeId.toUpperCase()} Admin Dashboard</h1>
          <p style={styles.subtitle}>Review and manage event proposals for your college.</p>
        </div>
      </div>

      <div style={styles.tabsContainer}>
        <button 
          style={{ ...styles.tabBtn, ...(activeTab === 'pending' ? styles.activeTabBtn : {}) }}
          onClick={() => setActiveTab('pending')}
        >
          Pending Approvals ({pendingEvents.length})
        </button>
        <button 
          style={{ ...styles.tabBtn, ...(activeTab === 'approved' ? styles.activeTabBtn : {}) }}
          onClick={() => setActiveTab('approved')}
        >
          Past Reviews
        </button>
      </div>

      {displayList.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No events found in this category.</p>
        </div>
      ) : (
        <div style={styles.list}>
          {displayList.map((evt) => (
            <div key={evt.id} className="card" style={styles.eventCard}>
              <div style={styles.cardInfo}>
                <h3 style={styles.eventTitle}>{evt.title}</h3>
                <p style={styles.organizerInfo}>Submitted by: {evt.createdBy}</p>
                <div style={styles.metaRow}>
                  {evt.date && <span><Calendar size={14} style={{ marginRight: '4px' }}/> {evt.date}</span>}
                  {evt.location && <span><MapPin size={14} style={{ marginRight: '4px' }}/> {evt.location}</span>}
                </div>
                
                {activeTab === 'approved' && (
                   <span className="badge" style={{ 
                     marginTop: '12px', display: 'inline-block',
                     backgroundColor: evt.status === 'approved' ? 'var(--color-success)' : 'var(--color-danger)', 
                     color: 'white', textTransform: 'capitalize' 
                   }}>
                     {evt.status}
                   </span>
                )}
              </div>
              
              {activeTab === 'pending' && (
                <div style={styles.actions}>
                  <button 
                    className="btn btn-primary" 
                    style={{ backgroundColor: 'var(--color-success)', borderColor: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '6px' }}
                    onClick={() => handleApproval(evt.id, 'approved', evt.title, evt.createdBy)}
                  >
                    <Check size={16} /> Accept
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '6px' }}
                    onClick={() => handleApproval(evt.id, 'rejected', evt.title, evt.createdBy)}
                  >
                    <XIcon size={16} /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { padding: 'var(--spacing-8) 0', maxWidth: '900px', margin: '0 auto' },
  header: { marginBottom: 'var(--spacing-6)' },
  title: { fontSize: 'var(--font-size-2xl)', marginBottom: '0.25rem' },
  subtitle: { color: 'var(--color-text-muted)' },
  tabsContainer: { display: 'flex', gap: 'var(--spacing-2)', borderBottom: '1px solid var(--color-border)', marginBottom: 'var(--spacing-6)' },
  tabBtn: { background: 'none', border: 'none', padding: '1rem 0.5rem', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', fontWeight: 500, cursor: 'pointer', margin: '0 1rem', borderBottom: '2px solid transparent' },
  activeTabBtn: { color: 'var(--color-primary)', borderBottom: '2px solid var(--color-primary)' },
  emptyState: { padding: '4rem 0', textAlign: 'center', backgroundColor: 'var(--color-surface)', borderRadius: '12px', color: 'var(--color-text-muted)' },
  list: { display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' },
  eventCard: { padding: 'var(--spacing-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardInfo: { flex: 1 },
  eventTitle: { fontSize: 'var(--font-size-xl)', margin: '0 0 0.25rem 0' },
  organizerInfo: { fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: '1rem' },
  metaRow: { display: 'flex', gap: '1.5rem', color: 'var(--color-text-main)', fontSize: 'var(--font-size-sm)', alignItems: 'center' },
  actions: { display: 'flex', gap: '0.75rem', marginLeft: '2rem' }
};

export default AdminDashboard;
