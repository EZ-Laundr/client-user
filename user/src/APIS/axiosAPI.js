import axios from "axios";

const localhost = axios.create({
  baseURL: "http://192.168.43.227:4000",
});
// const localhost = axios.create({
//   baseURL: "https://penganggurans.herokuapp.com",
// });
export default localhost;
