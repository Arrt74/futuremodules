import axios from "axios";
import {isStatusCodeSuccessful} from "../api/apiStatus";
import {wscClose, wscConnect} from "./websockets";

export const loadUser = async () => {
  return await axios.get(`/api/user`);
}

const getTokenResponse = async (res, websocketMessageHandler) => {
  if ( isStatusCodeSuccessful(res.status) ) {
    localStorage.setItem("token", res.data.token);
    wscConnect(res.data.session);
    websocketMessageHandler && websocketMessageHandler();
    return await loadUser();
  }
  return res;
}

export const loginUser = async (email, password, websocketMessageHandler) => {
  const res = await axios.post("/api/gettoken", { email:email, password:password} );
  return await getTokenResponse(res, websocketMessageHandler);
};

export const registerUser = async (name, email, password, websocketMessageHandler) => {
  const res = await axios.post("/api/createuser", { name, email, password });
  return await getTokenResponse(res, websocketMessageHandler);
};

export const logoutUser = async () => {
  const res = await axios.put(`/api/cleanToken`);
  localStorage.removeItem("token");
  wscClose();
  return res;
};
