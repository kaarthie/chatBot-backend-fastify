import { sendError, sendResponse } from "../../../utils/responseUtil.js";
import paymentService from "./payment.services.js";

class PaymentController {
  orderHandler = async (request, reply) => {
    try {
      const amount = request.body.amount;
      const order = await paymentService.orderHandler(amount);
      sendResponse(reply, 200, "payment details", order);
    } catch (error) {
      console.error(error);
      sendError(reply, 404, "Something went wrong", error);
    }
  };
  verifyHandler = async (request, reply) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        request.body;
      const expectedSign = await paymentService.verifyHandler(
        razorpay_order_id,
        razorpay_payment_id
      );
      if (razorpay_signature === expectedSign) {
        sendResponse(reply, 200, "Payment verified successfully");
      } else {
        sendError(reply, 400, "Invalid signature sent!");
      }
    } catch (error) {
      console.error(error);
      sendError(reply, 500, "Internal Server Error!", error);
    }
  };
}
const paymentController = new PaymentController();
export default paymentController;
