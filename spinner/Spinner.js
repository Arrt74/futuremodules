import React from "react";
import {Spinner} from "react-bootstrap";
import {DivFixedCenterTopMiddle} from "../reactComponentStyles/reactCommon.styled";

export const SpinnerTopMiddle = (props) => {
  return (
    <DivFixedCenterTopMiddle>
      <Spinner animation="grow" variant={props.variant || "warning"}/>
    </DivFixedCenterTopMiddle>
  )
};
