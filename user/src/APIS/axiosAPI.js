import axios from "axios";

const localhost = axios.create({
  baseURL: "http://fdc5-116-206-42-95.ngrok.io",
});
export default localhost;
