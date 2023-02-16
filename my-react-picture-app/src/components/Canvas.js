import React, { useEffect, useRef, useState } from "react";

const colorArray = [
  "#1abc9c",
  "#3498db",
  "#34495e",
  "#27ae60",
  "#8e44ad",
  "#f1c40f",
  "#e74c3c",
  "#95a5a6",
  "#d35400",
  "#2ecc71",
  "#e67e22",
];
const CANVAS_WIDTH = 550;
const CANVAS_HEIGHT = 550;
let font = "sans-serif";

function Canvas() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [ctx, setCtx] = useState();
  const [isPainting, setIsPainting] = useState(false);
  const [isFilling, setIsFilling] = useState(false);
  const [color, setColor] = useState();
  const [flie, setFile] = useState(null);
  const [fontSize, setFontSize] = useState(50);
  const [text, setText] = useState("");
  const [lineWidth, setLineWidth] = useState(10);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000000";
    ctx.lineCap = "round";
    contextRef.current = ctx;

    setCtx(ctx);
  }, []);

  function onMove({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;

    if (isPainting) {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      return;
    }
    ctx.moveTo(offsetX, offsetY);
  }

  function startPainting() {
    setIsPainting(true);
  }

  function cancelPainting() {
    setIsPainting(false);
    ctx.beginPath();
  }

  function onCanvasClick() {
    if (isFilling) {
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
  }

  function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    setColor(colorValue);
    setCtx(ctx);
  }

  function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
    setLineWidth(event.target.value);
    setCtx(ctx);
  }

  function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
    setColor(event.target.value);
    setCtx(ctx);
  }

  function onModeClick() {
    if (isFilling) setIsFilling(false);
    else setIsFilling(true);
  }

  function onDestroyClick() {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.restore();
    setCtx(ctx);
  }

  function onEraserClick() {
    ctx.strokeStyle = "white";
    setColor(ctx.strokeStyle);
    setIsFilling(false);
    setCtx(ctx);
  }

  function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
      ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      setFile(null);
    };
  }

  function onSaveClick() {
    const url = canvasRef.current.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
  }

  function onFontSizeChange(event) {
    setFontSize(event.target.value);
  }

  function onTextInput(event) {
    setIsFilling(false);
    setText(event.target.value);
  }

  function onDoubleClick({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    if (text !== "") {
      ctx.save();
      ctx.lineWidth = 1;
      ctx.font = `${fontSize}px ${font}`;
      ctx.fillText(text, offsetX, offsetY);
      ctx.restore();
      setCtx(ctx);
    }
  }

  return (
    <div className="picture">
      <div className="color-options">
        <input type="color" id="color" onChange={onColorChange} value={color} />
        {colorArray.map((color) => {
          return (
            <div
              key={color}
              className="color-option"
              style={{ backgroundColor: color }}
              data-color={color}
              onClick={onColorClick}
            ></div>
          );
        })}
      </div>
      <canvas
        ref={canvasRef}
        onMouseMove={onMove}
        onMouseDown={startPainting}
        onMouseUp={cancelPainting}
        onClick={onCanvasClick}
        onMouseLeave={cancelPainting}
        onDoubleClick={onDoubleClick}
      ></canvas>
      <div className="btns">
        <input
          id="line-width"
          type="range"
          min="1"
          max="10"
          step="0.1"
          onChange={onLineWidthChange}
        />
        <button id="mode-btn" onClick={onModeClick}>
          {isFilling ? "Fill" : "Draw"}
        </button>
        <button id="destroy-btn" onClick={onDestroyClick}>
          💣 Destroy
        </button>
        <button id="eraser-btn" onClick={onEraserClick}>
          ❌ Erase
        </button>
        <label htmlFor="file">
          💅🏻 Add Photo
          <input
            type="file"
            accept="image/*"
            id="file"
            onChange={onFileChange}
          />
        </label>
        <span>Font Size</span>
        <input
          id="font-size"
          type="range"
          min="1"
          max="100"
          step="0.1"
          onChange={onFontSizeChange}
        />
        <input
          type="text"
          id="text"
          placeholder="Add text here... :)"
          onChange={onTextInput}
          value={text}
        />
        <button id="save" onClick={onSaveClick}>
          🖼 Save image
        </button>
      </div>
    </div>
  );
}

export default Canvas;
