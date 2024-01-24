
import { createUser,findUserByEmail } from "../../dao/user.dao.js";
import { v4 as uuidv4 } from 'uuid';

async function loginGoogleService(email, name , photo){
    try {
       const user = await findUserByEmail(email);
       
       if(user){
        return user
       }       
       else{
        const userId = uuidv4();
        const user= await createUser({userId,email , name , photo});
        return user
       }
        
    } catch (error) {
        console.log("error in loginGoogleService",error);
        throw new Error(error);         
    }

}

async function loginGoogleVerifyService(email){
    try {
        const user = await findUserByEmail(email);
        if(user){
            return user;
        }

    } catch (error) {
        console.log("error in loginGoogleVerifyService",error);
        throw new Error(error); 
        
    }

}

export {loginGoogleService,loginGoogleVerifyService}