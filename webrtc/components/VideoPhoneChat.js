import React, {useEffect, withGlobal} from "reactn";
import {getAuthUserName} from "../../auth/authAccessors";
import {Button, ButtonGroup, FormControl, InputGroup, Row} from "react-bootstrap";
import {connect, phoneCall, sendChatMessage} from "../client";
import {useState} from "react";
import {FlexVertical, InfoTextSpanBold, LightColorTextSpan, Video} from "../../reactComponentStyles/reactCommon.styled";

const Chat = ({currentChat}) => {
  return (
    <Row>
      <ul>
        {currentChat.map(elem => (<li><InfoTextSpanBold>{elem.username}</InfoTextSpanBold>: <LightColorTextSpan
          fontSize={"0.75rem"}>{elem.text}</LightColorTextSpan></li>))}
      </ul>
      <InputGroup className="mb-3" id="text" type="text" name="text" maxLength="256" placeholder="..."
                  autoComplete="off" onKeyUp={(evt) => {
        if ((evt.keyCode === 13 || evt.keyCode === 14)) {
          sendChatMessage(evt.target.value);
          evt.target.value = "";
        }
      }}>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1"><i className="fas fa-pencil-alt"/></InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl/>
      </InputGroup>
    </Row>
  )
}

const VideoPhoneChat = (props) => {

  const auth = props.auth;

  const [showChat, setShowChat] = useState(null);
  const [showVideoFeed, setShowVideoFeed] = useState(null);
  const [currentChat, setCurrentChat] = useState([]);
  const [wsconnection, setWSConnection] = useState(null);
  // const inChat = false;

  useEffect(() => {
    if (!wsconnection && auth) {
      setWSConnection(connect(getAuthUserName(auth), messageCallback));
    }
  }, [auth, wsconnection]);

  const makePhoneCall = () => {
    phoneCall("Dado");
    setShowChat(true);
    setShowVideoFeed(true);
  }

  const messageCallback = (msg) => {
    setCurrentChat(m => m.concat(msg));
  }

  // if (!isUserAuthenticated(props.auth)) {
  //   // return (<Redirect to={"/"}/>)
  //   return (<Fragment/>)
  // }

  return (
    <FlexVertical>
      {showVideoFeed && <>
        <Row className={"my-2"}>
          <Video id="received_video" width={"100%"} autoPlay/>
        </Row>
        <Row className={"my-2"}>
          <Video id="local_video" width={"100%"} autoPlay muted/>
        </Row></>}
      {showChat && <Chat currentChat={currentChat}/>}
      <ButtonGroup className={"w-100"}>
        <Button variant="primary"><i className={"fas fa-comments"}/><br/>chat</Button>
        <Button variant="info"><i className={"fas fa-phone-alt"}/><br/>phone</Button>
        <Button variant="success" onClick={() => makePhoneCall()}><i className={"fas fa-video"}/><br/>video</Button>
      </ButtonGroup>
    </FlexVertical>
  )
};

export default withGlobal(
  // Set the `value` prop equal to the global state's `value` property.
  global => ({
    auth: global.auth,
  }),

  // // Important Note: This is not the setGlobal helper function.
  // // Set the `incrementValue` prop to a function that increments the global
  // //   state's `value` property.
  // setGlobal => ({
  //   incrementValue: () => {
  //     // Important Note: This is not the setGlobal helper function.
  //     // This is the parameter referenced 4 lines up.
  //     setGlobal(global => ({
  //       value: global.value + 1,
  //     }));
  //   },
  // }),
)(VideoPhoneChat);
