import chatService from "./chatHistory.services.js";
import {sendError, sendResponse} from "../../../utils/responseUtil.js"
class ChatController{

    addChatId = async(request,reply)=>{
        try {
            const userId = "048d6de5-65e7-4f04-8f42-ebe98bfcbd6c"
            const chatId = request.body.chatId;
            const result = await chatService.addChatId(userId,chatId);
            sendResponse(reply,200,"added successfully",result);
        } catch (error) {
            console.log("error from chatController addChatId",error.message);
            sendError(reply,404,"error occured",error);
        }    
    }
    
    addChat = async(request,reply)=>{
        try {
            console.log(request.user,"REQQQ")
            const {chats} = request.body;
            console.log("request",chats);
            // console.log("addchatcontroller",chats)
            const res = await chatService.addChats(chats)  
            console.log("user----------->",request.cookie);      
            sendResponse(reply,200,"",res);
            
        } catch (error) {
            console.log("error from chatController addChat",error.message);
            sendError(reply,404,"error occured",error);
            
        }
    
    
    }
    
    getChat = async(request,reply)=>{
        try {
        // const userId = "d1f3e2c0-8032-4bb1-a7f6-b990e942266b"            
            const chatId = request.params.chatId
            const userId = request.params.userId

        //   console.log("request",request.user)
            const res = await chatService.addChatId(userId,chatId);
            // console.log(res,"controller")
            if(res){
                const result = await chatService.getChats(chatId);
                sendResponse(reply,200,"",result);
            }
            else{
                throw new Error("error in adding chatId")
            }
            
        } catch (error) {
            console.log("error from chatController getChat",error.message);
            sendError(reply,404,"error occured",error);
            
        }
    }
    
    getChatCollection = async(request,reply)=>{
        try {
            console.log("chatcontroller");
            // const userId = "d1f3e2c0-8032-4bb1-a7f6-b990e942266b"
            const userId = request.params.userId;
            const res = await chatService.getChatCollections(userId)
            // console.log(res);
            sendResponse(reply,200,"",res);
            
        } catch (error) {
            console.log("error from chatController getChatController",error.message);
            sendError(reply,404,"error occured",error);
            
        }
    
    }

    deleteChat = async (request , reply) => {
        try {
            const chatId = request.params.chatId;
            const res = await chatService.deleteChat(chatId);
            sendResponse(reply, 200, "Chat Deleted Successfully", res);
        } catch (error) {
            console.log("Error in chat deletion", error.message);
            sendError(reply,404,"error occured",error);
        }
    }

}
const chatController = new ChatController();
export default chatController;