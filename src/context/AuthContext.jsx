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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch the user's role and college from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            const role = data.role || 'organizer';
            console.log('[EventFlex] Auth state — user:', firebaseUser.email, '| role:', role);
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: data.name || firebaseUser.email.split('@')[0],
              role,
              collegeId: data.collegeId
            });
          } else {
            // Fallback for demo (if document creation lagged)
            const domain = firebaseUser.email.split('@')[1] || 'unknown.edu';
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.email.split('@')[0],
              role: 'organizer',
              collegeId: domain
            });
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUser({ 
            uid: firebaseUser.uid, 
            email: firebaseUser.email, 
            name: firebaseUser.email.split('@')[0],
            role: 'organizer',
            collegeId: firebaseUser.email.split('@')[1] || 'unknown.edu'
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      // setUser(null) is handled by onAuthStateChanged
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
