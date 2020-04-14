import "./LabelWithRename.css"
import React, {useEffect, useRef, useState} from "react";
import {InputMode, LabelMode, ShowRenameAndDeleteLabelContainer} from "./LabelWithRename.styled";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export const LabelWithRename = (props) => {

  const searchBox = useRef(null);
  const [isRenaming, setIsRenaming] = useState(false);

  useEffect(() => {
    if (isRenaming && searchBox.current) {
      searchBox.current.focus();
    }
  }, [isRenaming]);

  const tooltipRenderFunction = (props, text) => {
    // NDDado: This is to avoid a bizarre show=true in DOM error from React
    // https://github.com/styled-components/styled-components/issues/1198
    const reProp = {
      ...props,
      show: "true"
    };
    return (
      <Tooltip id="button-tooltip" {...reProp}>
        {text}
      </Tooltip>
    );
  };

  const ret = isRenaming ?
    (
      <InputMode>
        <input
          ref={searchBox}
          width={"100%"}
          defaultValue={props.defaultValue}
          type="text"
          className="rename-bar"
          id="rename-bar"
          autoComplete={"off"}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              if (event.target.value.length > 0) {
                props.updater(event.target.value);
                setIsRenaming(false);
              }
            }
            if (event.key === "Escape") {
              setIsRenaming(false);
            }
          }}
          onBlur={() => {
            setIsRenaming(false);
          }}
        />
      </InputMode>
    ) :
    (
      <OverlayTrigger
        overlay={(props) => tooltipRenderFunction(props, "Tap to rename")}>
        <LabelMode>
          {props.defaultValue}
        </LabelMode>
      </OverlayTrigger>
    );

  return (
    <ShowRenameAndDeleteLabelContainer onClick={() => {
      // Toggle function between show and edit
      if (!isRenaming) {
        setIsRenaming(!isRenaming)
      }
    }}>
      {ret}
    </ShowRenameAndDeleteLabelContainer>
  )
};
