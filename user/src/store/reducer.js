import { SET_SERVICES, SET_ACCESS_TOKEN } from "./actionType";

const initialState = {
  services: [
    {
      id: 1,
      title: "Cuci Aja",
      image:
        "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
    },
    {
      id: 2,
      title: "Cuci Setrika",
      image:
        "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
    },
    {
      id: 3,
      title: "Setrika Aja",
      image:
        "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
    },
    {
      id: 4,
      title: "Apalagi?",
      image:
        "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
    },
  ],
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
