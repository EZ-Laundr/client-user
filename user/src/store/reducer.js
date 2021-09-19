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
  perfumes: [
    {
      id: 1,
      title: "Mawar",
      image:
        "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
      price: 15000,
    },
    {
      id: 2,
      title: "Melati",
      image:
        "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
      price: 20000,
    },
    {
      id: 3,
      title: "Rokok",
      image:
        "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
      price: 25000,
    },
    {
      id: 4,
      title: "Kopi",
      image:
        "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
      price: 10000,
    },
  ],
  loading: false,
  treatments: [
    {
      id: 1,
      title: "Handuk",
      image:
        "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
      price: 10000,
    },
    {
      id: 2,
      title: "Selimut",
      image:
        "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
      price: 50000,
    },
    {
      id: 3,
      title: "Sepatu",
      image:
        "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
      price: 30000,
    },
    {
      id: 4,
      title: "Daleman",
      image:
        "https://www.daya.id/01%20Tips%20-%20Info%20Terkini/Usaha/2021/2021%20-%2001/Cara%20memulai%20usaha%20laundry%20yang%20benar%20agar%20tidak%20rugi/Gambar%201.jpg",
      price: 100000,
    },
  ],
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
