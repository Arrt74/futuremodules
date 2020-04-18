import {LinkContainer} from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import {Flex, Mx1} from "../../reactComponentStyles/reactCommon.styled";
import React from "react";
import {CustomTitle, RocketTitle} from "../../reactComponentStyles/reactCommon";

export const NavbarLoginRegisterLinks = () => {
  return (
    <Flex>
      <LinkContainer key={"register"} to={"/register"}>
        <Button variant={"outline-info"}><CustomTitle text={"Register"} icon={"user"}/></Button>
      </LinkContainer>
      <Mx1/>
      <LinkContainer key={"login"} to={"/login"}>
        <Button variant={"outline-primary"}><RocketTitle text={"Login"}/></Button>
      </LinkContainer>
    </Flex>
  )
};
