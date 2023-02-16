function Btns() {
  return (
    <div className="btns">
      <button id="mode-btn">Fill</button>
      <button id="destroy-btn">💣 Destroy</button>
      <button id="eraser-btn">❌ Erase</button>
      <label for="file">
        💅🏻 Add Photo
        <input type="file" accept="image/*" id="file" />
      </label>
      <input type="text" id="text" placeholder="Add text here... :)" />
      <button id="save">🖼 Save image</button>
    </div>
  );
}

export default Btns;
