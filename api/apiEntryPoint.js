import {apiStatusResponse, isStatusCodeAny400, isStatusCodeSuccessful} from "./apiStatus";
import {useGlobal} from "reactn";
import {alertDangerNoMovie, alertSuccess, alertWarning, NotificationAlert} from "../alerts/alerts";

export const octetStreamHeader = () => {
  return {
    headers: {
      "Content-Type": "application/octet-stream"
    }
  }
}

const tryToGetRealStatusCodeFromException = msg => {
  let code = 500;
  const checker = " status code ";
  const statusCodeIndex = msg.indexOf(checker);
  if (statusCodeIndex !== -1) {
    code = parseInt(msg.substring(statusCodeIndex + checker.length, msg.length));
    code = isNaN(code) ? 500 : code;
  }
  return code;
};

export const api = async (apiEntry, func, ...args) => {
  const storeData = apiEntry[0];
  const store = apiEntry[1];
  const alertStore = apiEntry[3];
  try {
    const res = await func(...args);
    let statusMessage = "OK";
    if (isStatusCodeSuccessful(res.status)) {
      if (store) {
        if (alertStore) {
          alertStore(null);
        }
        // 204 it's basically a "reset" code.
        if (res.status === 204) {
          store(null);
        } else {
          // Now 200s-300s will thread them as aggregate results
          store({
            ...storeData,
            ...res.data
          });
        }
      }
    } else if (isStatusCodeAny400(res.status)) {
      // If it's a 401 set the status to null to distinguish between a status not yet initialised (undefined)
      // and a unauthorized access
      if ( res.status === 401 ) {
        store(null);
      }
      // 400s are basically errors so the store won't change but we'll spawn an error and alert
      // the reason of the error will be the res.data itself, at least we can assume so
      statusMessage = res.data;
      alertWarning(alertStore, statusMessage);
    }

    return apiStatusResponse(res.status, statusMessage);
  } catch (e) {
    const msg = e.message;
    if (alertStore) alertDangerNoMovie(alertStore, "It's not you, it's us, a wizard has been summoned... Expecto Patronum!!!");
    return apiStatusResponse(tryToGetRealStatusCodeFromException(msg), msg);
  }
};

export const apiSilent = async (apiEntry, func, ...args) => {
  return await api([apiEntry[0], apiEntry[1], null, null], func, args);
}

export const useApi = (name) => {
  const q1 = useGlobal(name);
  const q2 = useGlobal(NotificationAlert);
  return [q1[0], q1[1], q2[0], q2[1]];
};

export const useApiSilent = (name) => {
  const q1 = useGlobal(name);
  return [q1[0], q1[1], null, null];
};

export const alertIfSuccessful = (res, alertStore, title, text) => {
  if (res.isSuccessful) {
    return alertSuccess(alertStore, title, text)
  }
};
