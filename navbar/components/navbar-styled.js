import styled from "styled-components";

export const navbarJustifyEndsWidth = "300px";

export const NavbarLeftHandSizeComponent = styled.div`{
  width: ${navbarJustifyEndsWidth};
}`;

export const NavbarUserContainer = styled.div`{
  display: flex;
  width: ${navbarJustifyEndsWidth};
  justify-content: flex-end;  
}`;

export const NavbarTaglineText = styled.span` {
  margin-top: 5px;
  color: var(--light);
  font-size: var(--font-size-big);
  font-weight: bold;
  font-family: "Pompiere", cursive;
}`;
