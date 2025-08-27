// https://auth0.com/docs/quickstart/spa/react/02-calling-an-api#get-an-access-token
// https://auth0.com/blog/complete-guide-to-react-user-authentication/

import HeaderPostLogin from '../components/HeaderPostLogin';
import ProfileCard from '../components/ProfileCard';

const Profile = () => {
  return (
    <>
      <HeaderPostLogin title="Profile" />
      <div className="px-4">
        <ProfileCard />
      </div>
    </>
  );
};

export default Profile;
