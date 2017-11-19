"use strict";

var canvas;
var ctx;

var setup = function setup() {
    var container = document.getElementById('container');
    canvas = document.createElement("canvas");
    container.appendChild(canvas);

    ctx = canvas.getContext("2d");

    draw();
};

var draw = function draw() {

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    var s = getSoundData();

    console.log(s[0]);

    if (s[0] > 4) {

        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillRect(20, 20, 80, 40);
    }

    window.requestAnimationFrame(draw);
};

setup();