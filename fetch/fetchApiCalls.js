import axios from "axios";
import {createAntiForgeryTokenHeaders} from "../auth/authAccessors";

const getCSV = async (body) => {
  return await axios.post(`/gapi/fetch/csvkeys`, body);
}

const getCSVGraphKeys = async (body) => {
  return await axios.post(`/gapi/fetch/csvgraphkeys`, body, createAntiForgeryTokenHeaders());
}

export {
  getCSV,
  getCSVGraphKeys
}
