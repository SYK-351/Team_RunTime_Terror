import React from 'react';
import { Users, TrendingUp, Calendar as CalendarIcon, DollarSign, Activity } from 'lucide-react';

const OrganizerDashboard = () => {
  const stats = [
    { label: 'Total Participants', value: '1,240', trend: '+12% this week', icon: <Users size={24} /> },
    { label: 'Revenue', value: '$8,450', trend: '+5% this week', icon: <DollarSign size={24} /> },
    { label: 'Active Events', value: '3', trend: 'Ongoing', icon: <CalendarIcon size={24} /> },
    { label: 'Page Views', value: '14.2k', trend: '+24% this week', icon: <TrendingUp size={24} /> }
  ];

  const collegeData = [
    { name: 'NYU', count: 450, percentage: 45 },
    { name: 'Columbia', count: 320, percentage: 32 },
    { name: 'Cornell', count: 180, percentage: 18 },
    { name: 'Other', count: 50, percentage: 5 }
  ];

  const recentActivity = [
    { id: 1, action: 'Alice Chen registered for HackNY', time: '5 mins ago' },
    { id: 2, action: 'Bob Smith asked a question', time: '1 hour ago' },
    { id: 3, action: 'New payout processed: $1,200', time: '3 hours ago' },
    { id: 4, action: 'Event "Tech Summit" reached 500 attendees', time: '1 day ago' }
  ];

  return (
    <div>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Dashboard Overview</h1>
        <button className="btn btn-primary">Download Report</button>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <div key={idx} className="card" style={styles.statCard}>
            <div style={styles.statHeader}>
              <div>
                <p style={styles.statLabel}>{stat.label}</p>
                <h3 style={styles.statValue}>{stat.value}</h3>
              </div>
              <div style={styles.statIconWrapper}>{stat.icon}</div>
            </div>
            <p style={styles.statTrend}>{stat.trend}</p>
          </div>
        ))}
      </div>

      <div style={styles.bottomGrid}>
        {/* Participants by College */}
        <div className="card" style={styles.chartCard}>
          <h3 style={styles.cardTitle}>Participants by College</h3>
          <div style={styles.barChart}>
            {collegeData.map((data, idx) => (
              <div key={idx} style={styles.barItem}>
                <div style={styles.barLabelGroup}>
                  <span style={styles.barName}>{data.name}</span>
                  <span style={styles.barCount}>{data.count}</span>
                </div>
                <div style={styles.barTrack}>
                  <div style={{...styles.barFill, width: `${data.percentage}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card" style={styles.activityCard}>
          <h3 style={styles.cardTitle}>Recent Activity</h3>
          <div style={styles.activityList}>
            {recentActivity.map(activity => (
              <div key={activity.id} style={styles.activityItem}>
                <div style={styles.activityIcon}>
                  <Activity size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={styles.activityAction}>{activity.action}</p>
                  <p style={styles.activityTime}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-8)'
  },
  pageTitle: {
    fontSize: 'var(--font-size-2xl)'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 'var(--spacing-6)',
    marginBottom: 'var(--spacing-8)'
  },
  statCard: {
    padding: 'var(--spacing-6)'
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 'var(--spacing-4)'
  },
  statLabel: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)',
    marginBottom: '0.25rem'
  },
  statValue: {
    fontSize: 'var(--font-size-2xl)'
  },
  statIconWrapper: {
    padding: '0.75rem',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    color: 'var(--color-primary)',
    borderRadius: 'var(--border-radius-lg)'
  },
  statTrend: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-success)',
    fontWeight: 500
  },
  bottomGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 'var(--spacing-6)'
  },
  chartCard: {
    padding: 'var(--spacing-6)'
  },
  activityCard: {
    padding: 'var(--spacing-6)'
  },
  cardTitle: {
    fontSize: 'var(--font-size-lg)',
    marginBottom: 'var(--spacing-6)'
  },
  barChart: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-4)'
  },
  barItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  barLabelGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  barName: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 500,
    color: 'var(--color-text-main)'
  },
  barCount: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)'
  },
  barTrack: {
    width: '100%',
    height: '8px',
    backgroundColor: 'var(--color-border)',
    borderRadius: 'var(--border-radius-full)',
    overflow: 'hidden'
  },
  barFill: {
    height: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: 'var(--border-radius-full)'
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-4)'
  },
  activityItem: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start'
  },
  activityIcon: {
    padding: '0.5rem',
    backgroundColor: 'var(--color-background)',
    borderRadius: '50%',
    color: 'var(--color-text-muted)'
  },
  activityAction: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-main)',
    marginBottom: '0.25rem'
  },
  activityTime: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-text-muted)'
  }
};

export default OrganizerDashboard;
