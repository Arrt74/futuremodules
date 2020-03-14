import {useGlobal} from "reactn";
import {updateGlobal} from "../globalhelper/globalHelper";

export const Auth = 'auth';

export const useGetAuth = () => {
  return useGlobal(Auth);
}

export const getUser = authContainer => {
  const [auth] = authContainer;
  return auth ? auth.user : null;
};

export const useGetUser = () => {
  const [auth] = useGlobal(Auth);
  return auth ? auth.user : null;
};

export const getUserName = authContainer => {
  const [auth] = authContainer;
  return auth ? auth.user.name : null;
};

export const useGetUserName = () => {
  const [auth] = useGlobal(Auth);
  return auth ? auth.user.name : null;
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
