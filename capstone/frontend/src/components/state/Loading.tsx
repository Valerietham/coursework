import Loading from '../../assets/Loading.gif';

export default function LoadingCats() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img src={Loading} alt="Loading Cats" className="w-48 h-auto" />
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Loading Cats...
      </h2>
    </div>
  );
}
