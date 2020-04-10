import {getAuthUserName, getAuthWithGlobal} from "../../auth/authAccessors";
import {NavbarLoginRegisterLinks} from "./NavbarLoginRegisterLinks";
import React, {withGlobal} from "reactn";
import {NavbarUserAvatar} from "./NavbarUserAvatar";

const NavbarUser = (props) => {
  const userName = getAuthUserName(props.auth);

  return userName ? (
    <NavbarUserAvatar/>
  ) : (
    <NavbarLoginRegisterLinks/>
  );
};

export default withGlobal(
  global => getAuthWithGlobal(global)
)(NavbarUser);
