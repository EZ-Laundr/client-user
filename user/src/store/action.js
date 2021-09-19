import {
  SET_SERVICES,
  SET_PARFUME,
  SET_TREATMENT,
  SET_ACCESS_TOKEN,
} from "./actionType";
import localhost from "../APIS/axiosAPI";

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
