import {
  SET_SERVICES,
  SET_ACCESS_TOKEN,
  SET_PARFUME,
  SET_TREATMENT,
} from "./actionType";

const initialState = {
  services: [],
  access_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ2ZXJsaWdpZ2FAbWFpbC5jb20iLCJwaG9uZU51bWJlciI6MTIzNDU2ODksInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzMjA1NzM1Nn0.qfHbeUKQy85CZ1naIwVUEa9aN_iFnn2ouvkB2CLlL3",
  perfumes: [],
  loading: false,
  treatments: [],
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
      console.log("masuk");
      const dataToken = {
        ...state,
        access_token: action.payload,
      };
      return dataToken;

    default:
      return state;
  }
}
