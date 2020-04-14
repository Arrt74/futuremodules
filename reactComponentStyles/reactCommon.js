import "./reactCommon.css"
import {Flex, Logo1TextSpanBold, Mx05, My1, My2} from "./reactCommon.styled";
import React from "reactn";
import {Fragment} from "react";
import {Row} from "react-bootstrap";

const iconTitle = (icon, text) => {
  return (
    <Flex justifyContent={"start"}>
      <div>
        <Logo1TextSpanBold><i className={icon}/></Logo1TextSpanBold>
      </div>
      <Mx05></Mx05>
      <div>
        {text}
      </div>
    </Flex>
  )
};

export const RocketTitle = (props) => {
  return (
    <Fragment>
      {iconTitle("fas fa-rocket", props.text)}
    </Fragment>)
};

export const PlusTitle = (props) => {
  return (
    <Fragment>
      {iconTitle("fas fa-plus-circle", props.text)}
    </Fragment>)
};

export const RowSeparatorDouble = () => {
  return (
    <Row><My2/></Row>
  )
};

export const RowSeparator = () => {
  return (
    <Row><My1/></Row>
  )
};
