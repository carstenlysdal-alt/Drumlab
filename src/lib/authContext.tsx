'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from './firebase';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { firestoreService, UserProfile } from './firestoreService';
import { UserPlan, getCompletedExercises, getUserPlan, saveUserPlan, setPremiumStatus } from './mockData';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: () => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  syncCompletedExercises: (completedIds: string[]) => Promise<void>;
  syncLearningPlan: (plan: UserPlan) => Promise<void>;
  syncPremiumStatus: (isPremium: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Monitor real Firebase Authentication status (Lenny Learning style)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      try {
        if (firebaseUser) {
          const email = firebaseUser.email || '';
          const uid = firebaseUser.uid;
          const displayName = firebaseUser.displayName || email.split('@')[0] || 'Trommeslager';
          const photoURL = firebaseUser.photoURL;

          // Fetch profile from db (under /users/{uid}) or create it
          const profile = await firestoreService.createUserProfile(uid, email, displayName, photoURL);
          
          if (typeof window !== 'undefined') {
            localStorage.setItem('pocketdrummer_logged_in_email', email);
            localStorage.setItem('pocketdrummer_logged_in_uid', uid);

            // Merge local storage data into Firestore (so exercises completed logged-out aren't lost)
            const localCompleted = getCompletedExercises();
            const dbCompleted = profile.completedExercises || [];
            const mergedCompleted = Array.from(new Set([...localCompleted, ...dbCompleted]));

            const localPlan = getUserPlan();
            const dbPlan = await firestoreService.getLearningPlan(uid);
            const finalPlan = dbPlan || localPlan;

            const isPremiumLocal = localStorage.getItem('pocketdrummer_premium_active') === 'true';
            const finalPremium = profile.isPremium || isPremiumLocal;

            // Sync to Firestore
            await firestoreService.saveUserProfile(uid, {
              completedExercises: mergedCompleted,
              isPremium: finalPremium
            });

            if (finalPlan) {
              await firestoreService.saveLearningPlan(uid, finalPlan);
              saveUserPlan(finalPlan);
            }

            // Sync back to localStorage
            localStorage.setItem('pocketdrummer_completed', JSON.stringify(mergedCompleted));
            localStorage.setItem('pocketdrummer_premium_active', finalPremium ? 'true' : 'false');

            setUser({
              ...profile,
              completedExercises: mergedCompleted,
              isPremium: finalPremium
            });
          }
        } else {
          // Explicit sign-out
          setUser(null);
          if (typeof window !== 'undefined') {
            localStorage.removeItem('pocketdrummer_logged_in_email');
            localStorage.removeItem('pocketdrummer_logged_in_uid');
            localStorage.removeItem('pocketdrummer_completed');
            localStorage.removeItem('pocketdrummer_user_plan');
            localStorage.setItem('pocketdrummer_premium_active', 'false');
          }
        }
      } catch (err) {
        console.error('Error during Auth state change handler:', err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Login using Google popup
  const login = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Google sign-in popup error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Opret konto med email og password
  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
    } catch (err) {
      console.error('Email sign-up error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Log ind med email og password
  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error('Email sign-in error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Nulstil kodeord
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      console.error('Password reset error:', err);
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign-out error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Sync completed exercises list
  const syncCompletedExercises = async (completedIds: string[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pocketdrummer_completed', JSON.stringify(completedIds));
    }
    if (user) {
      try {
        await firestoreService.saveUserProfile(user.uid, {
          completedExercises: completedIds
        });
        setUser(prev => prev ? { ...prev, completedExercises: completedIds } : null);
      } catch (err) {
        console.error('Error syncing completed exercises:', err);
      }
    }
  };

  // Sync learning plan
  const syncLearningPlan = async (plan: UserPlan) => {
    if (typeof window !== 'undefined') {
      saveUserPlan(plan);
    }
    if (user) {
      try {
        await firestoreService.saveLearningPlan(user.uid, plan);
      } catch (err) {
        console.error('Error syncing learning plan:', err);
      }
    }
  };

  // Sync premium status
  const syncPremiumStatus = async (isPremium: boolean) => {
    setPremiumStatus(isPremium);
    if (user) {
      try {
        await firestoreService.saveUserProfile(user.uid, {
          isPremium
        });
        setUser(prev => prev ? { ...prev, isPremium } : null);
      } catch (err) {
        console.error('Error syncing premium status:', err);
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      signUpWithEmail,
      signInWithEmail,
      resetPassword,
      logout,
      syncCompletedExercises,
      syncLearningPlan,
      syncPremiumStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
