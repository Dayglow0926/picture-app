const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

//얼굴
ctx.arc(300, 100, 50, 0, 2 * Math.PI);
ctx.fill();

//왼쪽 눈
ctx.beginPath();
ctx.fillStyle = "yellow";
ctx.arc(275, 90, 10, 1 * Math.PI, 2 * Math.PI);
ctx.fill();

//오른쪽 눈
ctx.beginPath();
ctx.fillStyle = "green";
ctx.arc(325, 90, 10, 1 * Math.PI, 2 * Math.PI);
ctx.fill();

//입
ctx.beginPath();
ctx.fillStyle = "red";
ctx.arc(300, 110, 30, 0, 1 * Math.PI);
ctx.fill();

//몸
ctx.beginPath();
ctx.fillStyle = "black";
ctx.fillRect(250, 170, 100, 200);
ctx.fill();

//왼쪽 팔
ctx.beginPath();
ctx.fillStyle = "black";
ctx.fillRect(220, 170, 20, 100);
ctx.fill();

//왼쪽 팔
ctx.beginPath();
ctx.fillStyle = "black";
ctx.fillRect(360, 170, 20, 100);
ctx.fill();
