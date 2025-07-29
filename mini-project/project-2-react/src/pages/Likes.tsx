import Header from '../components/Header';

const Likes = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="🐱 Likes" />

      {/* Main Content */}
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">🐾</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Likes Page
          </h2>
          <p className="text-gray-500">Cat profiles that you like</p>
        </div>
      </div>
    </div>
  );
};

export default Likes;
