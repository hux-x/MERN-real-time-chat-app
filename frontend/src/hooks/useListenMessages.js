import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import useMessage from "./useMessage";

export default function useListenMessages(selectedChat) {
  const { messages,setMessages } = useMessage();
  const { socket} = useSocketContext();

  useEffect(() => {
    setMessages(messages)
    if (!socket || !selectedChat) return;

    const handleNewMessage = (newMessage) => {
      console.log(newMessage)
      setMessages({...messages,newMessage});
    };

    socket.on('newMessage',()=>console.log('new message'));
    socket.on('test',(x)=>console.log(x,'TESTING TESTING'))

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, setMessages, selectedChat]);
}
