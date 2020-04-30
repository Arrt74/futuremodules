import {NavbarLoginRegisterLinks} from "./NavbarLoginRegisterLinks";
import React from "reactn";
import {NavbarUserAvatar} from "./NavbarUserAvatar";
import {useContext} from "react";
import {AuthContext} from "../../auth/authContext";
import {NavbarUserContainer} from "./navbar-styled";


export const NavbarUser = () => {

  const auth = useContext(AuthContext);

  return (
    <NavbarUserContainer>
      {auth.user ? (
        <div>
          <NavbarUserAvatar user={auth.user}/>
        </div>
      ) : (
        <div>
          <NavbarLoginRegisterLinks/>
        </div>
      )}
    </NavbarUserContainer>
  )

};
