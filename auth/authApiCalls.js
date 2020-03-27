import axios from "axios";
import {isStatusCodeSuccessful} from "../api/apiStatus";
import {wscClose, wscConnect} from "./websockets";
import * as globalConfig from "eh_config";

const createAntiForgeryTokenHeaders = () => {
    const result = {};
    if (document.cookie) {
        const cookieContent=document.cookie.replace(`(?:(?:^|.*;\\s*)${globalConfig.AntiForgeryTokenCookie}\\s*=\\s*([^;]*).*$)|^.*$`, "$1");
        if (cookieContent.length>6) {
            //console.log(cookieContent);
            if (cookieContent.startsWith("s%3A")) {
                const endAft=cookieContent.indexOf(".",4);
                if (endAft!==-1) {
                    const aft=cookieContent.substr(4,endAft-4);
                    //console.log("*"+aft+"*");
                    result["headers"] = {};
                    result["headers"][globalConfig.AntiForgeryTokenCookie]=aft;
                }
            }
        }
    }
    return result;
}


const loadUser = async () => {
    const headers=createAntiForgeryTokenHeaders();
    const result=await axios.get(`/gapi/user`,headers);
    return result;
}



const getTokenResponse = async (res, websocketMessageHandler) => {
  if ( isStatusCodeSuccessful(res.status) ) {
    localStorage.setItem("token", res.data.token);
    websocketMessageHandler && websocketMessageHandler();
    wscConnect(res.data.session);
    return await loadUser();
  }
  return res;
}

const loginUser = async (email, password, websocketMessageHandler) => {
  const res = await axios.post("/gapi/gettoken", { email:email, password:password} );
  return await getTokenResponse(res, websocketMessageHandler);
};

const registerUser = async (name, email, password, websocketMessageHandler) => {
  const res = await axios.post("/gapi/user", { name, email, password });
  return await getTokenResponse(res, websocketMessageHandler);
};

const logoutUser = async () => {
  const headers=createAntiForgeryTokenHeaders();
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
