import axios from "axios";
import {createAntiForgeryTokenHeaders} from "../auth/authAccessors";

const getScripts = async (trendId) => {
  return await axios.get(`/gapi/fetch/scripts/${trendId}`, createAntiForgeryTokenHeaders());
};

const addNewScript = async (body) => {
  return await axios.post(`/gapi/fetch/addNewScript`, body, createAntiForgeryTokenHeaders());
};

const putScript = async (body) => {
  return await axios.put(`/gapi/fetch/script`, body, createAntiForgeryTokenHeaders());
};

export {
  getScripts,
  addNewScript,
  putScript
}
