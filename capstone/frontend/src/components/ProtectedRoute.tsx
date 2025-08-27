import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';

// ProtectedRoute component ensures that only authenticated users can access its children components.

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { ensureAdopter } = useAuth();
  const hasBootstrappedRef = useRef(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && !hasBootstrappedRef.current) {
      hasBootstrappedRef.current = true;
      ensureAdopter().catch(() => {});
    }
  }, [isAuthenticated, isLoading, ensureAdopter]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
