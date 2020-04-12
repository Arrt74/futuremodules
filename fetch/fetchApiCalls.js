import axios from "axios";
import {createAntiForgeryTokenHeaders} from "../auth/authAccessors";

const getCSV = async (body) => {
  return await axios.post(`/gapi/fetch/csvkeys`, body);
};

const getCSVGraphKeys = async (body) => {
  return await axios.post(`/gapi/fetch/csvgraphkeys`, body, createAntiForgeryTokenHeaders());
};

const putScript = async (body) => {
  return await axios.put(`/gapi/fetch/script`, body, createAntiForgeryTokenHeaders());
};

export {
  getCSV,
  getCSVGraphKeys,
  putScript
}
