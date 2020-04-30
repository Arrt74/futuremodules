import {Link} from "react-router-dom";
import React from "react";
import {Flex, LightColorTextSpanBold, Logo1TextSpanBold, Mx025} from "../../reactComponentStyles/reactCommon.styled";

export const NavbarUserAvatar = ({user}) => {

  const userName = user.name;

  return (
    <Link to="/dashboarduser">
      {userName && <Flex alignItems={"center"}>
        <div>
          <Logo1TextSpanBold
            fontSize={"30px"}>
            <i className="fas fa-user-circle"/>
          </Logo1TextSpanBold>
        </div>
        <Mx025/>
        <div>
          <LightColorTextSpanBold>
            {userName}
          </LightColorTextSpanBold>
        </div>
      </Flex>}
    </Link>
  )
};
