import "./reactCommon.css"
import {HR, Logo1TextSpanBold, Mx05, My1, My2, Span, Text} from "./reactCommon.styled";
import React from "reactn";
import {Fragment, useEffect, useRef} from "react";
import {Row} from "react-bootstrap";

export const FAIcon = ({icon, variant}) => {
  return (
    <Span color={`var(--${variant})`}>
      <i className={`fas fa-${icon}`}/>
    </Span>
  )
};

export const SpanV = ({variant, text}) => {
  return (
    <Span color={`var(--${variant})`}>
      {text}
    </Span>
  )
};

const iconTitle = (icon, text) => {
  return (
    <Fragment>
      <Logo1TextSpanBold><i className={icon}/></Logo1TextSpanBold>
      <Mx05/>
      {text}
    </Fragment>
  )
};

const iconTitleCenter = (icon, text) => {
  return (
    <div style={{textAlign:"center"}}>
      <Logo1TextSpanBold><i className={icon}/></Logo1TextSpanBold>
      <Mx05/>
      {text}
    </div>
  )
};

const customIconTitle = (icon, text, color) => {
  return (
    <Fragment>
      <Text color={color}><i className={icon}/></Text>
      <Mx05/>
      {text}
    </Fragment>
  )
};

export const CustomTitle = (props) => {
  return (
    <Fragment>
      {iconTitle(`fas fa-${props.icon}`, props.text)}
    </Fragment>)
};

export const CustomTitle2 = (props) => {
  return (
    <Fragment>
      {iconTitle(`fas fa-${props.icon}`, props.children)}
    </Fragment>)
};

export const CustomTitleCenter = (props) => {
  return (
    <Fragment>
      {iconTitleCenter(`fas fa-${props.icon}`, props.children)}
    </Fragment>)
};

export const CustomColorTitle = (props) => {
  return (
    <Fragment>
      {customIconTitle(`fas fa-${props.icon}`, props.text, props.color)}
    </Fragment>)
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

export const RowSeparatorDoubleHR = () => {
  return (
    <Fragment>
      <Row><My2/></Row>
      <Row><HR></HR></Row>
      <Row><My2/></Row>
    </Fragment>
  )
};

export const RowSeparator = () => {
  return (
    <Row><My1/></Row>
  )
};

export const useRefWithFocusOnMount = () => {
  const focusableItem = useRef(null);

  useEffect(() => {
    if (focusableItem.current) {
      focusableItem.current.focus();
      focusableItem.current.select();
    }
  }, []);

  return focusableItem;
}
