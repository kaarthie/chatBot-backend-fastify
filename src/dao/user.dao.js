import { prisma } from "../../utils/prisma.js"

async function findUserByEmail(email){
    try {
        const user = await prisma.user.findUnique({
            where:{
                email,
            }
        })
        if(user){
            return user
        }
        return null
    } catch (error) {
        console.log("error from user.dao/findUserByEmail",error)
        throw new Error(error)
    }
}
async function createUser(details){
    try {
       const user = await prisma.user.create({
            data:details
        })
        return user
    } catch (error) {
        console.log("error from user.dao/createUser",error)
        throw new Error(error)
    }
}
async function findEmailByUser(userId){
    try {
        const user = await prisma.user.findUnique({
            where : {
                userId
            }
        });
        return user;
    } catch (error) {
        console.log('Error in getting email');
        throw new Error(error);
    }
}
async function findUserByBookingId(bookingId){
    try {
        console.log("booking",bookingId)
        const booking = await prisma.bookingHistory.findUnique({
            where : {
                bookingId
            },
        });
        console.log(booking)
        const userId = booking.userId;
        const user = await prisma.user.findUnique({
            where : {
                userId
            }
        });
        return user;
    } catch (error) {
        console.log('Error in getting user from bookingId', error);
        throw new Error(error);
    }
}

export {findUserByEmail,createUser, findEmailByUser, findUserByBookingId}