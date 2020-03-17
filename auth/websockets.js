import {w3cwebsocket as W3CWebSocket} from "websocket";

export let webSocketClientInstance = null;

const wscSendInternal = (message, obj) => {
  if (webSocketClientInstance.readyState === webSocketClientInstance.OPEN) {
    const sd = {
      msg: message,
      data: obj
    };
    // console.log("[WSS] Sending: ", sd);
    webSocketClientInstance.send(JSON.stringify(sd));
  }
};

export const wscConnect = session => {
  const webSocketServerAddress = `wss://${process.env.REACT_APP_EH_CLOUD_HOST}/wss/?s=${session}`;

  webSocketClientInstance = new W3CWebSocket(webSocketServerAddress);
  webSocketClientInstance.onopen = () => {
    console.log("[WSS-REACT]WebSocket Client Connected");
  };
};

export const wscClose = user => {
  // wscSendInternal("Logout", `${user.name} has logged out!`);
  if (webSocketClientInstance) {
    webSocketClientInstance.close();
    webSocketClientInstance = null;
  }
};

export const wscSend = (message, obj) => {
  wscSendInternal(message, obj);
};
