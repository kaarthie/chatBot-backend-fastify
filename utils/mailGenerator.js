const successMail = async (user , details) =>{
    const text = `Dear ${user.name},

    We are excited to confirm your reservation at Hotel #${details.hotelId}, Room #${details.roomId}. Your stay details are as follows:

    - Check-in: ${details.checkIn}
    - Check-out: ${details.checkOut}
    - Adults: ${details.adult}
    - Children: ${details.child}

    Thank you for choosing us. We look forward to making your stay memorable.

    Best regards,
    ChatBot
  `;
  return text;
}

const failureMail = (user , details) => {
    const text = `Dear ${user.name},

    We regret to inform you that your reservation (Booking ID: ${details.bookingId}) has been canceled.

    Please note that a refund for your booking will be initiated within 7 business days.

    If you have any questions or concerns, please feel free to reach out to our support team.

    We hope to have the opportunity to serve you in the future.

    Best regards,
    ChatBot
  `;
  return text;
}

export {successMail , failureMail}