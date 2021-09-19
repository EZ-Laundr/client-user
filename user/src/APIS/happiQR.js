import axios from "axios";

const happi = axios.create({
  baseURL: "https://api.happi.dev",
  headers: {
    "x-happi-key": "b7d5ae0355sk7GT5BADnxDzmaANVCcTmRXQmxPcupGHN2rlyFQTDGctJ",
  },
});

export default happi;
