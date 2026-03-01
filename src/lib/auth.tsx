import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, API_BASE_URL, publicAnonKey } from './supabase';
import type { User } from '@supabase/supabase-js';

/** تسجيل دخول تجريبي عند عدم توفر Supabase أو عدم وجود مستخدم */
const DEMO_EMAIL = 'admin@local';
const DEMO_PASSWORD = 'Admin123!';
const DEMO_SESSION_KEY = 'erp_demo_session';
const DEMO_SESSION_DAYS = 7;

function createDemoUser(): User {
  return {
    id: 'demo-user-erp-local',
    email: DEMO_EMAIL,
    app_metadata: {},
    user_metadata: { full_name: 'مستخدم تجريبي' },
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  } as User;
}

function getStoredDemoSession(): { user: User } | null {
  try {
    const raw = localStorage.getItem(DEMO_SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data?.expires_at || data.expires_at < Date.now() / 1000) return null;
    return { user: data.user as User };
  } catch {
    return null;
  }
}

function setStoredDemoSession(user: User) {
  const expires_at = Math.floor(Date.now() / 1000) + DEMO_SESSION_DAYS * 86400;
  localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify({ user, expires_at }));
}

function clearStoredDemoSession() {
  localStorage.removeItem(DEMO_SESSION_KEY);
}

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  permissions: string[];
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    console.log('🔐 AuthProvider: Checking active session...');

    const demo = getStoredDemoSession();
    if (demo?.user) {
      console.log('🔐 Demo session found, restoring...');
      setUser(demo.user);
      loadUserRole(demo.user.id);
      return;
    }

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        console.log('🔐 Session found:', !!session);
        
        // Check if session is expired
        if (session?.expires_at) {
          const now = Math.floor(Date.now() / 1000);
          if (session.expires_at <= now) {
            console.log('🗑️ Session expired, clearing...');
            supabase.auth.signOut();
            setUser(null);
            setLoading(false);
            return;
          }
        }
        
        setUser(session?.user ?? null);
        if (session?.user) {
          loadUserRole(session.user.id);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('🔐 Error loading session:', error);
        setLoading(false);
      });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('🔐 Auth state changed:', _event, !!session);
      console.log('🔐 Session user:', session?.user?.email);
      
      setUser(session?.user ?? null);
      
      if (session?.user) {
        console.log('✅ User logged in:', session.user.email);
        loadUserRole(session.user.id);
      } else {
        console.log('❌ No user - setting to null');
        setUserRole(null);
        setPermissions([]);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserRole = async (userId: string) => {
    try {
      console.log('🔐 Loading user role for:', userId);
      
      // In offline mode, always set admin role for logged-in users
      console.log('📦 Offline mode: Setting default admin role');
      setUserRole('admin');
      setPermissions(['*']); // All permissions
      setLoading(false);
      
      /* Backend integration disabled - using offline mode
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserRole(data.role || 'user');
        setPermissions(data.permissions || []);
      } else {
        setUserRole('user');
        setPermissions([]);
      }
      */
    } catch (error) {
      console.error('Error loading user role:', error);
      // In case of any error, still set admin role in offline mode
      setUserRole('admin');
      setPermissions(['*']);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err: any) {
      // إذا فشل Supabase (400/404)، السماح بالدخول التجريبي
      const isDemo = email === DEMO_EMAIL && password === DEMO_PASSWORD;
      if (isDemo) {
        const demoUser = createDemoUser();
        setStoredDemoSession(demoUser);
        setUser(demoUser);
        loadUserRole(demoUser.id);
        return;
      }
      throw err;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    // Call the signup endpoint on the server
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || 'Signup failed');
    }
  };

  const signOut = async () => {
    clearStoredDemoSession();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const hasPermission = (permission: string) => {
    if (userRole === 'admin') return true;
    return permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, permissions, loading, signIn, signUp, signOut, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}