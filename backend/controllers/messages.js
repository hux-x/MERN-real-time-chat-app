import user from "../models/user.js";
import Conversation from "../models/conversation.js";
import Message from '../models/message.js'
import { getReceiverSocketId, io } from "../socket/socket.js";
const handleGetMessages = async (req, res) => {
  try {
      const { id: senderId } = req.params;
      const userId = req.user._id;

      const conversation = await Conversation.findOne({
          participants: { $all: [userId, senderId] }
      }).populate('messages');
      console.log(conversation.messages)

      if (!conversation) {
          return res.status(404).json({ error: "No conversation found" });
      }
     

      res.json(conversation);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
};

const handleSendMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user._id;
    const { message } = req.body;
    let conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [receiverId, senderId],
      });
    }

    const newMessage = new Message({ receiverId, senderId, message });
    conversation.messages.push(newMessage);

    await conversation.save();
    await newMessage.save();

    const id = getReceiverSocketId(receiverId);
    if (id) {
      io.to(id).emit('newMessage', newMessage);
      io.to(id).emit('test', "test successfull");

    }
    return res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal server error' });
  }
};
export {handleSendMessage,handleGetMessages}
