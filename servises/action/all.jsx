
import request from "../../utils/request";

export const getChart = (data) => {
    return request.get(`/chart/get`, data); 
};

