import axios from "axios";
import {isStatusCodeSuccessful} from "../api/apiStatus";
import {wscClose, wscConnect} from "./websockets";
import {createAntiForgeryTokenHeaders} from "./authAccessors";

const loadUser = async () => {
  const headers = createAntiForgeryTokenHeaders();
  return await axios.get(`/gapi/user`, headers);
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
  const headers = createAntiForgeryTokenHeaders();
  const res = await axios.put(`/gapi/cleanToken`, {}, headers);
  localStorage.removeItem("token");
  wscClose();
  return res;
};

export {
  createAntiForgeryTokenHeaders,
  loadUser,
  loginUser,
  registerUser,
  logoutUser
}
