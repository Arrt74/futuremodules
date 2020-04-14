import axios from "axios";
import {createAntiForgeryTokenHeaders} from "../auth/authAccessors";

const getScripts = async (trendId) => {
  return await axios.get(`/gapi/fetch/scripts/${trendId}`, createAntiForgeryTokenHeaders());
};

const addNewScript = async (body) => {
  return await axios.post(`/gapi/fetch/script`, body, createAntiForgeryTokenHeaders());
};

const putScript = async (body) => {
  return await axios.put(`/gapi/fetch/script`, body, createAntiForgeryTokenHeaders());
};

const patchScript = async (trendId, name) => {
  return await axios.patch(`/gapi/fetch/script`, {trendId, name}, createAntiForgeryTokenHeaders());
};

const deleteScript = async (trendId, name) => {
  return await axios.delete(`/gapi/fetch/script`, {...createAntiForgeryTokenHeaders(), data: {trendId, name}});
};

export {
  getScripts,
  addNewScript,
  putScript,
  patchScript,
  deleteScript
}
