import { useState, useCallback } from 'react';
import Loading from './state/Loading';
import ErrorLoadingCats from './state/Error';
import useCats from '../hooks/useCats';
import { useAdopter } from '../hooks/useAdopter';
import { useAuth0 } from '@auth0/auth0-react';
import CatCard from './CatCard';
import NoMoreCats from './state/NoMoreCats';
import { useSwipe } from '../hooks/useSwipe';

const SwipeCat = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedCats, setSwipedCats] = useState<Set<number>>(new Set());
  const { cats, loading, error } = useCats();
  const { adopter, loading: adopterLoading } = useAdopter();
  const { getAccessTokenSilently } = useAuth0();

  // Filter cats to only show active ones for swiping, excluding already swiped cats
  const availableCats = cats.filter((cat) => 
    cat.status === 'active' && !swipedCats.has(cat.id)
  );
  const currentCat = availableCats[currentIndex];

  const recordInterest = async (catId: number, action: 'like' | 'pass') => {
    if (!adopter) {
      console.error('No adopter data available');
      return;
    }

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/interests/record`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            adopterId: adopter.id,
            catId: catId,
            action: action,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to record ${action}`);
      }

      console.log(`Successfully recorded ${action} for cat ${catId}`);
    } catch (error) {
      console.error(`Error recording ${action}:`, error);
    }
  };

  const handleNext = () => {
    if (currentIndex >= availableCats.length - 1) {
      // No more cats to show
      return;
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSwipe = useCallback(
    async (direction: 'left' | 'right') => {
      if (currentCat) {
        const action = direction === 'right' ? 'like' : 'pass';
        await recordInterest(currentCat.id, action);
        console.log(
          `You ${action === 'like' ? 'liked' : 'passed'} ${currentCat.name}`
        );
        
        // Mark this cat as swiped
        setSwipedCats(prev => new Set(prev).add(currentCat.id));
        
        // Move to next cat
        handleNext();
      }
    },
    [currentCat]
  );

  const {
    cardRef,
    currentTransform,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    swipeLeft,
    swipeRight,
  } = useSwipe(handleSwipe);

  const handleLike = () => swipeRight();
  const handlePass = () => swipeLeft();

  if (loading || adopterLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorLoadingCats />;
  }

  // Check if there are active cats available
  if (availableCats.length === 0) {
    return (
      <div className="w-full h-[95vh] rounded-xl bg-white shadow-2xl flex items-center justify-center">
        <p className="text-gray-500">
          {cats.length === 0 
            ? "No cats available for swiping" 
            : "No active cats available for swiping"
          }
        </p>
      </div>
    );
  }

  // If we've seen all cats, return NoMoreCats component
  if (availableCats.length === 0 || !currentCat) {
    return <NoMoreCats />;
  }

  return (
    <div className="relative w-full h-[95vh] flex items-center justify-center">
      {/* Swipeable Cat Card */}
      <div
        ref={cardRef}
        className={`absolute w-full h-full cursor-grab active:cursor-grabbing select-none ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
        style={{
          transform: `translateX(${currentTransform.x}px) translateY(${currentTransform.y}px) rotate(${currentTransform.rotation}deg)`,
          opacity: isDragging && Math.abs(currentTransform.x) > 60 ? 0.8 : 1,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <CatCard cat={currentCat} onLike={handleLike} onPass={handlePass} />
      </div>

      {/* Swipe Direction Indicators */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Like indicator (right) */}
        <div
          className={`absolute top-1/2 right-8 transform -translate-y-1/2 transition-opacity duration-200 ${
            currentTransform.x > 30 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
            LIKE ❤️
          </div>
        </div>

        {/* Pass indicator (left) */}
        <div
          className={`absolute top-1/2 left-8 transform -translate-y-1/2 transition-opacity duration-200 ${
            currentTransform.x < -30 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">
            PASS ✗
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeCat;
