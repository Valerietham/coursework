import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import type { InterestWithCat } from '../types';

export default function useInterests() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [interests, setInterests] = useState<InterestWithCat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterests = async () => {
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

        const adopterResponse = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/me`,
          {
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
          }
        );

        if (!adopterResponse.ok) {
          throw new Error('Failed to fetch adopter data');
        }

        const adopterData = await adopterResponse.json();
        const adopterId = adopterData.adopter.id;

        // Then fetch the user's likes
        const interestsResponse = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/interests/adopter/${adopterId}/likes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!interestsResponse.ok) {
          throw new Error('Failed to fetch interests');
        }

        const data = await interestsResponse.json();
        setInterests(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchInterests();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  const likedCats = interests.map((interest) => interest.cat);

  return { interests, likedCats, loading, error };
}
