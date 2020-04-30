import {useGlobal} from "reactn";
import {updateGlobal} from "../globalhelper/globalHelper";
import {useApi} from "../api/apiEntryPoint";

export const Auth = 'auth';

export const createAntiForgeryTokenHeaders = () => {
  const result = {};
  if (document.cookie) {
    const regexSearch = `(?:(?:^|.*;\\s*)${process.env.REACT_APP_EH_ANTIFORGERYTOKEN_COOKIE}\\s*=\\s*([^;]*).*$)|^.*$`;
    const regex = RegExp(regexSearch, "i");
    const cookieContent = document.cookie.replace(regex, "$1");
    if (cookieContent.length > 6) {
      if (cookieContent.startsWith("s%3A")) {
        const endAft = cookieContent.indexOf(".", 4);
        if (endAft !== -1) {
          const aft = cookieContent.substr(4, endAft - 4);
          result["headers"] = {};
          result["headers"][process.env.REACT_APP_EH_ANTIFORGERYTOKEN_COOKIE] = aft;
        }
      }
    }
  }
  return result;
}

export const useAuth = () => {
  return useApi(Auth);
};

export const useGetAuth = () => {
  return useGlobal(Auth);
};

// export const isUserAuthentiacated = (authContainer) => {
//   const [auth, loading] = authContainer;
//
//   if (!auth && loading === false) {
//     console.log("User not Authentiacted");
//     return 0;
//   } else if (!auth && loading === true) {
//     console.log("Checking if user Authenticated...");
//     return 2;
//   } else if (auth && loading === false) {
//     console.log("User IS Authenticated");
//     return 1;
//   }
//   console.log("User IS bwarf", authContainer);
//   return 0;
// }

export const isUserAuthenticated = (authContainer) => {
  if (!authContainer) return false;

  const [auth] = authContainer;

  return auth;
  // if (!auth && loading === false) {
  //   console.log("User not Authentiacted");
  //   return 0;
  // } else if (!auth && loading === true) {
  //   console.log("Checking if user Authenticated...");
  //   return 2;
  // } else if (auth && loading === false) {
  //   console.log("User IS Authenticated");
  //   return 1;
  // }
  // console.log("User IS bwarf", authContainer);
  // return 0;
}

export const getUser = authContainer => {
  const [auth] = authContainer;
  return auth ? auth.user : null;
};

export const useGetUser = () => {
  const [auth] = useGlobal(Auth);
  return auth ? auth.user : auth;
};

export const getUserName = authContainer => {
  if ( !authContainer ) return null;
  const [auth] = authContainer;
  return auth ? auth.user.name : null;
};

export const getAuthUserName = auth => {
  return auth ? auth.user.name : null;
};

export const useGetUserName = () => {
  const [auth] = useGlobal(Auth);
  return auth ? auth.user.name : null;
};

export const getUserEmail = authContainer => {
  const [auth] = authContainer;
  return auth ? auth.user.email : null;
};

export const useGetUserEmail = () => {
  const [auth] = useGlobal(Auth);
  return auth ? auth.user.email : null;
};

export const getUserInvitations = authContainer => {
  const [auth] = authContainer;
  return auth ? auth.invitations : [];
};

export const useGetUserInvitations = () => {
  const [auth] = useGlobal(Auth);
  return auth ? auth.invitations : [];
};

export const getProject = authContainer => {
  const [auth] = authContainer;
  return auth ? auth.project : null;
};

export const useGetProject = () => {
  const [auth] = useGlobal(Auth);
  return auth ? auth.project : null;
};

export const useLogoffFromProject = () => {
  updateGlobal(useGlobal(Auth), {
    project: null
  })
};

export const logoffFromProject = authContainer => {
  updateGlobal(authContainer, {
    project: null
  })
};

export const useHasUser = () => {
  const [auth] = useGlobal(Auth);
  return (auth !== undefined);
}

// HOC for ReactN utility
export const getAuthWithGlobal = (global) => ({ auth: global.auth });
