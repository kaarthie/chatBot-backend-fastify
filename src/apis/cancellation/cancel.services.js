import cancel from "../../dao/hotel.dao.js"
class CancelService{
    displayUpcomingBookings = async(userId)=>{
        try {
            const data = await cancel.displayUpcomingBookings(userId);
            return data;            
        } catch (error) {
            console.log("error from cancelservice",error.message);
            throw new Error(error);            
        }
    }
    deleteBookings = async(bookingId)=>{
        try {
            const data = await cancel.deleteBookings(bookingId);
            return data;
        } catch (error) {
            console.log("error from cancelservice",error.message);
            throw new Error(error);      
            
        }
    }

}
const cancelService = new CancelService();
export default cancelService;
