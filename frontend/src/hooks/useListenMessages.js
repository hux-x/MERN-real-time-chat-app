// useListenMessages.js
import { useEffect } from 'react';
import { useSocketContext } from '../context/socketContext';
import useMessage from './useMessage';

export default function useListenMessages(selectedChat) {
  const { messages, setMessages } = useMessage(selectedChat);
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!socket || !selectedChat) return;

    const handleMessage = (newMessage) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        messages: [...prevMessages.messages, newMessage],
      }));
    };

    socket.on('newMessage', handleMessage);

    return () => {
      socket.off('newMessage', handleMessage);
    };
  }, [socket, selectedChat, setMessages]);

  return { messages };
}
