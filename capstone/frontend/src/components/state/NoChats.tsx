import Chats from '../../assets/Chats.gif';

export default function NoChats() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img src={Chats} alt="No chats" className="w-48 h-auto" />
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        No Chats Yet!
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Like some kitties to chat with the owners and fosterers!
      </p>
      <a
        href="/discover"
        className="rounded-md bg-orange-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-800"
      >
        Start Swiping
      </a>
    </div>
  );
}
