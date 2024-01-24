import razorpay from "razorpay";
import crypto from "crypto";
import { RAZORPAYID, RAZORPAYSECRET } from "../src/constants/razorPay.js";

const instance = new razorpay({
  key_id: RAZORPAYID,
  key_secret: RAZORPAYSECRET,
});

function paymentOpts(amount) {
  return {
    amount: amount * 100,
    currency: "INR",
    receipt: "sample_receipt",
  };
}
function signature(sign){
    return crypto
    .createHmac("sha256", "sEGonS41awMadqWt68JeOl4O")
    .update(sign.toString())
    .digest("hex");
}

export {instance,paymentOpts,signature}


