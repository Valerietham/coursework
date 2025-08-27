import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import type { CatModel } from '../types';

const useCatDetails = (catId: number | null) => {
  const [cat, setCat] = useState<CatModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!catId) {
      setLoading(false);
      return;
    }

    const fetchCatDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          },
        });

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/cats/${catId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cat details');
        }

        const catData = await response.json();
        setCat(catData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCatDetails();
  }, [catId, getAccessTokenSilently]);

  return { cat, loading, error };
};

export default useCatDetails;
