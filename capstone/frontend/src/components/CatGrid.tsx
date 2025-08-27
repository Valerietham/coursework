import useInterests from '../hooks/useInterests';
import Loading from './state/Loading';
import ErrorLoadingCats from './state/Error';
import NoLikes from './state/NoLikes';
import {
  Calendar,
  Cat,
  Venus,
  Mars,
  BadgeQuestionMark,
  MessageCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import FeedButton from './buttons/FeedButton';
import type { CatModel } from '../types';

const CatGrid = () => {
  const { likedCats, loading, error } = useInterests();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorLoadingCats />;
  }

  if (!likedCats || likedCats.length === 0) {
    return <NoLikes />;
  }

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      case 'adopted':
        return 'bg-blue-100 text-blue-800';
      case 'hidden':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getGenderIcon = (gender: string | undefined) => {
    switch (gender) {
      case 'female':
        return (
          <div className="flex bg-pink-50 rounded-full py-1 px-2 text-xs">
            <Venus className="text-pink-500 w-4 h-4 mr-1" />
            Female
          </div>
        );
      case 'male':
        return (
          <div className="flex bg-blue-50 rounded-full py-1 px-2 text-xs">
            <Mars className="text-blue-500 w-4 h-4 mr-1" />
            Male
          </div>
        );
      default:
        return (
          <div className="flex bg-purple-50 rounded-full py-1 px-2 text-xs">
            <BadgeQuestionMark className="text-purple-500 w-4 h-4 mr-1" />
          </div>
        );
    }
  };

  const CatCard = ({ cat }: { cat: CatModel }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Cat Image - Clickable to go to cat details */}
      <Link
        to={`/cats/${cat.id}`}
        className="block hover:no-underline focus:no-underline"
      >
        <div className="relative h-48 overflow-hidden">
          {cat.photo_url ? (
            <img
              src={cat.photo_url}
              alt={cat.name || 'Cat'}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <img
              src="/assets/Profile.gif"
              alt="Profile fallback"
              className="w-full h-full object-cover"
            />
          )}

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                cat.status
              )}`}
            >
              {cat.status || 'Unknown'}
            </span>
          </div>
        </div>
      </Link>

      {/* Cat Info */}
      <div className="p-4 space-y-3">
        {/* Name, Gender and Breed - Clickable to go to cat details */}
        <Link
          to={`/cats/${cat.id}`}
          className="block hover:no-underline focus:no-underline"
        >
          <div>
            <div className="flex space-x-2 items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {cat.name || 'Meow Meow'}
              </h3>
              <span>{getGenderIcon(cat.gender)}</span>
            </div>
            <p className="text-sm text-stone-600">
              {cat.breed || 'Local Mixed Breed'}
            </p>
          </div>
        </Link>

        {/* Age and Color - Click to go to cat details */}
        <Link
          to={`/cats/${cat.id}`}
          className="block hover:no-underline focus:no-underline"
        >
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>
                {cat.age_in_months
                  ? `${cat.age_in_months} months`
                  : 'Age unknown'}
              </span>
            </div>
            {cat.color && (
              <div className="flex items-center gap-1">
                <Cat size={14} />
                <span>{cat.color}</span>
              </div>
            )}
          </div>
        </Link>

        {/* Action Buttons*/}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {cat.fosterer?.contact_number ? (
            <Link
              to={`https://api.whatsapp.com/send/?phone=65${cat.fosterer.contact_number}`}
              className="flex items-center justify-center w-full bg-stone-500 text-white py-2 rounded-md font-semibold hover:bg-stone-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} className="mr-2" />
              Chat
            </Link>
          ) : (
            <button
              className="flex items-center justify-center w-full bg-gray-400 text-white py-2 rounded-md font-semibold cursor-not-allowed"
              disabled
            >
              <MessageCircle size={18} className="mr-2" />
              Chat Unavailable
            </button>
          )}

          <FeedButton catId={cat.id} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Your Liked Cats</h2>
        <p className="text-gray-600 mt-2">Cats you've shown interest in</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {likedCats.map((cat: CatModel) => (
          <CatCard key={cat.id} cat={cat} />
        ))}
      </div>
    </div>
  );
};

export default CatGrid;
