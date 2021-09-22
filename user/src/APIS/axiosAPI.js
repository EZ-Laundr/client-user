import axios from "axios";

const localhost = axios.create({
  baseURL: " http://bf5c-116-206-43-75.ngrok.io",
});
export default localhost;
