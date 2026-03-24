/**
 * ONE-TIME SETUP SCRIPT
 * Run this once to create the admin and organizer accounts in Firebase.
 *
 * HOW TO RUN:
 *  1. Open http://localhost:5173 in your browser
 *  2. Open DevTools (F12) → Console
 *  3. Paste and run this entire script
 *
 * After running, delete or ignore this file — you won't need it again.
 */

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';

const accounts = [
  {
    email: 'admin@iiitn.ac.in',
    password: '123456',
    role: 'admin',
    name: 'Admin',
    collegeId: 'iiitn.ac.in',
  },
  {
    email: 'student@iiitn.ac.in',
    password: '123456',
    role: 'organizer',
    name: 'Student Organizer',
    collegeId: 'iiitn.ac.in',
  },
];

export const setupAccounts = async () => {
  for (const account of accounts) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, account.email, account.password);
      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        email: account.email,
        name: account.name,
        role: account.role,
        collegeId: account.collegeId,
      });
      console.log(`✅ Created: ${account.email} (role: ${account.role})`);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        console.warn(`⚠️  Already exists: ${account.email} — skipped`);
      } else {
        console.error(`❌ Failed for ${account.email}:`, err.message);
      }
    }
  }
  console.log('🎉 Setup complete!');
};
