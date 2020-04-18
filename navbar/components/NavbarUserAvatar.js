import {Link} from "react-router-dom";
import {getUserName, logoffFromProject, useGetAuth} from "../../auth/authAccessors";
import React from "react";
import {InfoTextSpanBold, Logo2TextSpan} from "../../reactComponentStyles/reactCommon.styled";

export const NavbarUserAvatar = () => {

  const auth = useGetAuth();
  const userName = getUserName(auth);

  return (
    <Link to="/dashboarduser" onClick={() => {
      logoffFromProject(auth);
    }}>
      {userName && <span><span><i className="fas fa-user"/></span><Logo2TextSpan>{" "}{userName}</Logo2TextSpan></span>}
    </Link>
  )
};
