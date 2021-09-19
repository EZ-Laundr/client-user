import {
	SET_SERVICES,
	SET_PARFUME,
	SET_TREATMENT,
	SET_ACCESS_TOKEN,
} from "./actionType";
import axios from "axios";
import localhost from "../APIS/axiosAPI";
const baseUrl = `http://192.168.43.49:4000`;

export function setServices(services) {
	const dataServie = {
		type: SET_SERVICES,
		payload: services,
	};
	return dataServie;
}
export function setToken(token) {
	const dataToken = {
		type: SET_ACCESS_TOKEN,
		payload: token,
	};
	return dataToken;
}

export function setParfume(parfume) {
	const dataParfume = {
		type: SET_PARFUME,
		payload: parfume,
	};
	return dataParfume;
}

export function setTreatment(treatment) {
	const dataTreatment = {
		type: SET_TREATMENT,
		payload: treatment,
	};
	return dataTreatment;
}

export function fetchServices() {
	return async function (dispatch) {
		try {
			const res = await axios.get(`${baseUrl}/services`);

			dispatch(setServices(res.data));
		} catch (err) {
			console.log(err.response);
		}
	};
}

export function fetchParfume() {
	return async function (dispatch, getState) {
		try {
			const response = await fetch(`${baseUrl}/parfume`);
			if (response.ok) {
				const result = await response.json();
				dispatch(setParfume(result));
			} else {
				throw Error;
			}
		} catch (error) {
			console.log(error);
		}
	};
}

export function fetchTreatment() {
	return async function (dispatch, getState) {
		try {
			const response = await fetch(`${baseUrl}/treatment`);
			if (response.ok) {
				const result = await response.json();
				dispatch(setTreatment(result));
			} else {
				throw Error;
			}
		} catch (error) {
			console.log(error);
		}
	};
}

export function createOrder(payload) {
	return async function (dispatch, getState) {
		try {
			let results;
			const state = getState();
			const response = await fetch(`${baseUrl}/order`, {
				method: "post",
				headers: {
					access_token: state.reducer.access_token,
				},
				body: payload,
			});

			if (response.ok) {
				results = response;
			} else {
				throw Error;
			}
		} catch (error) {
			results = error;
		} finally {
			return results;
		}
	};
}

export function loginUser(payload) {
	return async function (dispatch, getState) {
		try {
			const response = await fetch(`${baseUrl}/login`, {
				method: "post",
				body: payload,
			});
			if (response.ok) {
				dispatch(setToken(response.access_token));
				return "success";
			} else {
				throw Error;
			}
		} catch (error) {
			return error;
		}
	};
}
