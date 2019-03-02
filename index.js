console.log("5 minute Trading Alarm Clock");
console.log("version 0.1");
console.log("4 Jan 2018");
console.log("Author: Natalie Seltzer");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
var interval;
let alarmOn = false;
let mySound = new soundTick("Tick.mp3");
let minuteAlarmCheck = 0;
let secondAlarmCheck = 0;
let volume = 0.05;

//var slider = document.getElementById("clockVolume");
//console.log("Clock Volume slider set to: ", slider);

// Start the Clock
interval = setInterval(drawClock, 1000);
document.getElementById("stopAlarm").disabled = true;
document.getElementById("startClock").disabled = true;

// Start Alarm
function startAlarm() {
  alarmOn = true;
  mySound.sound.volume = volume;
  document.getElementById("startAlarm").disabled = true;
  document.getElementById("stopAlarm").disabled = false;
}

// Stop Alarm
function stopAlarm() {
  alarmOn = false;
  document.getElementById("startAlarm").disabled = false;
  document.getElementById("stopAlarm").disabled = true;
}

// Stop the clock
function stop() {
  clearInterval(interval);
  document.getElementById("stopClock").disabled = true;
  document.getElementById("startClock").disabled = false;
  document.getElementById("startAlarm").disabled = true;
  document.getElementById("stopAlarm").disabled = true;
}

// Restart the clock
function start() {
   interval = setInterval(drawClock, 1000);
   document.getElementById("startClock").disabled = true;
   document.getElementById("stopClock").disabled = false;
   document.getElementById("startAlarm").disabled = false;
}

drawClock();

// Draw Clock
function drawClock() {
  ctx.arc(0, 0, radius, 0 , 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

// Draw Face
function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0, 0 ,radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

// Draw Numbers
function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

// Draw Time
function drawTime(ctx, radius){
  // get time
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  minuteAlarmCheck = minute;
  var second = now.getSeconds();
  secondAlarmCheck = second;
  alarmVolume();
  // hour hand position
  hour = hour%12;
  hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
  drawHand(ctx, hour, radius*0.5, radius*0.07);
  // minute hand position
  minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(ctx, minute, radius*0.8, radius*0.07);
  // second hand position
  second = (second*Math.PI/30);
  drawHand(ctx, second, radius*0.9, radius*0.02);
}

function alarmVolume() {
  // 5 minute alarm
  if ((minuteAlarmCheck%5) === 4 &&
      secondAlarmCheck >= 55 && secondAlarmCheck <= 60) volume = 1;
  // 1 minute alarm
  //if (secondAlarmCheck >= 55 && secondAlarmCheck <= 60) volume = 1;
  else volume = 0.05;
}

// Draw Hands
function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
  if (alarmOn === true) {
    mySound.sound.volume = volume;
    mySound.play();
  }
}

// Make Sound
function soundTick(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.pause = function(){
    this.sound.pause();
  }
}
