import Kibbles from '../../assets/Kibbles.gif';
import useCredits from '../../hooks/useCredits';
import { Fish } from 'lucide-react';

interface CatFedProps {
  catName?: string;
}

export default function CatFed({ catName }: CatFedProps) {
  const { balance } = useCredits();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img src={Kibbles} alt="Cat Fed" className="w-48 h-auto" />
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        You fed {catName}!
      </h2>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">
          Kibbles left: {balance.current_kibbles.toFixed(0)} x 
        </span>
        <Fish />
      </div>
    </div>
  );
}
