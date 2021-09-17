import { SET_SERVICES } from "./actionType";

const initialState = {
  services: [],
  status: "unsolved",
  loading: false,
  leaderboard: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SERVICES:
      const dataService = {
        ...state,
        services: action.payload,
      };
      return dataService;

    default:
      return state;
  }
}
