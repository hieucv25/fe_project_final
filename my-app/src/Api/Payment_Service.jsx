import { instance } from "./instance";

const API = "api/admin/payment";

class Payment_Service {
    create_payment() {
        return instance.get(API + "/create_payment");
    }
    infor_paymentr() {
        return instance.get(API + "/payment-infor");
    }
}

export default new Payment_Service();

