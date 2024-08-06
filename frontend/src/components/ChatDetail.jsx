import React, { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import useMessage from '../hooks/useMessage';
import useSendMessage from '../hooks/useSendMessage';
import moment from 'moment';

const ChatDetail = ({ selectedChat, handleCloseDetail, profilePicURL, chatName }) => {
  const { messages: initialMessages, loading } = useMessage(selectedChat ? selectedChat : null);
  const [message, setMessage] = useState('');
  const { loading: sendLoading, sendMessage } = useSendMessage(selectedChat, message);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (initialMessages && initialMessages.messages) {
      setMessages(initialMessages.messages);
    }
  }, [initialMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const newMessage = {
      _id: Math.random().toString(36).substr(2, 9), // Temporary ID
      senderId: 'receiver-id',
      receiverId: selectedChat, // Adjust this according to your data
      message,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    await sendMessage(message);
    setMessage('');
  };

  const formatDate = (date) => {
    return moment(date).format('MMMM D, YYYY');
  };

  const formatTime = (time) => {
    return moment(time).format('h:mm A');
  };

  const renderDateComponent = (currentDate, previousDate) => {
    if (!previousDate || !moment(currentDate).isSame(previousDate, 'day')) {
      return (
        <div className="text-center my-2">
          <span className="bg-gray-200 px-2 py-1 rounded-full text-gray-600 text-sm">
            {formatDate(currentDate)}
          </span>
        </div>
      );
    }
    return null;
  };

  const getColoredMessage = (message) => {
    const terms = {
      pride: '#pride',
      gay: '#gay',
      trans: '#trans',
      bi: '#bi',
      lesbian: '#lesbian',
      queer: '#queer',
    };

    const colors = {
      pride: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
      gay: 'linear-gradient(to right, #D52D00, #FF9A00, #FFD700, #007800, #004CFF, #580073)',
      trans: 'linear-gradient(to right, #55CDFC, #F7A8B8, #FFF, #F7A8B8, #55CDFC)',
      bi: 'linear-gradient(to right, #D60270, #9B4F96, #0038A8)',
      lesbian: 'linear-gradient(to right, #D52D00, #FF9A00, #FFD700, #A000C8, #000080)',
      queer: 'linear-gradient(to right, #8A4DFF, #FC7DFF, #A4F9FF, #FFFFFF, #A4F9FF, #FC7DFF, #8A4DFF)',
    };

    let coloredMessage = message;
    Object.keys(terms).forEach(term => {
      const regex = new RegExp(`#${term}`, 'gi');
      if (coloredMessage.match(regex)) {
        coloredMessage = coloredMessage.replace(regex, (match) => {
          return `<span style="background: ${colors[term]}; -webkit-background-clip: text; color: transparent;">${match}</span>`;
        });
      }
    });

    return coloredMessage;
  };

  return (
    <div className={`flex-1 h-full p-4 bg-[#f7f9f6] shadow-lg rounded-lg transition-transform duration-300 ease-in-out ${selectedChat ? 'block' : 'hidden'}`}>
      {selectedChat ? (
        <div className="flex flex-col h-full">
          {/* Nav Bar */}
          <div className="flex items-center justify-between p-4 bg-[#acc6aa] rounded-t-lg shadow-md">
            <div className="flex items-center space-x-4">
              <img src={profilePicURL} className="w-12 h-12 rounded-full border-2 border-[#71a0a5]" alt="Profile" />
              <h2 className="text-xl font-bold text-[#4a5d23]">{chatName}</h2>
            </div>
            <button onClick={handleCloseDetail} className="text-white hover:text-[#71a0a5] transition-colors duration-300 ease-in-out">
              Close
            </button>
          </div>
          {/* Conversation Details */}
          <div id="messageContainer" className="flex-1 p-4 overflow-y-auto">
            {loading ? (
              <div>Loading...</div>
            ) : (
              messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <React.Fragment key={msg._id}>
                      {renderDateComponent(msg.createdAt, index > 0 ? messages[index - 1].createdAt : null)}
                      <div className={`flex ${msg.senderId !== selectedChat ? 'justify-end' : 'justify-start'} mb-2`}>
                        <div className={`px-4 py-2 rounded-lg shadow-md max-w-xs ${msg.senderId !== selectedChat ? 'bg-[#d0e8d0] text-[#4a5d23]' : 'bg-[#71a0a5] text-white'}`}>
                          <div dangerouslySetInnerHTML={{ __html: getColoredMessage(msg.message) }} />
                          <div className="text-xs text-gray-500 mt-1">{formatTime(msg.createdAt)}</div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-600">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              )
            )}
          </div>
          {/* Message Input and Send Icon */}
          <form onSubmit={handleSendMessage} className="p-4 bg-[#d0e8d0] rounded-b-lg shadow-md flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="w-full px-3 py-2 text-[#4a5d23] border border-[#71a0a5] rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#71a0a5] focus:border-[#71a0a5] transition-all duration-300 ease-in-out bg-white"
            />
            <button type="submit" className="ml-4 text-[#71a0a5] cursor-pointer hover:text-[#4a5d23] transition-colors duration-300 ease-in-out">
              <FaPaperPlane size={24} />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-600">
          <p>Select a chat to view details</p>
        </div>
      )}
    </div>
  );
};

export default ChatDetail;

