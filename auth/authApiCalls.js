import axios from "axios";
import {isStatusCodeSuccessful} from "../api/apiStatus";
import {wscClose, wscConnect} from "./websockets";
import {insertAntiForgeryTokenHeaders} from "./authAccessors";

const loadUser = async () => {
  return await axios.get(`/gapi/user`, insertAntiForgeryTokenHeaders());
}

const getTokenResponse = async (res, websocketMessageHandler) => {
  if (isStatusCodeSuccessful(res.status)) {
    localStorage.setItem("token", res.data.token);
    websocketMessageHandler && websocketMessageHandler();
    wscConnect(res.data.session);
    return await loadUser();
  }
  return res;
}

const loginUser = async (email, password, websocketMessageHandler) => {
  const res = await axios.post("/gapi/gettoken", {email: email, password: password});
  return await getTokenResponse(res, websocketMessageHandler);
};

const registerUser = async (name, email, password, websocketMessageHandler) => {
  const res = await axios.post("/gapi/user", {name, email, password});
  return await getTokenResponse(res, websocketMessageHandler);
};

const logoutUser = async () => {
  const res = await axios.put(`/gapi/cleanToken`, {},  insertAntiForgeryTokenHeaders());
  localStorage.removeItem("token");
  wscClose();
  return res;
};

export {
  loadUser,
  loginUser,
  registerUser,
  logoutUser
}
