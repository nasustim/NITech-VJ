"use strict";

var canvas;
var ctx;

var count = 0;

var w = window.innerWidth;
var h = window.innerHeight;

var x = [];
var y = [];
var timing = [];
var color = [];

var setup = function setup() {
    var container = document.getElementById('container');
    canvas = document.createElement("canvas");
    container.appendChild(canvas);

    $("canvas").attr({
        "width": w,
        "height": h
    });

    ctx = canvas.getContext("2d");

    ctx.globalCompositeOperation = 'source-over';

    draw();
};

var draw = function draw() {

    w = window.innerWidth;
    h = window.innerHeight;

    $("canvas").attr({
        "width": w,
        "height": h
    });

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, w, h);

    if (count === 0) {
        timing = [];
        x = [];
        y = [];
        color = [];
        for (var i = 0; i < 40; i++) {
            timing.push(Math.floor(Math.random() * 360));
            x.push(Math.floor(Math.random() * w));
            y.push(Math.floor(Math.random() * h / 2));
            color.push("rgb(" + Math.floor(Math.random() * 140) + "," + Math.floor(Math.random() * 140) + "," + Math.floor(Math.random() * 140) + ")");
        }
        console.log(color);
    }

    for (var _i in timing) {
        if (timing[_i] === count) {
            ctx.filter = 'blur(20px)';
            ctx.fillStyle = color[_i];
            ctx.ellipse(x[_i], y[_i], 300, 200, 90 * Math.PI / 180, 0, 2 * Math.PI);
            ctx.fill();
        } else if (timing[_i] === count + 1) {
            ctx.filter = 'blur(20px)';
            ctx.fillStyle = color[_i];
            ctx.ellipse(x[_i], y[_i] + h / 2, 300, 200, 90 * Math.PI / 180, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    count = ++count >= 360 ? 0 : count;

    window.requestAnimationFrame(draw);
};

var keyd = function keyd() {
    console.log("" + event.key);
};

document.onkeydown = keyd;

setup();