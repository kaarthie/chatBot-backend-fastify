
import paymentController from "./payment.controllers.js";
const paymentRoutes = async function (fastify, options) {
    fastify.post('/order', paymentController.orderHandler);
    fastify.post('/verify', paymentController.verifyHandler);
};
export {paymentRoutes}