import {Link} from "react-router-dom";
import {getUserName, logoffFromProject, useGetAuth} from "../../auth/authAccessors";
import React from "react";
import {Flex, Logo1TextSpanBold, Logo2TextSpanBold, Mx025} from "../../reactComponentStyles/reactCommon.styled";

export const NavbarUserAvatar = () => {

  const auth = useGetAuth();
  const userName = getUserName(auth);

  return (
    <Link to="/dashboarduser" onClick={() => {
      logoffFromProject(auth);
    }}>
      {userName && <Flex alignItems={"center"}>
        <div>
          <Logo1TextSpanBold
            fontSize={"30px"}>
            <i className="fas fa-user-circle"/>
          </Logo1TextSpanBold>
        </div>
        <Mx025/>
        <div>
          <Logo2TextSpanBold>
            {userName}
          </Logo2TextSpanBold>
        </div>
      </Flex>}
    </Link>
  )
};
