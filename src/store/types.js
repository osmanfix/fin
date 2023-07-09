export const LOGIN_USER = "LOGIN USER";
export function loginUser(userData){
    return {
        type: LOGIN_USER,
        payload: userData
    }
}
export const LOGOUT_USER = "LOGOUT USER";
export function logoutUser(){
    return {
        type: LOGOUT_USER
    }
}
export const INFO_USER = "INFO USER";
export function getUserInfo(infoData){
    return {
        type: INFO_USER,
        payload: infoData
    }
}
export const SCREEN_SIZE = "SCREEN SIZE";
export function setScreenSize(width){
    return {
        type: SCREEN_SIZE,
        payload: width
    }
}

export const SEARCH_DATA = "SEARCH DATA";
export function setSearchData(data){
    return {
        type: SEARCH_DATA,
        payload: data
    }
}
export const RESULT_HISTOGRAM = "RESULT HISTOGRAM";
export function setResultHistogram(data){
    return {
        type: RESULT_HISTOGRAM,
        payload: data
    }
}
export const RESULT_ID = "RESULT ID";
export function setResultID(data){
    return {
        type: RESULT_ID,
        payload: data
    }
}
export const RESULT_DOC = "RESULT DOC";
export function setResult(data){
    return {
        type: RESULT_DOC,
        payload: data
    }
}
export const RESET_RESULT = "RESET RESULT";
export function resetResult(){
    return {
        type: RESET_RESULT,
    }
}