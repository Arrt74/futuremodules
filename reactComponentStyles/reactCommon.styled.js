import styled from "styled-components";

export const Body = styled.div` {
  max-width: ${props => props.maxWidth || "1024px"};
  margin: auto;
}`;

export const Div = styled.div` {
  width: ${props => props.width || "auto"} ;
  height: ${props => props.height || "auto"} ;
  margin: ${props => props.margin || "0"};
  padding: ${props => props.padding || "0"};
  font-size: ${props => props.fontSize || "inherit"};
  max-height: ${props => props.maxHeight || "auto"} ;
  overflow-y: ${props => props.overflowY || "inherit"} ;
  overflow-x: ${props => props.overflowX || "inherit"} ;
  word-wrap: ${props => props.wordWrap || "normal"} ;
  background: ${props => props.background || "none"};
}`;

export const DivWL = styled.div` {
  width: ${props => props.width || "auto"} ;
}`;

export const DivWR = styled.div`{
  display: flex;
  width: ${props => props.width || "auto"} ;
  justify-content: flex-end;  
}`;

export const DivBorder = styled(Div)` {
  border: 1px solid ${props => props.variant ? `var(--${props.variant})` : "var(--middle-grey-color)"};
  border-radius: 5px;
}`;

export const DivRightBorder = styled(Div)` {
  border-right: 1px solid ${props => props.variant ? `var(--${props.variant})` : "var(--middle-grey-color)"};
  margin: 10px 0;
}`;

export const DivInlineFlex = styled.div`{
  display: inline-flex;
  width: ${props => props.width || "auto"} ;
  height: ${props => props.height || "auto"} ;
  margin: ${props => props.margin || "0"};
  padding: ${props => props.padding || "0"};
  cursor:${props => props.cursor || "auto"};
}`;

export const Img100 = styled.img` {
  width: 100%;
}`;

export const Img100C = styled.img` {
  width: 100%;
  object-fit: cover;
}`;

export const ImgCover = styled.img` {
  object-fit: contain;
  width: 100%;
  height: ${props => props.height || "auto"} ;
}`;

export const NavbarComponent = styled.div` {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1001; // Needed to bump this up because maps were taking a lot of z-indices :/
  height: var(--navbar-height);
  background: var(--navbar-color-transparent);
  display: flex;
  justify-content: ${props => props.justifyContent || "space-between"} ;
  align-items:center;
  border-bottom: 1px solid var(--middle-grey-color);
  padding: 0 var(--mainMargin);
}`;

export const FakeNavBar = styled.div`{
  min-height: var(--navbar-height);
}`;

export const Highlighter = styled.div` {
  cursor: pointer;  
  :hover {
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    box-shadow: inset 0 0 0 1px var(--primary-color);
  }
  
  :active {
    border: 1px solid var(--primary-color);
    border-radius: 8px;
    box-shadow: 0 0 2px 2px var(--info);
    background-color: var(--dark-color);
  }
}`;

export const DivFixedCenter = styled.div` {
  position:fixed;
  top:50%;
  left:50%;
}`;

export const DivFixedCenterTopMiddle = styled.div` {
  position:fixed;
  top:25%;
  left:50%;
}`;

export const Flex = styled.div` {
  display: flex;
  flex-direction: ${props => props.flexDirection || "row"};
  flex-wrap: ${props => props.flexWrap || "no wrap"};
  width: ${props => props.width || "auto"} ;
  font-size: ${props => props.fontSize};
  margin: ${props => props.margin || "0"};
  padding: ${props => props.padding || "0"};
  align-items: ${props => props.alignItems || "baseline"};
  align-content: ${props => props.alignContent || "inherit"};
  justify-content: ${props => props.justifyContent || "space-between"};
  justify-items: ${props => props.justifyItems || "space-between"};
  min-height: ${props => props.minHeight || "auto"} ;
  height: ${props => props.height || "auto"} ;
}`;

export const FlexHighlighter = styled(Highlighter)` {
  display: flex;  
  margin: ${props => props.margin || "0"};
  padding: ${props => props.padding || "0"};
  align-items: ${props => props.alignItems || "baseline"};
  align-content: ${props => props.alignContent || "inherit"};
  justify-content: ${props => props.justifyContent || "space-between"};
  height: ${props => props.height || "auto"} ;
  width: ${props => props.width || "auto"} ;
}`;

export const FlexWithBorder = styled.div` {
  display: flex;
  align-items: baseline;
  justify-content: ${props => props.justifyContent || "space-between"};
  border: 1px solid var(--middle-grey-color);
  border-radius: 5px;
  width: ${props => props.width || "auto"};
  margin: ${props => props.margin || "0px 10px 10px 10px"};
  padding: ${props => props.padding || "10px"};
}`;

export const FlexDragAndDrop = styled(Flex)` {
  display: flex;
  border: 3px dashed var(--middle-grey-color);
  border-radius: 10px;
  background-color: var(--dark-color-transparent);
  cursor: pointer;

  &:drop {
    background-color: var(--primary);
  }
  
  &:hover {
    border: 3px dashed var(--info);
    color: var(--warning)
  }
  
  &:active {
    color: white;
    background-color: var(--dark-color-transparent);
  }

}`;

export const FlexToolbar = styled.div` {
  display: flex;
  align-items: ${props => props.alignItems || "baseline"};
  justify-content: ${props => props.justifyContent || "space-between"};
  background-color: var(--background-color);
  border: 1px solid var(--middle-grey-color);
  border-radius: 5px;
  width: ${props => props.width || "auto"};
  margin: ${props => props.margin || "0px 10px 0px 10px"};
  padding: ${props => props.padding || "0px"};
}`;

export const FlexVertical = styled.div` {
  display: flex;
  flex-direction: column;
  flex-wrap: ${props => props.flexWrap || "no wrap"};
  margin: ${props => props.margin || "0"};
  padding: ${props => props.padding || "0"};
  align-items: ${props => props.alignItems || "baseline"};
  justify-content: ${props => props.justifyContent || "space-between"} ;
  min-height: ${props => props.minHeight || "auto"} ;
  height: ${props => props.height || "auto"} ;
  background-color: ${props => props.backgroundColor || "none"}; 
  line-height: ${props => props.lineHeight || "inherit"}; 
}`;

export const WidgetVertical = styled(FlexVertical)` {
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
}`;

export const BadgeGroupVertical = styled(FlexVertical)` {
  border: 1px solid ${props => props.borderColor || "var(--middle-grey-color)"};
  border-radius: 2px;
}`;

export const Div50 = styled.div` {
    width: 50%;
}`;

export const DivHMargin = styled.div` {
  margin: ${props => props.margin || "0 20px"};
}`;

export const Mx1 = styled.span` {
  margin-left: 1rem;
}`;

export const Mx05 = styled.span` {
  margin-left: .5rem;
}`;

export const Mx025 = styled.span` {
  margin-left: .25rem;
}`;

export const My1 = styled.div` {
  margin-bottom: 1rem;
}`;

export const My2 = styled.div` {
  margin-bottom: 2rem;
}`;

export const My05 = styled.div` {
  margin-bottom: 0.5rem;
}`;

export const My075 = styled.div` {
  margin-bottom: 0.75rem;
}`;

export const My25 = styled.div` {
  margin-bottom: 0.25rem;
}`;

export const Span = styled.span` {
  color: ${props => props.color || "inherit"};
}`;

export const HR = styled.div` {
  margin: ${props => props.margin || "0"};
  height: 1px;
  border-bottom: 1px solid var(--middle-grey-color);
}`;

export const ULUnstyled = styled.ul `{
  list-style: none;
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
  
  :active {
    box-shadow: inset 0 0 1px 1px var(--primary-color);
  }
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

export const Text = styled.span` {
  color: ${props => props.color || "var(--light)"};
  font-weight: ${props => props.bold ? "bold" : "none"};
  font-size: ${props => props.fontSize || "inherit"};
}`;

export const Video = styled.video`{
  background-color: var(--dark-color-transparent);
  border: 1px solid var(--light);
  border-radius: 5px;
}`;

export const VideoPhoneChatContainer = styled.div`{
  width: 100%;
  overflow: hidden;
}`;

const dangerButton = `
  color: var(--danger-color);
  align-self: center;
  cursor: pointer;
  
  :hover {
    color: var(--white);
  }
  
  :active {
    color: var(--middle-grey-color);
  }
`;

export const DangerColorSpan = styled.span`{
  ${dangerButton}
}`;

export const DangerColorDiv = styled.div`{
  ${dangerButton}
}`;

export const DangerColorTd = styled.td`{
  ${dangerButton}
}`;

export const ButtonDiv = styled.div`{
  color: ${props => props.color || "white"};
  padding: ${props => props.padding || "0"};
  font-size: ${props => props.fontSize || "inherit"};
  align-self: center;
  cursor: pointer;
  filter: drop-shadow(1px 1px 1px #000 );
    
  :hover {
    color: ${props => props.hoveredColor || "var(--info)"} ;
  }
  
  :active {
    color: var(--secondary);
  }
}`;

export const ButtonBgDiv = styled.div`{
  width: ${props => props.width || "auto"} ;
  height: ${props => props.height || "auto"} ;
  color: ${props => props.color || "white"};
  padding: ${props => props.padding || "0"};
  font-size: ${props => props.fontSize || "inherit"};
  align-self: center;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid ${props => props.borderColor || "var(--middle-grey-color)"};
  background-color: ${props => props.backgroundColor || "var(--dark-color-transparent)"};
    
  &:hover {
    color: ${props => props.hoveredColor || "var(--info)"} ;
    border: 1px solid darkgray;
    background-color: var(--primary);
  }
  
  &:active {
    color: white;
    background-color: var(--dark-color-transparent);
  }
}`;

export const RowWithBorder = styled.div` {
  border-radius: 5px;
  border: 1px solid var(--middle-grey-color);
  padding: 5px;
}`;

const mainPadding = "15px";

export const ContainerSectionShadowed = styled.div `{
  padding: 10px ${mainPadding};
  min-height: 640px;
  border-radius: 5px;
  background-image: linear-gradient(var(--dark-color), var(--dark-color-transparent-very) );
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.9), 0 4px 10px 0 rgba(0, 0, 0, 0.99);
  overflow: hidden;
  margin-top: 20px;
}`

export const ContainerSectionShadowedInfinite = styled.div `{
  padding: 10px ${mainPadding};
  min-height: 640px;
  background-image: linear-gradient(var(--dark-color), var(--dark-color-transparent-very) );
  margin-top: 20px;
}`
