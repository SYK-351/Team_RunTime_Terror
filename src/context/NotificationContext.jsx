import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const [registeredEvents, setRegisteredEvents] = useState(() => {
    const saved = localStorage.getItem('registeredEvents');
    return saved ? JSON.parse(saved) : [];
  });

  const [remindersSent, setRemindersSent] = useState(() => {
    const saved = localStorage.getItem('remindersSent');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents));
  }, [registeredEvents]);

  useEffect(() => {
    localStorage.setItem('remindersSent', JSON.stringify(remindersSent));
  }, [remindersSent]);

  // Utility to push notification
  const addNotification = (type, message) => {
    const newNotif = {
      id: Date.now().toString() + Math.random().toString(),
      type,
      message,
      read: false,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // --- Wishlist Features ---
  const toggleWishlist = (college) => {
    setWishlist(prev => {
      if (prev.includes(college)) {
        return prev.filter(c => c !== college);
      } else {
        return [...prev, college];
      }
    });
  };

  const isWishlisted = (college) => wishlist.includes(college);

  const triggerWishlistNotification = (eventName, college) => {
    if (wishlist.includes(college)) {
      addNotification('Wishlist', `New event in your wishlist college: ${eventName} at ${college}`);
    }
  };

  // --- Registration / Reminder Features ---
  const registerForEvent = (eventData) => {
    if (!registeredEvents.find(e => e.id === eventData.id)) {
      setRegisteredEvents(prev => [...prev, eventData]);
      addNotification('Update', `Successfully registered for ${eventData.title}!`);
    }
  };

  const isRegistered = (eventId) => {
    return !!registeredEvents.find(e => e.id === eventId);
  };

  // Scheduler to check upcoming events
  useEffect(() => {
    // Run every 10 seconds to simulate background checks for Hackathon purposes
    const intervalId = setInterval(() => {
      const now = new Date();

      registeredEvents.forEach(evt => {
        // Parse date
        const eventDate = new Date(evt.date); // assuming format '2026-08-20' etc.
        if (isNaN(eventDate.getTime())) return;

        const diffTime = eventDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let triggerDays = null;
        if (diffDays === 7) triggerDays = 7;
        else if (diffDays === 3) triggerDays = 3;
        else if (diffDays === 1) triggerDays = 1;

        // Ensure we don't spam reminders if they were already sent
        const reminderKey = `${evt.id}_${triggerDays}days`;

        if (triggerDays && !remindersSent[reminderKey]) {
          addNotification('Reminder', `Reminder: Your registered event ${evt.title} is in ${triggerDays} days!`);
          setRemindersSent(prev => ({ ...prev, [reminderKey]: true }));
        }
      });
    }, 10000); // 10s check

    return () => clearInterval(intervalId);
  }, [registeredEvents, remindersSent]);

  // --- Announcement / Updates Features ---
  const triggerAnnouncement = (eventName) => {
    if (registeredEvents.some(e => e.title === eventName)) {
      addNotification('Announcement', `New announcement for ${eventName}!`);
    } else {
      console.log(`Announcement suppressed: Not registered for ${eventName}`);
    }
  };

  const triggerUpdate = (eventName) => {
    if (registeredEvents.some(e => e.title === eventName)) {
      addNotification('Update', `Update: ${eventName} details have changed.`);
    } else {
      console.log(`Update suppressed: Not registered for ${eventName}`);
    }
  };

  return (
    <NotificationContext.Provider value={{
      wishlist, toggleWishlist, isWishlisted,
      notifications, markAsRead, markAllAsRead, clearAllNotifications,
      registeredEvents, registerForEvent, isRegistered,
      triggerWishlistNotification, triggerAnnouncement, triggerUpdate
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
