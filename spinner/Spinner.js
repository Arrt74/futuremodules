import React from "react";
import {DivFixedCenterTopMiddle} from "../../components/dashboardProject/subcomponents/Layout/LayoutEditor.styled";
import {Spinner} from "react-bootstrap";

export const SpinnerTopMiddle = (props) => {
  return (
    <DivFixedCenterTopMiddle>
      <Spinner animation="grow" variant={props.variant || "warning"}/>
    </DivFixedCenterTopMiddle>
  )
};
