import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import type { Credits, CreditsBalance } from '../types';

export default function useCredits() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [credits, setCredits] = useState<Credits | null>(null);
  const [balance, setBalance] = useState<CreditsBalance>({ current_kibbles: 0, total_purchased: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredits = async () => {
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

      const adopterResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/me`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user?.email || '',
          name: user?.name || '',
          picture_url: user?.picture || '',
        }),
      });

      if (!adopterResponse.ok) {
        throw new Error('Failed to fetch adopter data');
      }

      const adopterData = await adopterResponse.json();
      const adopterId = adopterData.adopter.id;

      // Fetch the user's credits
      const creditsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/credits/adopter/${adopterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (creditsResponse.ok) {
        const creditsData = await creditsResponse.json();
        setCredits(creditsData);
        setBalance({
          current_kibbles: parseFloat(creditsData.current_kibbles),
          total_purchased: parseFloat(creditsData.total_purchased),
        });
      } else if (creditsResponse.status === 404) {
        // No credits record exists - this is fine, user just hasn't made any purchases yet
        setCredits(null);
        setBalance({ current_kibbles: 0, total_purchased: 0 });
      } else {
        throw new Error('Failed to fetch credits');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setBalance({ current_kibbles: 0, total_purchased: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  const addCredits = async (kibblesToAdd: number) => {
    if (!isAuthenticated) return;

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      // Get adopter ID if we don't have it
      let adopterId = credits?.adopter_id;
      if (!adopterId) {
        const adopterResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/me`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user?.email || '',
            name: user?.name || '',
            picture_url: user?.picture || '',
          }),
        });
        
        if (!adopterResponse.ok) {
          throw new Error('Failed to fetch adopter data');
        }
        
        const adopterData = await adopterResponse.json();
        adopterId = adopterData.adopter.id;
      }

      // If no credits record exists, create one with the new kibbles
      if (!credits) {
        const createResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/credits/create`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            adopter_id: adopterId,
            initial_kibbles: kibblesToAdd,
          }),
        });

        if (createResponse.ok) {
          const newCredits = await createResponse.json();
          setCredits(newCredits);
          setBalance({
            current_kibbles: parseFloat(newCredits.current_kibbles),
            total_purchased: parseFloat(newCredits.total_purchased),
          });
          return newCredits;
        } else {
          throw new Error('Failed to create credits record');
        }
      } else {
        // Update existing credits record
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/credits/add`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            adopter_id: adopterId,
            kibbles_to_add: kibblesToAdd,
          }),
        });

        if (response.ok) {
          const updatedCredits = await response.json();
          setCredits(updatedCredits);
          setBalance({
            current_kibbles: parseFloat(updatedCredits.current_kibbles),
            total_purchased: parseFloat(updatedCredits.total_purchased),
          });
          return updatedCredits;
        } else {
          throw new Error('Failed to add credits');
        }
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  };

  const subtractCredits = async (kibblesToSubtract: number) => {
    if (!credits || !isAuthenticated) {
      throw new Error('No credits available to subtract');
    }

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/credits/subtract`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adopter_id: credits.adopter_id,
          kibbles_to_subtract: kibblesToSubtract,
        }),
      });

      if (response.ok) {
        const updatedCredits = await response.json();
        setCredits(updatedCredits);
        setBalance({
          current_kibbles: parseFloat(updatedCredits.current_kibbles),
          total_purchased: parseFloat(updatedCredits.total_purchased),
        });
        return updatedCredits;
      } else {
        throw new Error('Failed to subtract credits');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  };

  const refreshCredits = () => {
    fetchCredits();
  };

  return {
    credits,
    balance,
    loading,
    error,
    addCredits,
    subtractCredits,
    refreshCredits,
  };
}
