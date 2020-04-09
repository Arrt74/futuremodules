import styled from "styled-components";

export const Body = styled.div` {
  max-width: ${props => props.maxWidth || "1024px"};
  margin: auto;
}`;

export const NiceSearchBar = styled.input` {
  margin: ${props => props.marginTop || "0"} auto;
  height: ${props => props.height || "38px"};
  width: ${props => props.width || "100%"};
  padding-left: ${props => props.paddingLeft || "10px"};
  font-size: 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  outline: none;
  color: var(--light-color);
  background-color: var(--dark-color);

  :hover {
    box-shadow: inset 0 0 1px 1px var(--primary-color);
  }
  
  :hover {
    box-shadow: inset 0 0 1px 1px var(--primary-color);
  }
  
  :active {
    box-shadow: inset 0 0 1px 1px var(--primary-color);
  }
}`;

export const Flex = styled.div` {
    display: flex;
    align-items: baseline;
}`;

export const MarginBorderDiv = styled.div` {
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  margin: 5px 0;
  padding: 10px;
}`;

export const RightBorder = styled.div` {
  border-right: 1px solid var(--primary-color);
}`;

export const AvatarRound = styled.img` {
  vertical-align: middle;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--logo-color-1);
}`;

export const InfoTextSpan = styled.span` {
  color: var(--info);
  font-size: ${props => props.fontSize};
}`;

export const InfoTextSpanBold = styled.span` {
  color: var(--info);
  font-weight: bold;
  font-size: ${props => props.fontSize};
}`;

export const Logo1TextSpan = styled.span` {
  color: var(--logo-color-1);
  font-size: ${props => props.fontSize};
}`;

export const Logo1TextSpanBold = styled.span` {
  color: var(--logo-color-1);
  font-weight: bold;
  font-size: ${props => props.fontSize};
}`;

export const Logo2TextSpan = styled.span` {
  color: var(--logo-color-2);
  font-size: ${props => props.fontSize};
}`;

export const Logo2TextSpanBold = styled.span` {
  color: var(--logo-color-2);
  font-weight: bold;
  font-size: ${props => props.fontSize};
}`;

export const SuccessTextSpan = styled.span` {
  color: var(--success);
  font-size: ${props => props.fontSize};
}`;

export const SuccessTextSpanBold = styled.span` {
  color: var(--success);
  font-weight: bold;
  font-size: ${props => props.fontSize};
}`;

export const LightTextSpan = styled.span` {
  color: var(--light);
  font-size: ${props => props.fontSize};
}`;

export const LightTextSpanBold = styled.span` {
  color: var(--light);
  font-weight: bold;
  font-size: ${props => props.fontSize};
}`;

export const LightColorTextSpan = styled.span` {
  color: var(--light-color);
  font-size: ${props => props.fontSize};
}`;

export const LightColorTextSpanBold = styled.span` {
  color: var(--light-color);
  font-weight: bold;
  font-size: ${props => props.fontSize};
}`;

export const SecondaryAltColorTextSpan = styled.span` {
  color: var(--secondary-alt-color);
  font-size: ${props => props.fontSize};
}`;

export const SecondaryAltColorTextSpanBold = styled.span` {
  color: var(--secondary-alt-color);
  font-weight: bold;
  font-size: ${props => props.fontSize};
}`;

export const Video = styled.video `{
  background-color: var(--dark-color-transparent);
  border: 1px solid var(--light);
  border-radius: 5px;
}`;

export const VideoPhoneChatContainer = styled.div `{
  width: 100%;
  overflow: hidden;
}`;

