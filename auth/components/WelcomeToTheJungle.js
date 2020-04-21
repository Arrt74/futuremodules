import React from "reactn";
import {
  LightColorTextSpan,
  SecondaryAltColorTextSpan
} from "../../../futuremodules/reactComponentStyles/reactCommon.styled";

export const WelcomeToTheJungle = ({username}) => {

  return (
    <div>
      <LightColorTextSpan fontSize={"var(--font-size-medium)"}>Hello, </LightColorTextSpan>{" "}
      <SecondaryAltColorTextSpan fontSize={"var(--font-size-very-large)"}>
        {username}
      </SecondaryAltColorTextSpan>
    </div>
  )
};
