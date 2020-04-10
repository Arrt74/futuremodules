import {getAuthUserName, getAuthWithGlobal} from "../../auth/authAccessors";
import {NavbarLoginRegisterLinks} from "./NavbarLoginRegisterLinks";
import React, {withGlobal} from "reactn";
import {NavbarUserAvatar} from "./NavbarUserAvatar";
import styled from 'styled-components'
import {Fragment} from "react";
import {navbarJustifyEndsWidth} from "./navbar-styled";

const NavbarUserContainer = styled.div`{
  display: flex;
  width: ${navbarJustifyEndsWidth};
  justify-content: flex-end;  
}`;

const NavbarUser = (props) => {

  if ( props.auth === undefined ) {
    return (<Fragment/>)
  }

  return (
    <NavbarUserContainer>
      {getAuthUserName(props.auth) ? (
        <div>
          <NavbarUserAvatar/>
        </div>
      ) : (
        <div>
          <NavbarLoginRegisterLinks/>
        </div>
      )}
    </NavbarUserContainer>
  )

};

export default withGlobal(
  global => getAuthWithGlobal(global)
)(NavbarUser);
