import axios from "axios";

const localhost = axios.create({
    baseURL: "http://192.168.248.97:4000",
});
export default localhost;
