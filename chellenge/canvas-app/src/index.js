const canvas = document.querySelector("canvas");
const color = document.getElementById("color");
const fill = document.getElementById("fill");
const stroke = document.getElementById("stroke");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

ctx.lineWidth = 5;
let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting(){
    isPainting = true;
}
function endPainting(){
    isPainting = false;
    if(isFilling){
        ctx.fill();
    }
    ctx.beginPath();
}
function changeColor(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
function fillMode(){
    isFilling = true;
}
function strokeMode(){
    isFilling = false;
}

canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown",startPainting);
canvas.addEventListener("mouseup",endPainting);
canvas.addEventListener("mouseleave",endPainting);
color.addEventListener("change",changeColor);
fill.addEventListener("click", fillMode);
stroke.addEventListener("click", strokeMode);