

function sendResponse(reply, statusCode, message, data){
    const responseData = (data !== "" && data !== null && data !== undefined) ? data : "No Data Available";
    
    reply.status(statusCode).send({
        code: statusCode,
        message: message,
        data: responseData
    })
}

function sendError(reply, statusCode, message, error)  {
    reply.status(statusCode).send({
        code: statusCode,
        error: {
            message: message,
            details: error.message || 'No Details'
        }
    })
}

export {sendError,sendResponse}