
import request from "../../utils/request";

export const getChart = () => {
    return request.get(`/chart/get`); 
};

export const getRegister = (data) => {
    return request.post("/user-register", data);
};

export const getLogin = (data) => {
    return request.post("/user-login", data);
};

export const setMail = (data) => {
    return request.post("/mail-verify", data);
};

export const getProfileByToken = (data) => {
    return request.post("/single-user", data);
};

