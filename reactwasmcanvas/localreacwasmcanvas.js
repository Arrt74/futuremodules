import React, {useEffect} from 'reactn'
import axios from 'axios'
import {useContext, useReducer} from "react";

export const wasmSetCanvasResize = 'wasmSetCanvasResize';
export const wasmSetCanvasVisibility = 'wasmSetCanvasVisibility';
export const wasmSetCanvasRect = 'wasmSetCanvasRect';
export const wasmAddScriptLine = 'wasmAddScriptLine';
export const wasmExecuteQueuedScripts = 'wasmExecuteQueuedScripts';

export const ReactWasmCanvasContext = React.createContext({
    dispatch: () => {
    },
    addScriptLine: (scriptLines, line) => {
      if (window.Module) {
        window.Module.addScriptLine(line);
      } else {
        scriptLines.push(line);
      }
    }
  }
);

const reactWasmCanvasInitialState = {
  visible: "hidden",
  resize: true,
  rect: {
    left: "0",
    top: "0",
    width: 720,
    height: 480
  },
  scriptLines: []
};

const reactWasmCanvasStateReducer = (state, action) => {
  switch (action[0]) {
    case wasmSetCanvasVisibility:
      return {
        ...state,
        visible: action[1]
      };
    case wasmSetCanvasResize:
      return {
        ...state,
        resize: action[1]
      };
    case wasmSetCanvasRect:
      return {
        ...state,
        rect: action[1],
        resize: false
      };
    case wasmAddScriptLine:
      if (window.Module) {
        window.Module.addScriptLine(action[1]);
        return state;
      }
      const newLines = [...state.scriptLines, action[1]];
      return {
        ...state,
        scriptLines: newLines
      };

    case wasmExecuteQueuedScripts:
      if (window.Module) {
        for (const line of state.scriptLines) {
          window.Module.addScriptLine(line);
        }
      }
      return {
        ...state,
        scriptLines: []
      };

    default:
      throw new Error("dashBoardManager reducer is handling an invalid action: " + JSON.stringify(action));
  }
}

export const ReactWasmCanvasContextProvider = props => {

  const [state, dispatch] = useReducer(reactWasmCanvasStateReducer, reactWasmCanvasInitialState);

  return (
    <ReactWasmCanvasContext.Provider value={{state, dispatch}}>
      {props.children}
    </ReactWasmCanvasContext.Provider>
  )
}

export const useWasmContext = (visible) => {
  let canvasContainer = React.useRef(null);
  const reactWasmCanvasContext = useContext(ReactWasmCanvasContext);
  const dispatch = reactWasmCanvasContext.dispatch;
  const resize = reactWasmCanvasContext.state.resize;

  useEffect(() => {
    dispatch([wasmSetCanvasVisibility, visible ? "visible" : "hidden"]);
    if (canvasContainer.current && resize) {
      const rect = canvasContainer.current.getBoundingClientRect();
      dispatch([wasmSetCanvasRect, rect]);
    }
  }, [canvasContainer, visible, resize, dispatch]);

  return {canvasContainer, dispatch};
}

export const loadWasmComplete = async (
  project,
  canvasRef,
  argumentList,
  mandatoryWebGLVersionSupportNumber,
  dispatch
) => {

  try {
    console.log("Wasm Initialization starting");

    if (!checkWasmSupport()) {
      throw new Error('Web assembly not supported')
    }
    const webglVersion = mandatoryWebGLVersionSupportNumber || 'webgl'
    if (!checkWebGLSupport(webglVersion)) {
      throw new Error(webglVersion + ' not supported')
    }

    let wasmAxios = axios.create()

    let downloadConfig = {
      url: project + '.wasm',
      method: 'get',
      responseType: 'arraybuffer'
    }
    const binaryContent = await wasmAxios(downloadConfig)
    const wasmBinary = new Uint8Array(binaryContent.data)

    downloadConfig = {
      url: project + '.js',
      method: 'get',
      responseType: 'text'
    }
    const content = await wasmAxios(downloadConfig)

    const wasmScript = content.data
    window.wasmBinary = wasmBinary
    window.wasmScript = wasmScript
  } catch (ex) {
    console.log(ex)
    return null
  }

  window.addEventListener("resize", () => {
    dispatch([wasmSetCanvasResize, true]);
    // console.log("Window Resize: ", window.innerWidth, window.innerWidth);
  });

  window.addEventListener('keydown', function(e) {
    if(e.keyCode === 32 && e.target === document.body) {
      e.preventDefault();
    }
  });

  window.Module = {
    doNotCaptureKeyboard: true,
    arguments: argumentList,
    print: text => {
      console.log('[WASM] ' + text)
      wasmAddConsoleTextInternal(text)
    },
    printErr: text => {
      console.log('[WASM-ERROR] ' + text)
    },
    canvas: canvasRef,
    onRuntimeInitialized: () => {
      console.log("WASM runtime initialized");
      dispatch([wasmExecuteQueuedScripts, '']);
    },
    instantiateWasm: (imports, successCallback) => {
      WebAssembly.instantiate(window.wasmBinary, imports)
        .then(function (output) {
          console.log("WASM initiated successfully");
          successCallback(output.instance)
        })
        .catch(function (e) {
          console.log("WASM initiated failed because: ", e.message);
        })
      return {}
    }
  }

  const s = document.createElement('script')
  s.text = window.wasmScript
  document.body.appendChild(s)
}

const checkWasmSupport = () => {
  return typeof WebAssembly === 'object'
}

const checkWebGLSupport = (webGLVersion) => {
  let canvas = document.createElement('canvas')
  try {
    if (canvas.getContext(webGLVersion) !== null) {
      return true
    }
  } catch (ex) {
    return false
  }
}

const WasmCanvas = (props) => {
  let canvasRef = React.useRef(null);
  const wasmContext = useContext(ReactWasmCanvasContext);
  const canvasRect = wasmContext.state.rect;
  const canvasVisibility = wasmContext.state.visible;

  useEffect(() => {
    loadWasmComplete(
      props.wasmName,
      canvasRef.current,
      props.argumentList,
      props.mandatoryWebGLVersionSupporNumber,
      wasmContext.dispatch,
    ).then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canvasSizeX = canvasRect.width.toString() + "px";
  const canvasSizeY = canvasRect.height.toString() + "px";

  const canvasClientSizeX =
    (canvasRect.width * (window.devicePixelRatio || 1)).toString() + 'px'
  const canvasClientSizeY =
    (canvasRect.height * (window.devicePixelRatio || 1)).toString() + 'px'

  const canvasPadding = props.padding ? props.padding : '0px'
  const canvasMargin = props.margin ? props.margin : '0px'
  const canvasRadius = props.borderRadius ? props.borderRadius : '0px'
  const border = props.border ? props.border : 'auto'

  const canvasStyle = {
    position: "absolute",
    visibility: canvasVisibility,
    width: canvasSizeX,
    height: canvasSizeY,
    left: canvasRect.left,
    top: canvasRect.top,
    margin: canvasMargin,
    padding: canvasPadding,
    borderRadius: canvasRadius,
    border: border
  }

  return (
    <canvas
      id='WasmCanvas'
      width={canvasClientSizeX}
      height={canvasClientSizeY}
      style={canvasStyle}
      ref={canvasRef}
      onContextMenu={e => e.preventDefault()}
    />
  )
}

export default WasmCanvas

const wasmAddConsoleTextInternal = (action) => {
  return {
    consoleOutput: action,
  }
}
