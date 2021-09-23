import axios from "axios";

const localhost = axios.create({
	baseURL: "http://54.197.100.217",
});
export default localhost;
