"use strict";

window.AudioContext = window.AudioContext;
var context = new AudioContext();
var analyzer = context.createAnalyser();

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
navigator.getUserMedia({ video: false, audio: true }, function (stream) {
    var mic = context.createMediaStreamSource(stream);
    mic.connect(analyzer);
}, function (error) {
    return;
});

var getSoundData = function getSoundData() {
    var wd = new Float32Array(analyzer.frequencyBinCount);
    analyzer.getFloatTimeDomainData(wd);

    return wd;
};

var keyd = function keyd() {
    console.log("" + event.key);

    //if(event.key == "1"){
    angle = 2 * Math.PI * parseInt(event.key) / 9;
    //}
};

document.onkeydown = keyd;