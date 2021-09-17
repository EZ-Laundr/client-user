import { SET_SERVICES, SET_ACCESS_TOKEN } from "./actionType";

const initialState = {
  services: [],
  access_token: "",
  loading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SERVICES:
      const dataService = {
        ...state,
        services: action.payload,
      };
      return dataService;

    case SET_ACCESS_TOKEN:
      const dataToken = {
        ...state,
        access_token: action.payload,
      };
      return dataToken;

    default:
      return state;
  }
}
