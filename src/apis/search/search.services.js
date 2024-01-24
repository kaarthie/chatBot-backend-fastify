import search from "../../dao/hotel.dao.js";

async function searchService(roomTypes,roomAmenities,hotelAmenities,adults,children,pets,location,Date,price){
    let result={},Location,Hotel,HotelAmenities,RoomId;
    
      function customSort(a, b) {
          const customOrder = { "Smart": 1, "Jacuzzi": 2, "Minibar": 3, "Newspaper": 3, "AC":4,"Beverages":4,"Wifi":4,"Breakfast":4,"TV":4};
          return customOrder[a] - customOrder[b];
      }
      roomAmenities = roomAmenities.sort(customSort);
    //   console.log(roomAmenities);   
    
    if(roomAmenities){
        // console.log("room",roomAmenities)
        RoomId = await search.getRoombyRoomAmenities(roomAmenities,adults,children,pets,roomTypes) 
        //  console.log(RoomId)
        result["rooms"]=RoomId
    }
    if(location){
        
        result["Hotel"]= await search.getHotelByLoc(location,RoomId,roomTypes,hotelAmenities);

       
    }
    // if(availab){
    //     result["availability"] = await search.checkRoomAvailability("8a790d9e-7c44-42ac-afe8-effa3b75df48","30f89b06-460e-47fb-a8d6-305cfd5a2078",Date)

    // }

    
  
    return result
    
    
     
}
export{searchService};