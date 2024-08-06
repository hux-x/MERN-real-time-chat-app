import React from 'react';
import useMessage from '../hooks/useMessage';
import { useSocketContext } from '../context/socketContext';

const ChatListItem = ({ chat, setSelectedChat, selectedChat, setChatName }) => {
  const { messages, loading } = useMessage(selectedChat ? selectedChat : null);
  const { onlineUsers } = useSocketContext();

  const handleChatItemClick = () => {
    setSelectedChat(chat._id);
    setChatName(chat.fullName);
  };

  // Check if the chat user is online
  const isOnline = Object.values(onlineUsers).includes(chat._id);
  return (
    <li 
      onClick={handleChatItemClick} 
      className="flex items-center p-4 mb-2 bg-[#d0e8d0] rounded-lg cursor-pointer shadow-md hover:bg-[#b4d5b4] transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="relative">
        <img 
          src={chat.profilePicURL} 
          alt={chat.fullName} 
          className="w-12 h-12 mr-4 rounded-full border-2 border-[#71a0a5]" 
        />
        {isOnline && (
          <span className="absolute top-0 left-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>
      <div>
        <h3 className="font-bold text-[#4a5d23]">{chat.fullName}</h3>
        <p>dummy message</p>
      </div>
    </li>
  );
};

export default ChatListItem;

