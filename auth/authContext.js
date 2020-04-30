import React from "react";
import {useEffect} from "react";
import {apiSilent, useApi} from "../api/apiEntryPoint";
import {loadUser} from "./authApiCalls";
import {Auth, useGetUser} from "./authAccessors";

export const AuthContext = React.createContext( {
    auth: null,
  }
);

export const useAuth = () => {
  const authApi = useApi(Auth);
  useEffect(() => {
    apiSilent(authApi, loadUser).then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const AuthContextProvider = props => {

  useAuth();
  const user = useGetUser();

  return (
    <AuthContext.Provider value={{user}}>
      {props.children}
    </AuthContext.Provider>
  )
}
