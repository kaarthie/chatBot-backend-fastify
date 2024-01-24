import cancelController from "./cancel.controllers.js"

const cancelRoutes = async function (fastify, options) {
  // fastify.get("/displayBookings", cancelController.displayUpcomingBookings);
  fastify.delete("/deleteBooking/:id", cancelController.deleteBookings);
};

export { cancelRoutes };
