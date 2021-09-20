import {
	SET_SERVICES,
	SET_PARFUME,
	SET_TREATMENT,
	SET_ACCESS_TOKEN,
	SET_ORDERS,
	SET_ORDER_DETAIL,
	SET_QR_CODE,
} from "./actionType";
import localhost from "../APIS/axiosAPI";
import happi from "../APIS/happiQR";

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

export function setOrders(orders) {
	const dataOrders = {
		type: SET_ORDERS,
		payload: orders,
	};
	return dataOrders;
}

export function setOrderDetail(details) {
	const dataDetailOrder = {
		type: SET_ORDER_DETAIL,
		payload: details,
	};
	return dataDetailOrder;
}

export function setQrCode(code) {
	const dataQR = {
		type: SET_QR_CODE,
		payload: code,
	};
	return dataQR;
}

export function fetchServices() {
	return async function (dispatch, getState) {
		try {
			const response = await localhost({
				method: "get",
				url: `/services`,
			});
			const result = response.data;
			dispatch(setServices(result));
		} catch (error) {
			console.log(error);
		}
	};
}

export function fetchParfume() {
	return async function (dispatch, getState) {
		try {
			const response = await localhost({
				method: "get",
				url: `/perfumes`,
			});
			const result = response.data;
			dispatch(setParfume(result));
		} catch (error) {
			console.log(error);
		}
	};
}

export function fetchTreatment() {
	return async function (dispatch, getState) {
		try {
			const response = await localhost({
				method: "get",
				url: `/special-treatments`,
			});
			const result = response.data;

			dispatch(setTreatment(result));
		} catch (error) {
			console.log(error);
		}
	};
}

export function createOrder(payload) {
	return async function (dispatch, getState) {
		try {
			const state = getState();
			console.log(3, state.reducer.access_token);
			const response = await localhost({
				method: "post",
				url: `/orders`,
				headers: {
					access_token: state.reducer.access_token.toString(),
				},
				data: payload,
			});

			if (response.status == 201) {
				return "success";
			} else {
				throw Error;
			}
		} catch (error) {
			console.log(error, "ini eror");
		}
	};
}

export function loginUser(payload) {
	return async function (dispatch, getState) {
		try {
			const response = await localhost({
				method: "post",
				url: `/login`,
				data: payload,
			});

			dispatch(setToken(response.data.access_token));
			return "success";
		} catch (error) {
			return error;
		}
	};
}

export function fetchOrders() {
	return async function (dispatch, getState) {
		try {
			const state = getState();

			const response = await localhost({
				method: "get",
				headers: {
					access_token: state.reducer.access_token.toString(),
				},
				url: `/orders`,
			});
			const result = response.data;
			dispatch(setOrders(result));
		} catch (error) {
			console.log(error);
		}
	};
}

export function fetchOrderDetail(id) {
	return async function (dispatch, getState) {
		try {
			const state = getState();

			const response = await localhost({
				method: "get",
				headers: {
					access_token: state.reducer.access_token,
				},
				url: `/orders/${id}`,
			});
			const result = response.data;
			console.log(result, "resulltt");
			dispatch(setOrderDetail(result));
		} catch (error) {
			console.log(error);
		}
	};
}

export function fetchQrCode(payload) {
	return async function (dispatch, getState) {
		try {
			const response = await happi({
				url: `/v1/qrcode?data=${payload}`,
				method: "get",
			});
			const result = response.data;
			dispatch(setQrCode(result));
		} catch (error) {
			console.log(error);
		}
	};
}

export function registerUser(payload) {
	return async function (dispatch, getState) {
		// console.log(payload);
		try {
			const response = await localhost({
				method: "post",
				url: `/register`,
				data: payload,
			});
			console.log(2, response.data.access_token);
			dispatch(setToken(response.data.access_token));
			return "success";
		} catch (error) {
			return error.response.data.msg;
		}
	};
}
