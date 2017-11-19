"use strict";

var canvas;
var ctx;

var count = 0;

var x = [0, 1, 2, 3];

var w = window.innerWidth;
var h = window.innerHeight;

var bx = [50, w / 2 + 50, 50, w / 2 + 50];
var by = [50, 50, h / 2 + 50, h / 2 + 50];
var bw = w / 2 - 100;
var bh = h / 2 - 100;

var flag = false;
var c1 = 0;

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

    bx = [50, w / 2 + 50, 50, w / 2 + 50];
    by = [50, 50, h / 2 + 50, h / 2 + 50];
    bw = w / 2 - 100;
    bh = h / 2 - 100;

    /*$("canvas").attr({
        "width": w,
        "height": h
    });*/

    var s = getSoundData();

    //console.log(s[0]);
    //console.log(count);
    //console.log(bx[x[count]]);
    //console.log(bw[x[count]]);

    if (s[0] > 120 && flag === false) {

        flag = true;

        count++;
        if (count >= 4) {
            count = 0;
        }
        if (count === 0) {
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.fillRect(0, 0, w, h);
        }
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(bx[x[count]], by[x[count]], bw, bh);
    }

    if (flag === true) {
        c1++;
        if (c1 > 10) {
            c1 = 0;
            flag = false;
        }
    }
    window.requestAnimationFrame(draw);
};

var keyd = function keyd() {
    console.log("" + event.key);

    if (event.key === "1") {
        x = [0, 1, 2, 3];
    }
    if (event.key === "2") {
        x = [0, 2, 1, 3];
    }
    if (event.key === "3") {
        x = [0, 1, 3, 2];
    }
    if (event.key === "4") {
        x = [0, 3, 1, 2];
    }
    if (event.key === "5") {
        x = [0, 3, 2, 1];
    }
    if (event.key === "0") {
        x = [0, 1, 2, 3];
    }
};

document.onkeydown = keyd;

setup();