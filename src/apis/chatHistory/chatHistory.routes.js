import { authenticate } from "../../middlewares/authentication.js";
import chatController from "./chatHistory.controllers.js";

async function chatRoutes(fastify,options){
    // fastify.post("/add/chatId",chatController.addChatId);
    fastify.post("/add/chat",chatController.addChat);
    fastify.get("/get/chat/:chatId/:userId",chatController.getChat);
    fastify.get("/get/chatCollection/:userId",chatController.getChatCollection);
    fastify.delete("/delete/chat/:chatId", chatController.deleteChat);
}
export{chatRoutes}