import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, LogOut, PlusCircle, LayoutDashboard, Settings, Calendar, Building, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/login');
  };

  const isOrganizer = user?.role === 'organizer';

  return (
    <nav style={styles.navbar}>
      <div className="container" style={styles.navContainer}>
        {/* Logo */}
        <Link to="/home" style={styles.logo}>
          <div style={styles.logoIcon}></div>
          <span>Event Flex</span>
        </Link>
        
        {/* Search Bar - Center prominence */}
        <div style={styles.searchWrapper}>
          <Search style={styles.searchIcon} size={18} />
          <input 
            type="text" 
            placeholder="Search events, colleges, clubs..." 
            style={styles.searchInput}
            className="input-field" 
          />
        </div>

        {/* Right Actions */}
        <div style={styles.actions}>
          
          <Link to="/create-event" className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: 'var(--font-size-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '0.5rem' }}>
            <Building size={16} /> Create Event
          </Link>

          {/* Organizer Specific Tools */}
          {isOrganizer && (
            <div style={styles.organizerSection}>
              <Link to="/dashboard" className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: 'var(--font-size-sm)' }}>
                <LayoutDashboard size={16} /> Organizer Panel
              </Link>
              <Link to="/dashboard/create" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: 'var(--font-size-sm)' }}>
                <PlusCircle size={16} /> Create Event
              </Link>
            </div>
          )}

          {/* Notifications Dropdown */}
          <div style={styles.userSection} ref={notifRef}>
            <button 
              className="btn btn-ghost" 
              style={styles.iconBtn}
              onClick={() => setIsNotifOpen(!isNotifOpen)}
            >
              <Bell size={20} />
              <span style={styles.notificationDot}></span>
            </button>

            {isNotifOpen && (
              <div style={{ ...styles.dropdown, width: '300px' }}>
                <div style={{ ...styles.dropdownHeader, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={styles.dropdownName}>Notifications</p>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary)', cursor: 'pointer' }}>Mark all read</span>
                </div>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'rgba(99, 102, 241, 0.05)' }}>
                    <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></span>
                      New Announcement
                    </p>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                      HackNY updated the event location to Room 402.
                    </p>
                  </div>
                  <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }}>
                    <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>Reply to your Query</p>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                      Organizer answered: "Yes, teams can be cross-college."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* User Profile Dropdown */}
          <div style={styles.userSection} ref={profileRef}>
            <button 
              style={styles.profileTrigger} 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div style={styles.avatar}>
                {user ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <ChevronDown size={14} style={{ color: 'var(--color-text-muted)' }} />
            </button>

            {isProfileOpen && (
              <div style={styles.dropdown}>
                <div style={styles.dropdownHeader}>
                  <p style={styles.dropdownName}>{user?.name}</p>
                  <p style={styles.dropdownEmail}>{user?.email}</p>
                  {isOrganizer && <span className="badge badge-primary" style={{ marginTop: '0.25rem' }}>Organizer</span>}
                </div>
                
                <div style={styles.dropdownMenu}>
                  <Link to="/my-events" className="dropdown-item" style={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                    <Calendar size={16} /> My Participations
                  </Link>
                  <Link to="/my-created-events" className="dropdown-item" style={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                    <Building size={16} /> My Events
                  </Link>
                  <Link to="#" className="dropdown-item" style={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                    <Settings size={16} /> Settings
                  </Link>
                  <div style={styles.dropdownDivider}></div>
                  <button className="dropdown-item" style={{ ...styles.dropdownItem, color: 'var(--color-danger)' }} onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: 'var(--shadow-sm)'
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '4rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: 700,
    fontSize: 'var(--font-size-xl)',
    color: 'var(--color-primary)',
    textDecoration: 'none'
  },
  logoIcon: {
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '0.375rem',
    backgroundColor: 'var(--color-primary)',
    background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
  },
  searchWrapper: {
    position: 'relative',
    flex: '0 1 400px',
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: '0.75rem',
    color: 'var(--color-text-muted)'
  },
  searchInput: {
    width: '100%',
    paddingLeft: '2.5rem',
    borderRadius: 'var(--border-radius-full)',
    backgroundColor: 'var(--color-background)',
    border: '1px solid transparent',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  organizerSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginRight: '1rem',
    paddingRight: '1rem',
    borderRight: '1px solid var(--color-border)'
  },
  iconBtn: {
    position: 'relative',
    padding: '0.5rem',
    borderRadius: 'var(--border-radius-full)'
  },
  notificationDot: {
    position: 'absolute',
    top: '0.25rem',
    right: '0.3rem',
    width: '0.5rem',
    height: '0.5rem',
    backgroundColor: 'var(--color-secondary)',
    borderRadius: '50%',
    border: '2px solid var(--color-surface)'
  },
  userSection: {
    position: 'relative',
    marginLeft: '0.5rem'
  },
  profileTrigger: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.25rem',
    borderRadius: 'var(--border-radius-full)',
    transition: 'background-color var(--transition-fast)'
  },
  avatar: {
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    color: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: 'var(--font-size-sm)'
  },
  dropdown: {
    position: 'absolute',
    top: '110%',
    right: 0,
    width: '220px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--border-radius-lg)',
    boxShadow: 'var(--shadow-hover)',
    border: '1px solid var(--color-border)',
    overflow: 'hidden',
    animation: 'fadeIn 150ms ease-out forwards',
    transformOrigin: 'top right'
  },
  dropdownHeader: {
    padding: '1rem',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-background)'
  },
  dropdownName: {
    fontWeight: 600,
    color: 'var(--color-text-main)',
    fontSize: 'var(--font-size-sm)',
    marginBottom: '0.125rem'
  },
  dropdownEmail: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-text-muted)'
  },
  dropdownMenu: {
    padding: '0.5rem 0'
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '0.625rem 1rem',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-main)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    textDecoration: 'none',
    transition: 'background-color var(--transition-fast)'
  },
  dropdownDivider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '0.25rem 0'
  }
};

export default Navbar;
