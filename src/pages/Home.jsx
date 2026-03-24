import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { Search, MapPin, Sparkles } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const CATEGORIES = ['All', 'Hackathon', 'Culture', 'Sports', 'Coding', 'Workshop'];

const CUSTOM_EVENTS = [
  {
    id: 'custom-1',
    title: 'CodeSprint 2026 – 24h Hackathon',
    organizer: 'IIT Hyderabad',
    category: 'Hackathon',
    date: 'Apr 12, 2026',
    location: 'Sangareddy, Telangana',
    attendees: 320,
    price: 0,
    tags: ['AI', 'Open Source', 'Prize Pool'],
    color: '#6366f1',
  },
  {
    id: 'custom-2',
    title: 'Spring Cultural Fest 2026',
    organizer: 'IIT Bombay',
    category: 'Culture',
    date: 'Apr 18, 2026',
    location: 'Mumbai, Maharashtra',
    attendees: 850,
    price: 10,
    tags: ['Music', 'Dance', 'Art'],
    color: '#ec4899',
  },
  {
    id: 'custom-3',
    title: 'Inter-College Football League',
    organizer: 'VNIT Nagpur',
    category: 'Sports',
    date: 'Apr 25, 2026',
    location: 'Nagpur, Maharashtra',
    attendees: 600,
    price: 5,
    tags: ['Football', 'Championship', 'Live'],
    color: '#f59e0b',
  },
  {
    id: 'custom-4',
    title: 'Web3 & Blockchain Workshop',
    organizer: 'IIIT Nagpur',
    category: 'Workshop',
    date: 'May 3, 2026',
    location: 'Nagpur, Maharashtra',
    attendees: 210,
    price: 0,
    tags: ['Blockchain', 'Web3', 'Free'],
    color: '#10b981',
  },
  {
    id: 'custom-5',
    title: 'DSA Masterclass – Crack FAANG',
    organizer: 'TGPCET',
    category: 'Coding',
    date: 'May 10, 2026',
    location: 'Nagpur, Maharashtra',
    attendees: 475,
    price: 20,
    tags: ['DSA', 'Interview Prep', 'FAANG'],
    color: '#3b82f6',
  },
  {
    id: 'custom-6',
    title: 'Design-a-thon: UI/UX Challenge',
    organizer: 'IIT Hyderabad',
    category: 'Hackathon',
    date: 'May 17, 2026',
    location: 'Sangareddy, Telangana',
    attendees: 180,
    price: 0,
    tags: ['UI/UX', 'Figma', 'Design'],
    color: '#8b5cf6',
  },
];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { isWishlisted, toggleWishlist } = useNotification();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'events'), where('status', '==', 'approved'));
        const sn = await getDocs(q);
        const fbEvents = sn.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          category: doc.data().category || 'Hackathon',
          price: doc.data().fee || 0,
          tags: doc.data().tags || ['Event'],
          attendees: doc.data().attendees || 0,
          date: doc.data().date || 'TBA',
          organizer: doc.data().hostOrganization || doc.data().collegeId || 'Unknown'
        }));
        setEvents(fbEvents);
      } catch (err) {
        console.error("Error fetching live events:", err);
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div className="container">
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>Discover Amazing Events</h1>
            <p style={styles.heroSub}>Find the best hackathons, sports, and cultural events happening around you.</p>
            
            <div style={styles.heroSearch}>
              <Search style={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="What do you want to experience?" 
                style={styles.heroInput} 
              />
              <button className="btn btn-primary" style={{ height: '100%', borderRadius: '0 var(--border-radius-full) var(--border-radius-full) 0', padding: '0 2rem' }}>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Category Filters */}
        <section style={styles.section}>
          <div style={styles.categoriesWrapper}>
            {CATEGORIES.map(category => (
              <button 
                key={category}
                className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-secondary'}`}
                style={styles.categoryBtn}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Recommended Section */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              <Sparkles size={24} color="var(--color-primary)" />
              Recommended for You
            </h2>
            <button className="btn btn-ghost">View All</button>
          </div>
          
          {loading ? (
             <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading live events...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-6)' }}>
              {[...CUSTOM_EVENTS, ...events]
                .filter(e => activeCategory === 'All' || e.category === activeCategory)
                .map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          )}
        </section>

        {/* College Wishlist Section */}
        <section style={{ ...styles.section, marginTop: 'var(--spacing-8)' }}>
          <div style={styles.collegeExplorer}>
            <div style={styles.collegeContent}>
              <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>Follow Colleges</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-6)' }}>Add colleges to your wishlist to get notified when they host new events!</p>
              
              <div style={styles.collegeGrid}>
                {['IIT Hyderabad', 'IIT Bombay', 'IIIT Nagpur', 'VNIT Nagpur', 'TGPCET'].map((college) => {
                  const isWishlistedStatus = isWishlisted(college);
                  return (
                    <div key={college} className="card" style={styles.collegeCard}>
                      <div style={styles.collegeCardBrand}>
                        <div style={styles.collegeAvatar}>{college.charAt(0)}</div>
                        <p style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{college}</p>
                      </div>
                      <button 
                        className={`btn ${isWishlistedStatus ? 'btn-primary' : 'btn-secondary'}`} 
                        style={{ padding: '0.4rem 0.8rem', fontSize: 'var(--font-size-xs)' }}
                        onClick={() => toggleWishlist(college)}
                      >
                        {isWishlistedStatus ? '❤️ Following' : '🤍 Follow'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const styles = {
  page: {
    paddingBottom: 'var(--spacing-12)'
  },
  hero: {
    backgroundColor: 'var(--color-surface)',
    padding: 'var(--spacing-12) 0',
    borderBottom: '1px solid var(--color-border)',
    backgroundImage: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.05), transparent 40%)'
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center'
  },
  heroTitle: {
    fontSize: 'var(--font-size-3xl)',
    marginBottom: 'var(--spacing-4)',
    background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 800
  },
  heroSub: {
    fontSize: 'var(--font-size-lg)',
    marginBottom: 'var(--spacing-8)',
    color: 'var(--color-text-muted)'
  },
  heroSearch: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--color-background)',
    borderRadius: 'var(--border-radius-full)',
    border: '1px solid var(--color-border)',
    height: '3.5rem',
    position: 'relative',
    boxShadow: 'var(--shadow-lg)'
  },
  searchIcon: {
    position: 'absolute',
    left: '1.25rem',
    color: 'var(--color-text-muted)'
  },
  heroInput: {
    flex: 1,
    height: '100%',
    border: 'none',
    backgroundColor: 'transparent',
    paddingLeft: '3rem',
    outline: 'none',
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-main)'
  },
  section: {
    marginTop: 'var(--spacing-8)'
  },
  categoriesWrapper: {
    display: 'flex',
    gap: 'var(--spacing-3)',
    overflowX: 'auto',
    paddingBottom: 'var(--spacing-2)',
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none' // IE/Edge
  },
  categoryBtn: {
    whiteSpace: 'nowrap'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-6)'
  },
  sectionTitle: {
    fontSize: 'var(--font-size-xl)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-2)'
  },
  collegeExplorer: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--border-radius-xl)',
    padding: 'var(--spacing-8)',
    display: 'flex',
    gap: 'var(--spacing-8)',
    boxShadow: 'var(--shadow-sm)',
    overflow: 'hidden',
    position: 'relative'
  },
  collegeContent: {
    flex: 1,
    zIndex: 1
  },
  collegeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 'var(--spacing-4)'
  },
  collegeCard: {
    padding: 'var(--spacing-4)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-3)',
    alignItems: 'center',
    textAlign: 'center',
    border: '1px solid var(--color-border)',
    boxShadow: 'none'
  },
  collegeCardBrand: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-2)'
  },
  collegeAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'var(--font-size-lg)',
    fontWeight: 'bold'
  }
};

export default Home;
