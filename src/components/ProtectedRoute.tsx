'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-var(--cid-light)">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-[var(--cid-coral)] border-t-transparent"></div>
          <p className="text-sm font-medium text-[var(--cid-gray-700)]">Checking authorization...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};
export default ProtectedRoute;
