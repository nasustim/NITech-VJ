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

var ax = [0, 0, w - 50, w - 50];
var ay = [0, h - 50, h - 50, 0];

var flag = false;
var c1 = 0;

var k = 1;

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

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0, 0, w, h);
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

    //console.log(count);
    //console.log(bx[x[count]]);
    //console.log(bw[x[count]]);

    if (s[0] > 120 && flag === false) {

        console.log(ay[k % 4]);
        flag = true;

        count++;
        if (k >= 4) {
            ax[0] += 5;
            ax[1] += 5;
            ax[2] += -5;
            ax[3] += -5;
            ay[0] += 5;
            ay[1] += -5;
            ay[2] += -5;
            ay[3] += 5;
        } /*
          if(count === 0){
             ctx.fillStyle = "rgb(255,255,255)";
             ctx.fillRect(0, 0,w , h);
          }*/

        var a = k % 2 === 0 ? 90 : 0;

        ctx.rotate(k * a * Math.PI / 180);

        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillRect(ax[k % 4], ay[k % 4], 50 * k, 50 * k);

        k++;
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
        k = 0;

        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillRect(0, 0, w, h);
    }
};

document.onkeydown = keyd;

setup();