import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, PlusCircle, BarChart2, Settings } from 'lucide-react';

const Sidebar = () => {
  const links = [
    { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard", end: true },
    { to: "/dashboard/events", icon: <Calendar size={20} />, label: "My Events" },
    { to: "/dashboard/create", icon: <PlusCircle size={20} />, label: "Create Event" },
    { to: "/dashboard/analytics", icon: <BarChart2 size={20} />, label: "Analytics" },
  ];

  return (
    <aside style={styles.sidebar}>
      <div style={styles.content}>
        <div style={styles.sectionTitle}>Organizer Tools</div>
        <nav style={styles.nav}>
          {links.map((link, idx) => (
            <NavLink 
              key={idx} 
              to={link.to} 
              end={link.end}
              style={({ isActive }) => ({
                ...styles.navLink,
                backgroundColor: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: isActive ? 500 : 400
              })}
            >
              <div style={styles.iconWrapper}>{link.icon}</div>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div style={styles.bottomSection}>
        <NavLink 
          to="/dashboard/settings"
          style={({ isActive }) => ({
            ...styles.navLink,
            color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)'
          })}
        >
          <div style={styles.iconWrapper}><Settings size={20} /></div>
          Settings
        </NavLink>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '260px',
    backgroundColor: 'var(--color-surface)',
    borderRight: '1px solid var(--color-border)',
    height: 'calc(100vh - 4rem)',
    position: 'sticky',
    top: '4rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 'var(--spacing-4)'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-4)'
  },
  sectionTitle: {
    fontSize: 'var(--font-size-xs)',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    letterSpacing: '0.05em',
    paddingLeft: 'var(--spacing-3)'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-1)'
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-3)',
    padding: 'var(--spacing-3)',
    borderRadius: 'var(--border-radius-lg)',
    textDecoration: 'none',
    transition: 'all var(--transition-fast)'
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomSection: {
    paddingTop: 'var(--spacing-4)',
    borderTop: '1px solid var(--color-border)'
  }
};

export default Sidebar;
