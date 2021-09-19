import axios from "axios";

const localhost = axios.create({
	baseURL: "http://localhost:4000",
});
// const localhost = axios.create({
//   baseURL: "https://penganggurans.herokuapp.com",
// });
export default localhost;
