import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, MessageCircle, PawPrint } from 'lucide-react';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define our navigation tabs
  const tabs = [
    { id: 'discover', icon: Search, path: '/', label: 'Discover' },
    { id: 'likes', icon: Heart, path: '/likes', label: 'Likes' },
    { id: 'chat', icon: MessageCircle, path: '/chat', label: 'Chat' },
    { id: 'profile', icon: PawPrint, path: '/profile', label: 'Profile' },
  ];

  // Get current active tab based on current URL
  const getCurrentTab = () => {
    const currentPath = location.pathname;
    const activeTab = tabs.find((tab) => tab.path === currentPath);
    return activeTab ? activeTab.id : 'discover';
  };

  const activeTab = getCurrentTab();

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 px-2 pb-6 z-50">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.path)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-stone-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <IconComponent
                  size={24}
                  className={isActive ? 'fill-current' : ''}
                />
                {/* <span className="text-xs mt-1 font-medium">{tab.label}</span> */}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
