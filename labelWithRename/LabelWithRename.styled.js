import styled from "styled-components";

export const ShowRenameAndDeleteLabelContainer = styled.div ` {
  cursor: text;
}`;

export const InputRename = styled.input`{
  margin: 0 auto;
  height: inherit;
  font-size: inherit;
  width:100%;
  vertical-align: baseline;
  border: 1px solid var(--warning);
  border-radius: 5px;
  outline: none;
  color: var(--light-color);
  background-color: var(--dark-color);

  :hover {
      box-shadow: 0px 0px 1px 1px var(--light);
  }
}`;
