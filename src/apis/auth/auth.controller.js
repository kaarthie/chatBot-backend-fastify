import { sendResponse } from "../../../utils/responseUtil.js";
import { loginGoogleVerifyService } from "./auth.services.js"; 

async function loginGoogleController(request,reply){
    try {
        const user = request.user
        
        const data = await loginGoogleVerifyService(user.email);
        console.log(user,"fdfe")
       
        // reply.redirect("https://garfish-big-properly.ngrok-free.app");  
        // reply.redirect("https://natural-vaguely-killdeer.ngrok-free.app")
        // reply.redirect("http://localhost:5174");
        reply.redirect("http://localhost:5173");
        
    } catch (error) {
        console.log("error occured in loginGoogleController",error)
        sendError(reply,404,error);
    }

}
async function getUserDetails(request,reply){
    try {
        
    } catch (error) {
        
    }

}

export{loginGoogleController}