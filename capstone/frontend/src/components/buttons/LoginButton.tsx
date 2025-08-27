import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="bg-orange-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-900 transition-colors"
    >
      Sign up
    </button>
  );
};

export default LoginButton;
