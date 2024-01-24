import { prisma } from "../../utils/prisma.js";
import {dateFormatter} from "../../utils/dateFormatter.js";

export default {
  getHotelByLoc: async function (location, room, type, hotelAmenities) {
    let roomid;
    if (room.length === 0) {
      roomid = [
        "30f89b06-460e-47fb-a8d6-305cfd5a2078",
        "76e2c90e-8aed-49cc-8368-d5a2dd80b6bd",
        "7369e0a0-cff6-4fa4-9c95-bb23127996ec",
        "e058b405-25cd-4bc3-8621-c77fcea158e7",
        "2091f84c-6248-4749-8ceb-5e99e21e02fe",
        "a3b07fb9-7a8c-4cae-a3e6-ecad13b634df",
        "64af9278-23fe-478e-a500-2e4e3b7b4ec1"
      ];
    }
    if (hotelAmenities.length == 0) {
      hotelAmenities = ["Pool", "Gym", "Parking", "Hill", "Beach", "Bar"];
    }

    if (room.length != 0) {
      roomid = room.map((item) => item.roomId);
    }

    // console.log("roomllll", roomid);
    let hotel = await prisma.location.findMany({
      where: {
        locationName: {
          in: location,
        },
      },
      select: {
        hotels: {
          select: {
            hotelId: true,
            branchName: true,
            availableRooms: {
              select: {
                room: {
                  select: {
                    roomId: true,
                    type: true,
                    cost: true,
                    size: true,
                    adult: true,
                    child: true,
                    pet:true,
                    bedType: true,
                  },
                },
                count: true,
              },
              where: {
                room: {
                  OR: [
                    {
                      roomId: {
                        in: roomid,
                      },
                    },
                    
                  ],
                },
              },
            },
            
          },
          where: {
            // availableRooms:{
            //   some:{
            //     count:{
            //       gt:0
            //     }
            //   }
              
            // },
            amenities: {
              some: {
                amenity: {
                  amenity: {
                    in: hotelAmenities,
                  },
                },
              },
            },
          },
        },
      },
    });
    let result = [];
    hotel.forEach((item) => {
      item.hotels.forEach((item2) => {
        result.push(item2);
      });
    });

    return result;
  },

  getRoombyRoomAmenities: async function (roomAmenities, adult, child, pet, type) {
    if (type.length == 0) {
      type = ["Business", "Presidential", "Suite", "Superior", "Junior","Deluxe","SuperDeluxe"];
    }

    let room = await prisma.amenity.findMany({
      where: {
        amenity: {
          contains: roomAmenities[0],
        },
      },
      select: {
        roomAmenities: {
          select: {
            room: true,
          },
          where: {
            room: {
              AND: [
                {
                  adult: {
                    gte: adult,
                  },
                },
                {
                  child: {
                    gte: child,
                  },
                },
                {
                  pet:{
                    gte:pet,
                  }
                },
                {
                  type: {
                    in: type,
                  },
                },
              ],
            },
          },
        },
      },
    });

    let room2 = [];
    let uniqueRoomIds = new Set();
    room.forEach((item) => {
      item.roomAmenities.forEach((amenity) => {
        const { roomId } = amenity.room;

        if (!uniqueRoomIds.has(roomId)) {
          room2.push(amenity.room);

          uniqueRoomIds.add(roomId);
        }
      });
    });

    return room2;
  },

  bookRoom: async function (
    bookingId,
    hotelId,
    roomId,
    userId,
    adult,
    child,
    checkIn,
    checkOut,
    pet
  ) {
    console.log("dao", checkIn, checkOut);
    console.log("hbhvh", dateFormatter(checkOut));
    const result = await prisma.bookingHistory.create({
      data: {
        bookingId,
        hotelId,
        roomId,
        userId,
        adult,
        child,
        paymentStatus: true,
        checkIn: new Date(dateFormatter(checkIn)),
        checkOut: new Date(dateFormatter(checkOut)),
        
      },
    });
    return result;
  },
  updateAvailableRooms: async function (hotelId, roomId) {
    const findcount = await prisma.availableRooms.findMany({
      where: {
        AND: [
          {
            roomId,
          },
          { hotelId },
        ],
      },
      select: {
        count: true,
      },
    });
    console.log("count", findcount);

    await prisma.availableRooms.updateMany({
      where: {
        AND: [
          {
            roomId,
          },
          { hotelId },
        ],
      },
      data: {
        count: findcount[0].count - 1,
      },
    });
  },
  checkRoomAvailability: async function (hotelId, roomId, date) {
    const res = await prisma.bookingHistory.count({
      where: {
        hotelId,
        roomId,
        OR: [
          {
            checkIn: {
              gt: new Date(date),
            },
          },
          {
            checkOut: {
              lt: new Date(date),
            },
          },
        ],
      },
    });

    return res;
  },
  displayUpcomingBookings: async function (userId) {
    try {
      const data = await prisma.bookingHistory.findMany({
        where: {
          userId,
          checkIn: {
            gt: new Date(),
          },
        },
        select: {
          bookingId: true,
          userId: true,
          hotel: true,
          checkIn: true,
          checkOut: true,
          room: true,
          adult: true,
          child: true,
          paymentStatus: true,
        },
      });
      return data;
    } catch (error) {
      console.log("error from cancelDao", error.message);
      throw new Error(error);
    }
  },
  updateUpcomingBookings :async function(bookingId,checkIn,checkOut){
    try {
      const res = await prisma.bookingHistory.update({
        data:{
          checkIn:new Date(dateFormatter(checkIn)),
          checkOut:new Date(dateFormatter(checkOut))
        },
        where:{
          bookingId,
        }
        
      })
      return res;
      
    } catch (error) {
      console.log("error from updatebookingDao", error.message);
      throw new Error(error);
            
    }
  },
  deleteBookings: async function (bookingId) {
    try {
      const data = await prisma.bookingHistory.delete({
        where: {
          bookingId,
        },
      });
      return data;
    } catch (error) {
      console.log("error from cancelDao", error.message);
      throw new Error(error);
    }
  },

  updatePendingBooking: async function (roomTypes, roomAmenities, hotelAmenities, adults, children, location, chatId,date,pets,count,duration,price) {
    try {
      const existingBooking = await prisma.pendingBooking.findMany({
        where: { chatId },
      });
  
      if (existingBooking.length > 0) {
        const updatedBooking = await prisma.pendingBooking.update({
          where: { chatId : chatId },
          data: {
            roomTypes:{
              set:roomTypes?roomTypes:null
            },
            roomAmenities:{
              set:roomAmenities?roomAmenities:null
            },
            hotelAmenities:{
              set:hotelAmenities?hotelAmenities:null
            },
            adults:{
              set:adults?adults:null
            },
            children:{
              set:children?children:null
            },
            location:{
              set:location?location:null
            },
            date:{
              set:date?new Date(dateFormatter(date)):null
            },
            pets:{
              set:pets?pets:null
            },
            count:{
              set:count?count:null
            },
            price:{
              set:price?price:null
            },
            duration:{
              set:duration?duration:null
            }
           
          },
        });
        return updatedBooking;
      } else {
        const newBooking = await prisma.pendingBooking.create({
          data: {
            roomTypes,
            roomAmenities,
            hotelAmenities,
            adults,
            children,
            location,
            pets,
            chatId,
            date:date?new Date(dateFormatter(date)):null,
            count,
            price,
            duration
          },
        });
        console.log('Created new pendingBooking:', newBooking);
        return newBooking;
      }
    } catch (error) {
      console.error('Error processing pendingBooking:', error);
      throw new Error(error)
    } 
  },

  getPendingBooking : async (chatId) => {
    try {
      const result = await prisma.pendingBooking.findMany({
        where : {
          chatId
        }
      });
      console.log("Fetched pending booking");
      return result;
    } catch (error) {
      console.error('Error in getting pendingBooking DAO', error);
      throw new Error(error)
    }
    
  }
};


  
