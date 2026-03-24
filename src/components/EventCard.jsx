import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="card card-hoverable" style={styles.card}>
      {/* Banner / Image Placeholder */}
      <div style={{ ...styles.imagePlaceholder, backgroundColor: event.color || 'var(--color-primary)' }}>
        <div style={styles.categoryBadge}>{event.category}</div>
      </div>
      
      <div style={styles.content}>
        <div style={styles.header}>
          <h3 style={styles.title}>{event.title}</h3>
          <p style={styles.organizer}>{event.organizer}</p>
        </div>
        
        <div style={styles.details}>
          <div style={styles.detailRow}>
            <Calendar size={14} style={styles.icon} />
            <span>{event.date}</span>
          </div>
          <div style={styles.detailRow}>
            <MapPin size={14} style={styles.icon} />
            <span>{event.location}</span>
          </div>
          <div style={styles.detailRow}>
            <Users size={14} style={styles.icon} />
            <span>{event.attendees} Attending</span>
          </div>
        </div>

        <div style={styles.tags}>
          {event.tags && event.tags.map((tag, idx) => (
            <span key={idx} className="badge">{tag}</span>
          ))}
        </div>

        <div style={styles.footer}>
          <span style={styles.price}>{event.price === 0 ? 'Free' : `$${event.price}`}</span>
          <Link to={`/events/${event.id}`} className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  imagePlaceholder: {
    height: '140px',
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    padding: 'var(--spacing-3)'
  },
  categoryBadge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'white',
    padding: '0.2rem 0.6rem',
    borderRadius: 'var(--border-radius-sm)',
    fontSize: 'var(--font-size-xs)',
    fontWeight: 500,
    backdropFilter: 'blur(4px)'
  },
  content: {
    padding: 'var(--spacing-4)',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: 'var(--spacing-3)'
  },
  header: {
    marginBottom: 'var(--spacing-1)'
  },
  title: {
    fontSize: 'var(--font-size-lg)',
    marginBottom: '0.25rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  organizer: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-primary)',
    fontWeight: 500
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: 'var(--spacing-2)'
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)'
  },
  icon: {
    color: 'var(--color-text-muted)'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: 'auto',
    marginBottom: 'var(--spacing-4)'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 'var(--spacing-4)',
    borderTop: '1px solid var(--color-border)'
  },
  price: {
    fontWeight: 600,
    color: 'var(--color-text-main)'
  }
};

export default EventCard;
