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

function ColorOption({ color }) {
  const style = {
    backgroundColor: color,
  };
  return <div className="color-option" style={style} data-color={color}></div>;
}

function ColorOptions() {
  return (
    <div className="color-options">
      <input type="color" id="color" />
      {colorArray.map((color) => {
        return <ColorOption key={color} color={color} />;
      })}
    </div>
  );
}

export default ColorOptions;
