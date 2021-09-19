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
  console.log("masuk");
  return async function (dispatch, getState) {
    try {
      console.log("try");
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
      console.log(result);
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
      console.log(state.reducer.access_token);
      const response = await localhost({
        method: "post",
        url: `/orders`,
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ2ZXJsaWdpZ2FAbWFpbC5jb20iLCJwaG9uZU51bWJlciI6MTIzNDU2ODksInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMjA1Nzc3Mn0.JYzjQpB62QHh4X3ol3rLwqxARc3AZpXWKz4AIkjsiRs",
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
      console.log(response, "responsee");
      dispatch(setToken(response.access_token));
      return "success";
    } catch (error) {
      return error;
    }
  };
}

export function fetchOrders() {
  return async function (dispatch, getState) {
    try {
      const response = await localhost({
        method: "get",
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ2ZXJsaWdpZ2FAbWFpbC5jb20iLCJwaG9uZU51bWJlciI6MTIzNDU2ODksInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMjA1Nzc3Mn0.JYzjQpB62QHh4X3ol3rLwqxARc3AZpXWKz4AIkjsiRs",
        },
        url: `/orders`,
      });
      const result = response.data;
      dispatch(setOrders(result));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchOrderDetail(id) {
  return async function (dispatch, getState) {
    try {
      const response = await localhost({
        method: "get",
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ2ZXJsaWdpZ2FAbWFpbC5jb20iLCJwaG9uZU51bWJlciI6MTIzNDU2ODksInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMjA1Nzc3Mn0.JYzjQpB62QHh4X3ol3rLwqxARc3AZpXWKz4AIkjsiRs",
        },
        url: `/orders/${id}`,
      });
      const result = response.data;
      dispatch(setOrderDetail(result));
      console.log(result);
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
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
}
