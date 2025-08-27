import { useAuth0 } from '@auth0/auth0-react';

export const useAuth = () => {
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();

  const ensureAdopter = async () => {
    if (!isAuthenticated) return;
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      },
    });

    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/me`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user?.email,
        name: user?.name,
        picture_url: user?.picture,
      }),
    });
  };

  return { user, isAuthenticated, ensureAdopter };
};
