import axios from "axios";

const localhost = axios.create({
  baseURL: "http://d81d-116-206-39-107.ngrok.io",
});
export default localhost;
