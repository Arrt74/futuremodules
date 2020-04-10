import {LinkContainer} from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import {Mx1} from "../../reactComponentStyles/reactCommon.styled";
import React from "react";

export const NavbarLoginRegisterLinks = () => {
  return (
    <div>
      <LinkContainer key={"register"} to={"/register"}>
        <Button variant={"info"}> <i className="fas fa-user"/>{" "}Register{" "}</Button>
      </LinkContainer>
      <Mx1/>
      <LinkContainer key={"login"} to={"/login"}>
        <Button variant={"primary"}> {" "}<i className="fas fa-rocket"/>{" "}Login</Button>
      </LinkContainer>
    </div>
  )
};
