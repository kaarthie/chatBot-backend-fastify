import bookingController from "./booking.controllers.js"

async function bookingRoutes(fastify,options){
    fastify.post("/book",bookingController.booking)
    fastify.get("/displayBookings/:userId", bookingController.displayUpcomingBookings);
    fastify.patch("/updateBookings/:bookingId",bookingController.updateUpcomingBookings);
    fastify.post("/updatePendingBooking/:chatId", bookingController.updatePendingBooking );
    fastify.get("/getPendingBooking/:chatId" , bookingController.getPendingBooking);
}
export{bookingRoutes};