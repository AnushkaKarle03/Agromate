'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('agromate_token');
      const storedUser = localStorage.getItem('agromate_user');

      if (storedToken && storedUser) {
        setState({
          user: JSON.parse(storedUser),
          token: storedToken,
          loading: false,
          isAuthenticated: true,
        });
      } else {
        setState({ user: null, token: null, loading: false, isAuthenticated: false });
      }
    } catch {
      setState({ user: null, token: null, loading: false, isAuthenticated: false });
    }
  }, []);

  const switchRole = async (newRole: 'FARMER' | 'LABOURER' | 'MACHINE_OWNER') => {
    try {
      const res = await fetch('/api/auth/switch-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await res.json();
      if (res.ok) {
        const updatedUser = {
          ...state.user,
          activeRole: newRole,
          currentProfile: data.user?.currentProfile,
        };
        localStorage.setItem('agromate_user', JSON.stringify(updatedUser));
        localStorage.setItem('agromate_token', data.token);
        setState((prev) => ({ ...prev, user: updatedUser, token: data.token }));

        if (newRole === 'FARMER') {
          router.push('/farmer/dashboard');
        } else if (newRole === 'LABOURER') {
          router.push('/labourer/feed');
        } else {
          router.push('/machinery/hub');
        }
      }
    } catch (err) {
      console.error('Role switch failed', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('agromate_token');
    localStorage.removeItem('agromate_user');
    document.cookie = 'agromate_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setState({ user: null, token: null, loading: false, isAuthenticated: false });
    router.push('/auth/login');
  };

  return { ...state, switchRole, logout };
}
