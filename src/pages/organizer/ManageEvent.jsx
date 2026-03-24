import React, { useState } from 'react';
import { Search, Edit3, Trash2, Megaphone, X } from 'lucide-react';

const ManageEvent = () => {
  const [activeTab, setActiveTab] = useState('Participants');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAnnounceModalOpen, setIsAnnounceModalOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    date: 'July 15 - 17, 2026',
    location: 'New York University, NY',
    fee: '0',
    prizePool: '1000'
  });
  
  const participants = [
    { id: 1, name: 'Alice Chen', email: 'alice@nyu.edu', status: 'Confirmed', ticket: 'General' },
    { id: 2, name: 'Bob Smith', email: 'bob@columbia.edu', status: 'Pending', ticket: 'VIP' },
    { id: 3, name: 'Charlie Dave', email: 'charlie@cornell.edu', status: 'Confirmed', ticket: 'General' },
    { id: 4, name: 'Diana Prince', email: 'diana@nyu.edu', status: 'Confirmed', ticket: 'Early Bird' }
  ];

  return (
    <div>
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Manage HackNY Summer 2026</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Date: {eventDetails.date} | Location: {eventDetails.location} <br/>
            Fee: ${eventDetails.fee} | Prize Pool: ${eventDetails.prizePool}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary" onClick={() => setIsEditModalOpen(true)}><Edit3 size={16} /> Edit Details</button>
          <button className="btn btn-primary" onClick={() => setIsAnnounceModalOpen(true)}><Megaphone size={16} /> New Announcement</button>
        </div>
      </div>

      <div className="card" style={styles.contentCard}>
        <div style={styles.tabsContainer}>
          {['Participants', 'Announcements', 'Queries'].map(tab => (
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
          {activeTab === 'Participants' && (
            <div>
              <div style={styles.toolbar}>
                <div style={styles.searchBox}>
                  <Search size={16} style={{ color: 'var(--color-text-muted)', marginLeft: '0.75rem' }} />
                  <input type="text" placeholder="Search participants..." style={styles.searchInput} />
                </div>
                <button className="btn btn-secondary">Export CSV</button>
              </div>

              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Name</th>
                      <th style={styles.th}>Email</th>
                      <th style={styles.th}>Ticket Type</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((p, i) => (
                      <tr key={p.id} style={{ borderBottom: i === participants.length - 1 ? 'none' : '1px solid var(--color-border)' }}>
                        <td style={styles.td}><strong>{p.name}</strong></td>
                        <td style={styles.td}>{p.email}</td>
                        <td style={styles.td}>{p.ticket}</td>
                        <td style={styles.td}>
                          <span className={`badge ${p.status === 'Confirmed' ? 'badge-primary' : ''}`}>
                            {p.status}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <button className="btn btn-ghost" style={{ padding: '0.25rem' }}><Edit3 size={16} /></button>
                          <button className="btn btn-ghost" style={{ padding: '0.25rem', color: 'var(--color-danger)' }}><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'Announcements' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ fontWeight: 600 }}>Location Update</p>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Posted 2 days ago</p>
                </div>
                <p style={{ marginTop: '0.5rem', fontSize: 'var(--font-size-sm)' }}>HackNY updated the event location to Room 402.</p>
              </div>
            </div>
          )}

          {activeTab === 'Queries' && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 600 }}>Is there a code of conduct?</p>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Asked by Student B</p>
                  </div>
                  <span className="badge" style={{ backgroundColor: 'var(--color-warning)', color: '#fff', border: 'none' }}>Unanswered</span>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <textarea className="input-field" rows="2" placeholder="Write a reply to the student..."></textarea>
                  <button className="btn btn-primary" style={{ marginTop: '0.75rem' }}>Submit Reply</button>
                </div>
              </div>

              <div style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 600 }}>Will there be hardware lending?</p>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Asked by Anonymous</p>
                  </div>
                  <span className="badge badge-primary">Answered</span>
                </div>
                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: 'var(--border-radius-sm)' }}>
                  <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: '0.25rem' }}>Your Reply:</p>
                  <p style={{ fontSize: 'var(--font-size-sm)' }}>Yes! We will have a hardware lab sponsored by Major League Hacking.</p>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {isEditModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2>Edit Event Details</h2>
              <button style={styles.closeBtn} onClick={() => setIsEditModalOpen(false)}><X size={20} /></button>
            </div>
            <div className="input-group">
              <label className="input-label">Event Date</label>
              <input type="text" className="input-field" value={eventDetails.date} onChange={(e) => setEventDetails({...eventDetails, date: e.target.value})} />
            </div>
            <div className="input-group">
              <label className="input-label">Location</label>
              <input type="text" className="input-field" value={eventDetails.location} onChange={(e) => setEventDetails({...eventDetails, location: e.target.value})} />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
                <label className="input-label">Registration Fee ($)</label>
                <input type="number" className="input-field" value={eventDetails.fee} onChange={(e) => setEventDetails({...eventDetails, fee: e.target.value})} min="0" />
              </div>
              <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
                <label className="input-label">Prize Pool ($)</label>
                <input type="number" className="input-field" value={eventDetails.prizePool} onChange={(e) => setEventDetails({...eventDetails, prizePool: e.target.value})} min="0" />
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => setIsEditModalOpen(false)}>Save Changes</button>
          </div>
        </div>
      )}

      {isAnnounceModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2>Send Notification</h2>
              <button style={styles.closeBtn} onClick={() => setIsAnnounceModalOpen(false)}><X size={20} /></button>
            </div>
            <div className="input-group">
              <label className="input-label">Message</label>
              <textarea className="input-field" rows="4" placeholder="Enter your announcement here..."></textarea>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <input type="checkbox" id="emailNotif" defaultChecked />
              <label htmlFor="emailNotif" style={{ fontSize: 'var(--font-size-sm)' }}>Send via Email too</label>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => { alert('Notification Sent!'); setIsAnnounceModalOpen(false); }}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 'var(--spacing-8)'
  },
  pageTitle: {
    fontSize: 'var(--font-size-2xl)',
    marginBottom: '0.25rem'
  },
  contentCard: {
    overflow: 'hidden'
  },
  tabsContainer: {
    display: 'flex',
    gap: 'var(--spacing-2)',
    borderBottom: '1px solid var(--color-border)',
    padding: '0 var(--spacing-6)',
    backgroundColor: 'var(--color-surface)'
  },
  tabBtn: {
    background: 'none',
    border: 'none',
    padding: '1rem 0.5rem',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)',
    fontWeight: 500,
    cursor: 'pointer',
    position: 'relative',
    marginRight: '1.5rem'
  },
  activeTabBtn: {
    color: 'var(--color-primary)',
    borderBottom: '2px solid var(--color-primary)'
  },
  tabContent: {
    padding: 'var(--spacing-6)'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 'var(--spacing-6)'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--border-radius-md)',
    width: '300px',
    backgroundColor: 'var(--color-surface)'
  },
  searchInput: {
    flex: 1,
    border: 'none',
    background: 'none',
    padding: '0.5rem 0.75rem',
    outline: 'none',
    fontSize: 'var(--font-size-sm)'
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  th: {
    padding: '1rem',
    fontSize: 'var(--font-size-xs)',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    fontWeight: 600,
    borderBottom: '1px solid var(--color-border)'
  },
  td: {
    padding: '1rem',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-main)'
  },
  emptyState: {
    padding: '4rem 0',
    textAlign: 'center'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: 'var(--color-surface)',
    padding: 'var(--spacing-6)',
    borderRadius: 'var(--border-radius-lg)',
    width: '400px',
    maxWidth: '90%',
    boxShadow: 'var(--shadow-lg)'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--color-text-muted)'
  }
};

export default ManageEvent;
