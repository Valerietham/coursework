import HeaderPostLogin from '../components/HeaderPostLogin';
import Chats from '../components/state/NoChats';

const Chat = () => {
  return (
    <div className="bg-white pb-20">
      <HeaderPostLogin title="Chat" />
      <Chats />
    </div>
  );
};

export default Chat;
