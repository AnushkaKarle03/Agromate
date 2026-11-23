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

  const logout = () => {
    localStorage.removeItem('agromate_token');
    localStorage.removeItem('agromate_user');
    document.cookie = 'agromate_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setState({ user: null, token: null, loading: false, isAuthenticated: false });
    router.push('/auth/login');
  };

  return { ...state, logout };
}
