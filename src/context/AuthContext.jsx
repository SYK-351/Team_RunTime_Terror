import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // 1. Set a basic user immediately so ProtectedRoute unblocks with no delay
        const cachedRole = sessionStorage.getItem(`role_${firebaseUser.uid}`);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.email.split('@')[0],
          role: cachedRole || 'organizer', // use cached role if available
          collegeId: firebaseUser.email.split('@')[1] || 'unknown'
        });
        setLoading(false); // ← unblock routes immediately

        // 2. Fetch full role from Firestore in background (no UI wait)
        if (!cachedRole) {
          getDoc(doc(db, 'users', firebaseUser.uid))
            .then((userDoc) => {
              if (userDoc.exists()) {
                const data = userDoc.data();
                const role = data.role || 'organizer';
                console.log('[EventFlex] Role loaded:', firebaseUser.email, '→', role);
                sessionStorage.setItem(`role_${firebaseUser.uid}`, role); // cache it
                setUser({
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  name: data.name || firebaseUser.email.split('@')[0],
                  role,
                  collegeId: data.collegeId || firebaseUser.email.split('@')[1]
                });
              }
            })
            .catch((err) => console.error('[EventFlex] Role fetch error:', err));
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      // Clear cached role before signing out
      if (user?.uid) sessionStorage.removeItem(`role_${user.uid}`);
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
