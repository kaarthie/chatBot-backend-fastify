import { prisma } from "../../utils/prisma.js"

export default{
    addChatId : async function(userId,chatId){
        try {
            const res = await prisma.chatHistoryCollection.create({
                data:{
                    userId,
                    chatId
                }
            })
            return res;
            
        } catch (error) {
            console.log("error from addChatIdDAO",error.message);
            throw new Error(error);            
        }


    },
    getChatId : async function(userId,chatId){
        try {
            const res = await prisma.chatHistoryCollection.findMany({
                where:{
                    userId,chatId
                }
            })
            return res;
            
        } catch (error) {
            console.log("error from getChatIdDAO",error.message);
            throw new Error(error); 
            
        }
    },

    addChats : async function(chats){
        try {

            const res = await prisma.individualChatHistory.createMany({
                data:chats
            })
            return res;
            
        } catch (error) {
            console.log("error from addChatsDAO",error.message);
            throw new Error(error); 
            
        }

    },
    getChats: async function(chatId){
        try {
            // console.log("dao",chatId)
            const res = await prisma.individualChatHistory.findMany({
                where:{
                    chatId
                },
                orderBy:{
                    time:"asc"
                }
            })
            return res;
            
        } catch (error) {
            console.log("error from getChatsDAO",error.message);
            throw new Error(error); 
            
        }

    },

    getChatCollection : async function(userId){
        try {
            const res = await prisma.chatHistoryCollection.findMany({
                where:{
                    userId
                }
            })
            return res;
            
        } catch (error) {
            console.log("error from getChatCollectionDAO",error.message);
            throw new Error(error); 
            
        }

    },

    deleteChat : async function(chatId){
        try {
            const res = await prisma.chatHistoryCollection.delete({
                where : {
                    chatId
                }
            });
            return res;
        } catch (error) {
            console.log("error from deleteChatDAO",error.message);
            throw new Error(error)
        }
    }
}