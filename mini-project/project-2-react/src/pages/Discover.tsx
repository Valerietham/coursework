import { useState } from 'react';
import TinderCard from 'react-tinder-card';
import Header from '../components/Header';
import useCats from '../hooks/useCats';

function Discover() {
  const { cats, loading } = useCats();
  const [lastDirection, setLastDirection] = useState<string | undefined>(
    undefined
  );

  const swiped = (direction: string, nameToDelete: string) => {
    console.log('removing: ' + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name: string) => {
    console.log(name + ' left the screen!');
  };

  if (!cats.length) {
    return (
      <div className="h-screen overflow-hidden flex flex-col">
        <Header title="Find your purfect match" />
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            <p className="text-gray-600">No cats available right now</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-stone-500 text-white rounded-lg hover:bg-blue-600"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen overflow-hidden flex flex-col">
        <Header title="Find your purfect match" />
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Finding cats for you...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-stone-50 overflow-hidden flex flex-col">
      <Header title="Find your purfect match" />

      {/* Tinder Card Container */}
      <div className="flex-1 flex justify-center items-center p-4 relative overflow-hidden">
        {cats.map((cat) => (
          <TinderCard
            className="absolute w-[90vw] max-w-[350px] h-[300px] rounded-[8px] shadow-xl cursor-grab active:cursor-grabbing"
            key={cat.id}
            onSwipe={(dir) => swiped(dir, cat.id)}
            onCardLeftScreen={() => outOfFrame(cat.id)}
          >
            <div
              style={{ backgroundImage: 'url(' + cat.url + ')' }}
              className="relative bg-white w-full h-full rounded-[8px] bg-cover bg-center overflow-hidden border-2 border-gray-200 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-transparent before:to-black/70 before:z-[1]"
            >
              <h3 className="absolute bottom-5 left-5 text-white text-2xl font-bold m-0 z-[2] drop-shadow-lg">
                {cat.breeds?.[0]?.name || 'Mystery Cat'}
              </h3>
            </div>
          </TinderCard>
        ))}
      </div>

      {/* Debug info */}
      {lastDirection && (
        <div className="flex-shrink-0 p-4">
          <h2 className="text-center font-semibold text-stone-500 pb-40">
            You swiped {lastDirection}!
          </h2>
        </div>
      )}
    </div>
  );
}

export default Discover;
