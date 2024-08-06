import { createContext, useState, useEffect, useContext } from 'react';
import { useAuthContext } from './authContext';
import io from 'socket.io-client';

const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const userString = localStorage.getItem('chat-user');
      const user = userString ? JSON.parse(userString) : null;
      if (user) {
        const socket = io('http://localhost:5173', {
          query: {
            userId: user._id,
          },
        });
        setSocket(socket);
        socket.on('getOnlineUsers', (users) => setOnlineUsers(users));
        socket.on('newMessage', (newMessage) => {
          console.log('message received in real-time', newMessage);
        });

        socket.on('connect_error', (error) => {
          console.error('Socket connection error:', error);
        });

        return () => {
          socket.off('getOnlineUsers');
          socket.off('newMessage');
          socket.close();
          setSocket(null);
        };
      }
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
