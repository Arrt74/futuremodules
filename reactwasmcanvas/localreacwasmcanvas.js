import React, {useEffect} from 'reactn'
import axios from 'axios'
import {useContext, useState} from "react";

export const ReactWasmCanvasContext = React.createContext( {
  canvasProps: {},
  setCanvasProps: ()=>{}
  }
);

export const ReactWasmCanvasContextProvider = props => {

  const [canvasProps, setCanvasProps] = useState({
    canvasVisible: "hidden",
    canvasLeft: "0",
    canvasTop: "0",
    canvasWidth: 720,
    canvasHeight: 480
  });

  return (
    <ReactWasmCanvasContext.Provider value={{canvasProps, setCanvasProps}}>
      {props.children}
    </ReactWasmCanvasContext.Provider>
  )
}

export const useWasmContext = (visible) => {
  let canvasContainer = React.useRef(null);
  const reactWasmCanvasContext = useContext(ReactWasmCanvasContext);
  const setCanvasProps = reactWasmCanvasContext.setCanvasProps;

  useEffect( ()=> {
    setCanvasProps( state => {
      const zeroRect= {
        top: state.canvasTop,
        left: state.canvasLeft,
        width: state.canvasWidth,
        height: state.canvasHeight,
      };
      const rect = canvasContainer.current ? canvasContainer.current.getBoundingClientRect() : zeroRect;
      console.log("Canvas Rect: ", rect);
      return {...state,
        canvasVisible: visible ? "visible" : "hidden",
        canvasTop: rect.top,
        canvasLeft: rect.left,
        canvasWidth: rect.width,
        canvasHeight: rect.height,
      };
    });
  }, [canvasContainer, visible, setCanvasProps]);

  return canvasContainer;
}

export const loadWasmComplete = async (
  project,
  canvasRef,
  argumentList,
  mandatoryWebGLVersionSupportNumber,
  dispatch
) => {

  if ( window.wasmScript ) {
    console.log("Already there thanks");

    if (dispatch) dispatch({
      consoleOutput: ["WASM initiated successfully"]
    });

    return;
  }

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

  window.Module = {
    doNotCaptureKeyboard: true,
    arguments: argumentList,
    print: text => {
      console.log('[WASM] ' + text)
      if (dispatch) dispatch(wasmAddConsoleTextInternal(text))
    },
    printErr: text => {
      console.log('[WASM-ERROR] ' + text)
    },
    canvas: canvasRef,
    onRuntimeInitialized: () => {
      console.log("WASM runtime initialized");
    },
    instantiateWasm: (imports, successCallback) => {
      WebAssembly.instantiate(window.wasmBinary, imports)
        .then(function (output) {
          console.log("WASM initiated successfully");
          if (dispatch) dispatch({
            consoleOutput: ["WASM initiated successfully"]
          });
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
  const wasmState = useContext(ReactWasmCanvasContext).canvasProps;

  useEffect(() => {
      loadWasmComplete(
        props.wasmName,
        canvasRef.current,
        props.argumentList,
        props.mandatoryWebGLVersionSupporNumber,
        props.dispatcher,
      ).then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const canvasSizeX = wasmState.canvasWidth.toString() + "px";
  const canvasSizeY = wasmState.canvasHeight.toString() + "px";

  const canvasClientSizeX =
    (wasmState.canvasWidth * (window.devicePixelRatio || 1)).toString() + 'px'
  const canvasClientSizeY =
    (wasmState.canvasHeight * (window.devicePixelRatio || 1)).toString() + 'px'

  const canvasPadding = props.padding ? props.padding : '0px'
  const canvasMargin = props.margin ? props.margin : '0px'
  const canvasRadius = props.borderRadius ? props.borderRadius : '0px'
  const border = props.border ? props.border : 'auto'

  const canvasStyle = {
    position: "absolute",
    visibility: wasmState.canvasVisible,
    width: canvasSizeX,
    height: canvasSizeY,
    left: wasmState.canvasLeft,
    top: wasmState.canvasTop,
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
