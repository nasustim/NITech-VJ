"use strict";

var canvas;
var ctx;

var count = 0;

var x = [0, 1, 2, 3];

var w = window.innerWidth;
var h = window.innerHeight;

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

    var xp = [20, w / 8 + 30, w / 4 + 30, w / 4 + w / 8 + 30];
    var yp = [20, h / 8 + 30, h / 4 + 30, h / 4 + h / 8 + 30];

    var wp = [],
        hp = [];

    for (var i = 0; i < xp.length; i++) {
        wp.push((w / 2 - xp[i]) * 2);
        hp.push((h / 2 - yp[i]) * 2);
    }

    /*$("canvas").attr({
        "width": w,
        "height": h
    });*/

    var s = getSoundData();

    //console.log(count);
    //console.log(bx[x[count]]);
    //console.log(bw[x[count]]);

    if (s[0] > D_MAX && flag === false) {

        //console.log(ay[k%4]);
        flag = true;

        count++;
        if (k >= 4) {
            k = 0;
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect(0, 0, w, h);
        }

        for (var _i = 0; _i < k; _i++) {
            console.log(xp[_i]);
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.fillRect(xp[_i], yp[_i], wp[_i], hp[_i]);
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillRect(xp[_i] + 100, yp[_i] + 100, wp[_i] - 100, hp[_i] - 100);
        }
        //            let a = (k%2===0)?90:0;


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
    /*
        if(event.key === "1"){
            x = [0,1,2,3];
        }
        if(event.key === "2"){
            x = [0,2,1,3];
        }
        if(event.key === "3"){
            x = [0,1,3,2];
        }
        if(event.key === "4"){
            x = [0,3,1,2];
        }
        if(event.key === "5"){
            x = [0,3,2,1];
        }*/
    if (event.key === "0") {
        //      x = [0,1,2,3];
        //    k=0;

        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillRect(0, 0, w, h);
    }
};

document.onkeydown = keyd;

setup();