import axios from "axios";
import {createAntiForgeryTokenHeaders} from "../auth/authAccessors";

const addNewScript = async (body) => {
  return await axios.post(`/gapi/fetch/script`, body, createAntiForgeryTokenHeaders());
};

export {
  addNewScript,
}
