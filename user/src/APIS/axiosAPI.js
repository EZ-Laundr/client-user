import axios from "axios";

const localhost = axios.create({
    baseURL: "exp://192.168.1.12:4000",
});
export default localhost;
