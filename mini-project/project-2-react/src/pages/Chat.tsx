import Header from '../components/Header';

const Chat = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="💬 Chat" />

      {/* Main Content */}
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Chat Page
          </h2>
          <p className="text-gray-500">
            Conversations with cat owners and fosterers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
