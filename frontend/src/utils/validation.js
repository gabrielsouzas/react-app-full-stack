export const verifyGeneralResponse = (responseStatus) => {
    return responseStatus < 200 ? "INFORMATION" :
            responseStatus >= 200 && responseStatus < 300 ? "SUCESS" :
            responseStatus >= 300 && responseStatus < 400 ? "REDIRECT" :
            responseStatus >= 400 && responseStatus < 500 ? "CLIENT_ERROR" :
            responseStatus >= 500 ? "SERVER_ERROR" : "INVALID_STATUS";
}

export const verifyResponse = (entity, pr, responseStatus) => {
    return responseStatus === 200 ? `Operação com ${entity} realizada com sucesso!` :
    responseStatus === 201 ? `${entity} inserid${pr} com sucesso!` :
    responseStatus === 204 ? "UPDATED_DELETED" :
    responseStatus >= 400 && responseStatus < 500 ? "CLIENT_ERROR" :
    responseStatus >= 500 ? "SERVER_ERROR" : "UNKNOW_STATUS";
}