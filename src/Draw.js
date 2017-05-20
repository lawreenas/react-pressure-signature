var canvas, ctx, flag = false;
let prevX = 0;
let currX = 0;
let prevY = 0;
let currY = 0;
var x = "black",
    y = 2;
let dot_flag = false;

var rec = [];
var time = 0;

// let w, h;

const initCanvas = (callBackFn) => {
  canvas = document.getElementById('can');
  ctx = canvas.getContext("2d");

  canvas.addEventListener("mousemove", function (e) {
    findxy('move', e, callBackFn)
  }, false);
  canvas.addEventListener("mousedown", function (e) {
    findxy('down', e)
  }, false);
  canvas.addEventListener("mouseup", function (e) {
    findxy('up', e)
  }, false);
  canvas.addEventListener("mouseout", function (e) {
    findxy('out', e)
  }, false);
}

function draw() {
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.strokeStyle = x;
  ctx.lineWidth = y;
  ctx.stroke();
  ctx.closePath();
}

function findxy(res, e, callBackFn) {
  if (res == 'down') {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;

    flag = true;
    dot_flag = true;
    if (dot_flag) {
      rec = [];
      time = new Date().getTime();
      ctx.beginPath();
      ctx.fillStyle = x;
      ctx.fillRect(currX, currY, 2, 2);
      ctx.closePath();
      dot_flag = false;
    }
  }
  if (res == 'up' || res == "out") {
    flag = false;
  }
  if (res == 'move') {
    if (flag) {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.offsetLeft;
      currY = e.clientY - canvas.offsetTop;

      // rec.push([currX, currY, new Date().getTime() - time]);
      callBackFn(currX, currY, new Date().getTime() - time)
      draw();
    }
  }
}

function erase() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function data(){
  rec.forEach(function(e){
    console.log(e[0] + "," + e[1] + "," + e[2]);
  });
}

export { initCanvas, data, erase }
