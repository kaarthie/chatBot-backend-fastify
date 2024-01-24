import { v4 as uuidv4 } from "uuid";
import book from "../../dao/hotel.dao.js";
import { dateFormatter, dateFormatter1 } from "../../../utils/dateFormatter.js";
class BookingService {
  booking = async (
    hotelId,
    roomId,
    userId,
    adult,
    child,
    checkIn,
    checkOut,
    pet
  ) => {
    try {
      const bookingId = uuidv4();
      console.log("service");
      console.log("service", checkOut, checkIn);
      console.log(
        bookingId,
        hotelId,
        roomId,
        userId,
        adult,
        child,
        checkIn,
        checkOut
      );
      const result = await book.bookRoom(
        bookingId,
        hotelId,
        roomId,
        userId,
        adult,
        child,
        checkIn,
        checkOut,
        pet
      );
      const updatedresult = await book.updateAvailableRooms(hotelId,roomId);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  displayUpcomingBookings = async (userId) => {
    try {
      const data = await book.displayUpcomingBookings(userId);
      return data;
    } catch (error) {
      console.log("error from cancelservice", error.message);
      throw new Error(error);
    }
  };
  updateUpcomingBookings = async (bookingId, checkIn, checkOut) => {
    try {
      const result = await book.updateUpcomingBookings(
        bookingId,
        checkIn,
        checkOut
      );
      return result;
    } catch (error) {
      console.log("error from updateBookingservice", error.message);
      throw new Error(error);
    }
  };

  updatePendingBooking = async (
    roomTypes,
    roomAmenities,
    hotelAmenities,
    adults,
    children,
    location,
    chatId,
    date,
    pets,
    count,
    duration,
    price
  ) => {
    try {
      console.log(
        roomTypes,
        roomAmenities,
        hotelAmenities,
        adults,
        children,
        location,
        chatId,
        date,
        count,
        duration,
        price
      );
      const roomTypesString =
        roomTypes?.length > 0 ? JSON.stringify(roomTypes) : null;
      const roomAmenitiesString =
        roomAmenities?.length > 0 ? JSON.stringify(roomAmenities) : null;
      const hotelAmenitiesString =
        hotelAmenities?.length > 0 ? JSON.stringify(hotelAmenities) : null;
      const locationString =
        location?.length > 0 ? JSON.stringify(location) : null;
      const result = await book.updatePendingBooking(
        roomTypesString,
        roomAmenitiesString,
        hotelAmenitiesString,
        adults,
        children,
        locationString,
        chatId,
        date,
        pets,
        count,
        duration,
        price
      );
      result.roomTypes = JSON.parse(result.roomTypes);
      result.roomAmenities = JSON.parse(result.roomAmenities);
      result.hotelAmenities = JSON.parse(result.hotelAmenities);
      result.location = JSON.parse(result.location);
      return result;
    } catch (error) {
      console.log("error from pendingBooking", error.message);
      throw new Error(error);
    }
  };

  getPendingBooking = async (chatId) => {
    try {
      const result = await book.getPendingBooking(chatId);
      result[0].roomTypes = JSON.parse(result[0].roomTypes);
      result[0].roomAmenities = JSON.parse(result[0].roomAmenities);
      result[0].hotelAmenities = JSON.parse(result[0].hotelAmenities);
      result[0].location = JSON.parse(result[0].location);
      result[0].date = dateFormatter1(result[0].date);
      console.log(result[0].date, "DATE");
      return result;
    } catch (error) {
      console.log("Error in getting pendingBooking service", error);
      throw new Error(error);
    }
  };
}
const bookingService = new BookingService();
export default bookingService;
