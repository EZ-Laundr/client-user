import {
	SET_SERVICES,
	SET_ACCESS_TOKEN,
	SET_PARFUME,
	SET_TREATMENT,
	SET_ORDERS,
	SET_ORDER_DETAIL,
	SET_QR_CODE,
} from "./actionType";

const initialState = {

  services: [],
  access_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ2ZXJsaWdpZ2FAbWFpbC5jb20iLCJwaG9uZU51bWJlciI6MTIzNDU2ODksInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMjA1Nzc3Mn0.JYzjQpB62QHh4X3ol3rLwqxARc3AZpXWKz4AIkjsiRs",
  perfumes: [],
  loading: false,
  treatments: [],
  orders: [],
  detailOrder: [],
  qrCode: "",
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_SERVICES:
			const dataService = {
				...state,
				services: action.payload,
			};
			return dataService;

		case SET_PARFUME:
			const dataParfume = {
				...state,
				perfumes: action.payload,
			};
			return dataParfume;

		case SET_TREATMENT:
			const dataTreat = {
				...state,
				treatments: action.payload,
			};
			return dataTreat;

		case SET_ACCESS_TOKEN:
			const dataToken = {
				...state,
				access_token: action.payload,
			};
			return dataToken;

		case SET_ORDERS:
			const dataOrders = {
				...state,
				orders: action.payload,
			};
			return dataOrders;

		case SET_ORDER_DETAIL:
			const dataOrderDetail = {
				...state,
				detailOrder: action.payload,
			};
			return dataOrderDetail;

		case SET_QR_CODE:
			// console.log("masuk");
			const dataQr = {
				...state,
				qrCode: action.payload,
			};
			return dataQr;

		default:
			return state;
	}
}
