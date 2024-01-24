import cancelService from "./cancel.services.js";
import { sendError, sendResponse } from "../../../utils/responseUtil.js";
import { findUserByBookingId } from "../../dao/user.dao.js";
import sendMail from "../../../utils/sendMail.js";
class CancelController {
  displayUpcomingBookings = async (request, reply) => {
    try {
      // const userId = request.user.userId;
      const userId = "54339a98-7c2f-4852-a614-90ee33b8734a";
      const data = await cancelService.displayUpcomingBookings(userId);
      sendResponse(reply, 200, "Booking History Displayed", data);
    } catch (error) {
      console.log("error from cancelController", error.message);
      sendError(reply, 500, "Error in displaying Booking History", error);
    }
  };

  deleteBookings = async (request, reply) => {
    try {
      const bookingId = request.params.id;
      if (!bookingId) {
        throw new Error("invalid booking id");
      }
      const user = await findUserByBookingId(bookingId);
      const data = await cancelService.deleteBookings(bookingId);
      await sendMail(user , {bookingId} , "cancel");
      sendResponse(reply, 200, "Booking deleted Successfully", data);
    } catch (error) {
      sendError(reply, 404, "Error in deleting booking", error);
    }
  };
}
const cancelController = new CancelController();

export default cancelController;
