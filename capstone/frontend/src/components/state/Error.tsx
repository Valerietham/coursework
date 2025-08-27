import Error from '../../assets/Error.gif';

export default function ErrorLoadingCats() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img src={Error} alt="Error Loading Cats" className="w-48 h-auto" />
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Oops! Looks like we've encountered an error.
      </h2>
    </div>
  );
}
