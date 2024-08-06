import React from 'react';
import ChatListItem from '../components/ChatListItem';

import SearchBar from '../components/SearchBar';

const ChatList = ({ searchQuery, setSearchQuery, setSelectedChat, selectedChat, setChatName, conversations, loading }) => {

  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full lg:w-[350px] h-full p-4 bg-[#f7f9f6] shadow-lg rounded-lg transition-transform duration-300 ease-in-out">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ul className="h-[calc(100vh-8rem)] overflow-y-auto">
        {conversations && conversations.map((chat) => (
          <ChatListItem 
            setChatName={setChatName} 
            key={chat._id} 
            chat={chat} 
            setSelectedChat={setSelectedChat} 
            selectedChat={selectedChat} 
          />
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
