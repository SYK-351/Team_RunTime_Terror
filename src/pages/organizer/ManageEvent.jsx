import React, { useState } from 'react';
import { Search, Edit3, Trash2, Megaphone } from 'lucide-react';

const ManageEvent = () => {
  const [activeTab, setActiveTab] = useState('Participants');
  
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
          <p style={{ color: 'var(--color-text-muted)' }}>Event Date: July 15 - 17, 2026</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary"><Edit3 size={16} /> Edit Details</button>
          <button className="btn btn-primary"><Megaphone size={16} /> New Announcement</button>
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
          
          {activeTab !== 'Participants' && (
            <div style={styles.emptyState}>
              <p style={{ color: 'var(--color-text-muted)' }}>You have no items in this tab yet.</p>
            </div>
          )}
        </div>
      </div>
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
  }
};

export default ManageEvent;
