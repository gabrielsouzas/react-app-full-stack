export const verifyGeneralResponse = (responseStatus) => {
    return responseStatus < 200 ? "INFORMATION" :
            responseStatus >= 200 && responseStatus < 300 ? "SUCESS" :
            responseStatus >= 300 && responseStatus < 400 ? "REDIRECT" :
            responseStatus >= 400 && responseStatus < 500 ? "CLIENT_ERROR" :
            responseStatus >= 500 ? "SERVER_ERROR" : "INVALID_STATUS";
}

export const verifyResponse = (responseStatus) => {
    return responseStatus === 200 ? "OK" :
    responseStatus === 201 ? "CREATED" :
    responseStatus === 204 ? "UPDATED_DELETED" :
    responseStatus >= 400 && responseStatus < 500 ? "CLIENT_ERROR" :
    responseStatus >= 500 ? "SERVER_ERROR" : "INVALID_STATUS";
}