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
    console.log(getSoundData());

    window.requestAnimationFrame(draw);
};
setup();