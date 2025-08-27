import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, MessageCircle, PawPrint } from 'lucide-react';
import Lottie from '@lottielab/lottie-player/react';

// NavigationBar component handles both mobile bottom navigation and desktop sidebar navigation

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation tabs
  const tabs = [
    { id: 'discover', icon: Search, path: '/discover', label: 'Discover' },
    { id: 'likes', icon: Heart, path: '/likes', label: 'Likes' },
    { id: 'chat', icon: MessageCircle, path: '/chat', label: 'Chat' },
    { id: 'profile', icon: PawPrint, path: '/profile', label: 'Profile' },
  ];

  // Icons with active state will be filled, others outlined
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
      {/* Mobile: Bottom Navigation */}
      <nav className="md:hidden fixed bg-white bottom-0 left-0 right-0 px-2 p-4 z-50 border-t border-gray-100">
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
                aria-current={isActive ? 'page' : undefined}
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

      {/* Desktop & Tablet: Sidebar Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 bottom-0 w-40 bg-white border-r border-gray-100 z-50">
        {/* Logo */}
        <div className="flex flex-col items-left justify-start gap-4 w-full p-4">
          <div className="flex items-center mb-4">
            <Lottie
              src="https://cdn.lottielab.com/l/D72eg98GYPHH2m.json"
              className="h-10 w-10 mr-2"
              autoplay
            />
            <h1 className="text-xl text-orange-900 font-semibold text-left text-gray-800">
              Furever
            </h1>
          </div>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.path)}
                className={`flex items-left gap-1 py-2 px-2 rounded-md transition-colors ${
                  isActive
                    ? 'text-stone-600 bg-stone-200'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-stone-50'
                }`}
                title={tab.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <IconComponent
                  size={22}
                  className={isActive ? 'fill-current' : ''}
                />
                <span className="ml-2 text-md text-left font-normal">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
