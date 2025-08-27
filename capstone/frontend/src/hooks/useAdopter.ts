import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import type { Adopter } from '../types';

export const useAdopter = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [adopter, setAdopter] = useState<Adopter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdopter = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          },
        });

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/me`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            picture_url: user.picture,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch adopter data');
        }

        const data = await response.json();
        setAdopter(data.adopter);
      } catch (err) {
        console.error('Error fetching adopter:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAdopter();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return { adopter, loading, error };
};
