import axios from "axios";
import {insertAntiForgeryTokenHeaders} from "../auth/authAccessors";

const addNewScript = async (body) => {
  return await axios.post(`/gapi/fetch/script`, body, insertAntiForgeryTokenHeaders());
};

export {
  addNewScript,
}
