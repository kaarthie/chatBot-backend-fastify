import { instance,paymentOpts,signature} from "../../../utils/payment.js";
class PaymentService{
    orderHandler = async(amount)=>{
        try {
            const opts = paymentOpts(amount)
            const order = await instance.orders.create(opts);
            return order;
            
        } catch (error) {
            console.log("error in orderhandlerservice",error.message);
            throw new Error(error);
            
        }
    };
    verifyHandler = async(razorpay_order_id, razorpay_payment_id)=>{
        try {
            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = signature(sign);
            return expectedSign;
            
        } catch (error) {
            console.log("error in verifyhandlerservice",error.message);
            throw new Error(error);
            
        }



    }

}
const paymentService = new PaymentService();
export default paymentService;