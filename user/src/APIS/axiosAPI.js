import axios from "axios";

const localhost = axios.create({
  baseURL: "http://192.168.43.227:4000",
});
export default localhost;
