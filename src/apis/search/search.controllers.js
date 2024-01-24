import { sendResponse } from "../../../utils/responseUtil.js";
import { searchService } from "./search.services.js";

async function searchController(request,reply){
    const {roomTypes,roomAmenities,hotelAmenities,adults,children,pets,location,Date,price}= request.body;
    const result = await searchService(roomTypes,roomAmenities,hotelAmenities,adults,children,pets,location,Date,price);
    sendResponse(reply,200,"",result);

}
export{searchController};