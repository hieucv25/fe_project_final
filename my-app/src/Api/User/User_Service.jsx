import { instance } from "../instance";

const API = "api/customer";
const token = localStorage.getItem('token');
const headers = {
    Authorization: `Bearer ${token}`,
};

class User_Service {

    getAppoimentByUser(idUser) {
        return instance.get(API + "/get_all_appointment/" + idUser, { headers });
    }
    getHistoryByUser(idUser) {
        return instance.get(API + "/get_history_appointment/" + idUser, { headers });
    }
    getInformation(idUser) {
        return instance.get(API + "/get_information/" + idUser, { headers });
    }
}

export default new User_Service();