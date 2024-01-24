import { v4 as uuidv4 } from "uuid";
import chat from "../../dao/chat.dao.js";

class ChatService {
  addChatId = async (userId, chatId) => {
    try {
      const res = await chat.getChatId(userId,chatId);
     
      if(res.length==0){
          const result = await chat.addChatId(userId, chatId);
          return result;
      }
      return res;
    } catch (error) {
      console.log("error occurred in addChatIdservice", error.message);
      throw new Error(error);
    }
  };

  addChats = async (chats) => {
    try {
      let chatt = chats.map((chat) => {
        return {
          ...chat,
          time: new Date(chat.time),
        };
      });
      // console.log(chatt,"123")
      const res = await chat.addChats(chatt);
      // console.log(res, "chatresservice");
      return res;
    } catch (error) {
      console.log("error occurred in addchatService", error.message);
      throw new Error(error);
    }
  };

  getChats = async (chatId) => {
    try {
      const res = await chat.getChats(chatId);
      return res;
    } catch (error) {
      console.log("error occurred in getchatService", error.message);
      throw new Error(error);
    }
  };

  getChatCollections = async (userId) => {
    try {
      const res = await chat.getChatCollection(userId);
      return res;
    } catch (error) {
      console.log("error occurred in getchatcollectionService", error.message);
      throw new Error(error);
    }
  };

  deleteChat = async (chatId) => {
    try {
      const res = await chat.deleteChat(chatId);
      return res;
    } catch (error) {
      console.log("error occurred in deleteChatService", error.message);
      throw new Error(error);
    }
  }
}
const chatService = new ChatService();
export default chatService;
