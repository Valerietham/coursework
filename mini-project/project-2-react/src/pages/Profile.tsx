import { LogOut, Cat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="🐾 My Pawfile" />

      {/* Main Content */}
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center text-center">
          <Cat className="w-12 h-12 text-stone-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Valerie</h2>
          <p className="text-gray-500">
            Cat whisperer and lover of all things feline.
          </p>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 mt-4 px-4 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-700 transition duration-200"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
