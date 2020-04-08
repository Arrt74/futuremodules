import React, {useEffect, withGlobal} from "reactn";
import {getAuthUserName} from "../../auth/authAccessors";
import {Button, ButtonGroup, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {connect, phoneCall, sendChatMessage} from "../client";
import {useState} from "react";
import {
  InfoTextSpanBold,
  LightColorTextSpan,
  Video,
  VideoPhoneChatContainer
} from "../../reactComponentStyles/reactCommon.styled";

const VideoPhoneChat = (props) => {

  const auth = props.auth;

  console.log("Auth:" + JSON.stringify(props));
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
  }

  const messageCallback = (msg) => {
    setCurrentChat(m => m.concat(msg));
  }

  // if (!isUserAuthenticated(props.auth)) {
  //   // return (<Redirect to={"/"}/>)
  //   return (<Fragment/>)
  // }

  return (
    <VideoPhoneChatContainer>
      <Container>
        <Row className={"my-2"}>
          <Video id="received_video" width={"100%"} autoPlay/>
        </Row>
        <Row className={"my-2"}>
          <Video id="local_video" width={"100%"} autoPlay muted/>
        </Row>
        <Row>
          <ul>
            {currentChat.map(elem => (<li> <InfoTextSpanBold>{elem.username}</InfoTextSpanBold>: <LightColorTextSpan fontSize={"0.75rem"}>{elem.text}</LightColorTextSpan> </li>))}
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
        <Row>
          <ButtonGroup aria-label="">
            <Button variant="primary"><i className={"fas fa-comments"}/>{" "}chat</Button>
            <Button variant="info"><i className={"fas fa-phone-alt"}/>{" "}phone</Button>
            <Button variant="success" onClick={() => makePhoneCall()}><i className={"fas fa-video"}/>{" "}video</Button>
          </ButtonGroup>
        </Row>
      </Container>
    </VideoPhoneChatContainer>
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
