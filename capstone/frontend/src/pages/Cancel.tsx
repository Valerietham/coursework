import { Link } from 'react-router-dom';
import Kibbles from '../assets/Kibbles.gif';
import HeaderPostLogin from '../components/HeaderPostLogin'; // Header

export default function Cancel() {
  return (
    <>
      <HeaderPostLogin title="Discover" />
      <div className="flex flex-col items-center justify-center h-full">
        <img src={Kibbles} alt="No kibbles" className="w-48 h-auto" />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Checkout Cancelled
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          No kibble this time but no worries. Kitties will be waiting whenever
          you are ready.
        </p>
        <Link
          to="/discover"
          className="inline-flex justify-center rounded-xl bg-orange-800 px-5 py-3 font-medium text-white hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-800"
        >
          Back to home
        </Link>
      </div>
    </>
  );
}
