import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './state/Loading'; // Loading State
import LogoutButton from './buttons/LogoutButton';
import DonateButton from './buttons/DonateButton';
import useCredits from '../hooks/useCredits';
import { Fish } from 'lucide-react';

// Note: ProfileCard component displays user information and kibbles balance. It fetches user metadata from Auth0.
// Profile Template adapted from https://www.creative-tim.com/twcomponents/component/user-profile-card-4

const ProfileCard = () => {
  const { balance, loading } = useCredits();
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } =
    useAuth0();

  const usedKibbles = balance.total_purchased - balance.current_kibbles;

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = 'dev-b3318ouytaiiej8e.us.auth0.com';

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: 'read:current_user',
          },
        });
        console.log(user);

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    isAuthenticated && (
      <>
        <div className="max-w-md mx-auto mt-4 bg-stone-50 shadow-lg rounded-xl overflow-hidden">
          <div className="px-6 pt-20 pb-6">
            {/* Profile Image */}

            <div className="flex justify-center -mt-16">
              <img
                src={user?.picture || '/assets/Profile.gif'}
                alt={user?.name || 'Profile'}
                className="w-24 h-24 rounded-full shadow-xl object-cover"
              />
            </div>

            {/* User Info */}
            <div className="text-center mt-6">
              <h3 className="text-2xl text-slate-700 font-bold mb-1">
                {user?.name}
              </h3>
              <div className="text-sm text-slate-400 font-medium uppercase">
                {user?.email}
              </div>
            </div>

            <div className="text-center h-px w-auto my-4 bg-gray-300"></div>

            {/* Kibbles count */}
            <div className="flex justify-center items-center mt-4 space-x-4">
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium text-gray-500 uppercase mb-2">
                  Available
                </span>
                <div className="flex items-center space-x-2">
                  <Fish />
                  <span className="text-sm font-medium text-gray-700">
                    x{' '}
                    {loading ? '...' : `${balance.current_kibbles.toFixed(0)}`}
                  </span>
                </div>
              </div>

              <div className="h-12 w-px bg-gray-300"></div>

              <div className="flex flex-col items-center">
                <span className="text-xs font-medium text-gray-500 uppercase mb-2">
                  Used
                </span>
                <div className="flex items-center space-x-2">
                  <Fish />
                  <span className="text-sm font-medium text-gray-700">
                    x {loading ? '...' : usedKibbles.toFixed(0)}
                  </span>
                </div>
              </div>

              <div className="h-12 w-px bg-gray-300"></div>

              <div className="flex flex-col items-center">
                <span className="text-xs font-medium text-gray-500 uppercase mb-2">
                  Purchased
                </span>
                <div className="flex items-center space-x-2">
                  <Fish />
                  <span className="text-sm font-medium text-gray-700">
                    x{' '}
                    {loading ? '...' : `${balance.total_purchased.toFixed(0)}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col justify-center gap-4 mt-6">
              <DonateButton />
              <div className="text-center h-px w-auto my-2 bg-gray-300"></div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default ProfileCard;
