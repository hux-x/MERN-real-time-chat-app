import React, { useEffect, useState } from 'react';
import Sidebar from '../components/SideBar';
import ChatList from '../components/ChatList';
import ChatDetail from '../components/ChatDetail';
import { useAuthContext } from '../context/authContext';
import useGetConversations from '../hooks/useGetConversation';
import {useSocketContext} from '../context/socketContext'

const HomePage = () => {
  const [chatName,setChatName] = useState()
  const { authUser } = useAuthContext();
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const { conversations, loading } = useGetConversations();
  const { onlineUsers } =  useSocketContext();
 
  // console.log(authUser,'   auth user')
  // console.log(conversations)
  // console.log(authUser)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#eeeeee] via-[#acc6aa] to-[#71a0a5] overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 overflow-hidden">
        {!isSmallScreen || !selectedChat ? (
          <div className={`lg:w-[350px] ${isSmallScreen && selectedChat ? 'hidden' : 'block'} transition-transform duration-300 ease-in-out`}>
            <ChatList conversations ={conversations} loading = {loading}  setChatName={setChatName} setSelectedChat={setSelectedChat} selectedChat={selectedChat} />
          </div>
        ) : null}
        <div className={`flex-1 ${isSmallScreen && !selectedChat ? 'hidden' : 'block'} lg:w-2/3 transition-transform duration-300 ease-in-out`}>
          <ChatDetail loggedInUserId ={authUser._id} chatName={chatName} selectedChat={selectedChat} handleCloseDetail={() => setSelectedChat(null)} profilePicURL={authUser.profilePicURL} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;


