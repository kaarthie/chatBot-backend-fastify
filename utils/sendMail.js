import nodemailer from "nodemailer";
import { successMail , failureMail } from "./mailGenerator.js";

async function sendMail(user , details ,action) {
    try {
        if (!user?.email) {
            throw new Error("Invalid email Credentials");
        }
        let subject = "";
        let text = "";
        if(action == "book"){
            subject = "Booking Confirmation Invoice";
            text = await successMail(user , details , action);
        }
        else if (action == "cancel"){
            subject = "Cancellation Invoice";
            text = await failureMail(user , details , action);
        }
        else {
            throw new Error("Provide prupose of mail : book/cancel")
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'karthikeyan.r@codingmart.com',
                pass: 'Karthi@09CM'
            }
        });

        const mailOptions = {
            from: 'karthikeyan.r@codingmart.com',
            to: user.email,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        console.log("Booking Confirmation sent Successfully");

    } catch (error) {


        console.log("Error in sending Mail", error.message);
        throw new Error(error);

    }
}
export default sendMail;
