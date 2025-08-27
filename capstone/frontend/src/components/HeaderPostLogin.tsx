import Lottie from '@lottielab/lottie-player/react';
import DonateButton from '../components/buttons/DonateButton';
import useCredits from '../hooks/useCredits';
import { Fish } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const HeaderPostLogin = ({ title }: HeaderProps) => {
  const { balance, loading } = useCredits();

  return (
    <header className="py-2 px-4 bg-gray-50 flex-shrink-0 sticky top-0 flex justify-between items-center relative z-20">
      {/* Logo and Name */}
      <div className="flex items-center">
        <Lottie
          src="https://cdn.lottielab.com/l/D72eg98GYPHH2m.json"
          className="h-10 w-10 mr-2 md:hidden"
          autoplay
        />
        <h1 className="text-xl text-orange-900 font-semibold text-left text-gray-800 md:hidden">
          {title}
        </h1>
      </div>
      {/* Kibbles Credits */}
      <div className="flex items-center space-x-2">
        <Fish className="text-orange-800" />
        <span className="text-sm font-medium text-gray-700">
          x {loading ? '...' : `${balance.current_kibbles.toFixed(0)}`}
        </span>
        <DonateButton />
      </div>
    </header>
  );
};

export default HeaderPostLogin;
