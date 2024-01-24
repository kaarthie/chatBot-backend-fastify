import bookingService from "./booking.services.js"
import { sendError, sendResponse } from "../../../utils/responseUtil.js";
import { findEmailByUser } from "../../dao/user.dao.js";
import sendMail from "../../../utils/sendMail.js";
class BookingController{
    booking = async(request,reply)=>{
        try {
            const {hotelId,roomId,userId,adult,child,pet,checkIn,checkOut} = request.body
            console.log("controller")
            console.log(checkIn,checkOut)
            const result = await bookingService.booking(hotelId,roomId,userId,adult,child,checkIn,checkOut,pet);
            const user = await findEmailByUser(userId);
            await sendMail(user, result, "book");
            sendResponse(reply,200,"",result);        
        } catch (error) {
            sendError(reply,404,"error",error);    
        }
    }
    displayUpcomingBookings = async (request, reply) => {
        try {
          const userId = request.params.userId;
          console.log("userid------>",userId)
        //   const userId = "048d6de5-65e7-4f04-8f42-ebe98bfcbd6c";
          const data = await bookingService.displayUpcomingBookings(userId);
          sendResponse(reply, 200, "Booking History Displayed", data);
        } catch (error) {
          console.log("error from cancelController", error.message);
          sendError(reply, 500, "Error in displaying Booking History", error);
        }
      };
    updateUpcomingBookings = async(request,reply)=>{
        try {
            const bookingId = request.params.bookingId;
            const {checkIn,checkOut} = request.body;
            const result = await bookingService.updateUpcomingBookings(bookingId,checkIn,checkOut)
            sendResponse(reply,200,"updated successfully",result);            
        } catch (error) {
            console.log("error in updateupcomingbookingcontroller",error.message);
            sendError(reply,404,"error in updation",error);            
        }
    };

    updatePendingBooking = async (request , reply) => {
        try {
            const chatId = request.params.chatId;
            const {roomTypes,roomAmenities,hotelAmenities,adults,children,location,date,pets,duration,count,price} = request.body;
            const result = await bookingService.updatePendingBooking(roomTypes,roomAmenities,hotelAmenities,adults,children,location,chatId,date,pets,count,duration,price);
            sendResponse(reply , 200 , "Updated in pending bookings" , result);
        } catch (error) {
            console.log("Error in updating pending booking controller", error.message);
            sendError(reply , 500 , "Error in updating pendingBooking", error)
        }
    }

    getPendingBooking = async (request , reply) => {
        try {
            const chatId = request.params.chatId;
            const result = await bookingService.getPendingBooking(chatId);
            sendResponse(reply , 200 , "Pending Booking fetched Successfully", result);
        } catch (error) {
            console.log("Error in getting pending booking controller", error.message);
            sendError(reply , 500 , "Error in getting pendingBooking", error)
        }
    }

}
const bookingController = new BookingController();

export default bookingController;