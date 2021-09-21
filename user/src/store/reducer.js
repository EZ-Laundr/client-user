import {
  SET_SERVICES,
  SET_ACCESS_TOKEN,
  SET_PARFUME,
  SET_TREATMENT,
  SET_ORDERS,
  SET_ORDER_DETAIL,
  SET_QR_CODE,
  SET_LOADING,
  SET_USER_ID,
} from "./actionType";

const initialState = {
  services: [],
  access_token: "",
  perfumes: [],
  loading: false,
  treatments: [],
  orders: [],
  detailOrder: [],
  qrCode: "",
  userId: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SERVICES:
      const dataService = {
        ...state,
        services: action.payload,
      };
      return dataService;

    case SET_USER_ID:
      const idUser = {
        ...state,
        userId: action.payload,
      };
      return idUser;

    case SET_LOADING:
      const statusLoading = {
        ...state,
        loading: action.payload,
      };
      return statusLoading;

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
