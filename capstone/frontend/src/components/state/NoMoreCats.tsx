import NoCatsFoundGif from '../../assets/NoCatsFound.gif';

export default function NoMoreCats() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img src={NoCatsFoundGif} alt="No more cats" className="w-48 h-auto" />
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Everything's swiped clean!
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Check out the kitties you like to chat with fosterers! Or check back
        later for more purrfect matches.
      </p>
      <a
        href="/likes"
        className="rounded-md bg-orange-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-800"
      >
        Kitties I've Liked
      </a>
    </div>
  );
}
