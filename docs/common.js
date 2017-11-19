"use strict";

window.AudioContext = window.AudioContext;
var context = new AudioContext();

var filter = context.createBiquadFilter();
filter.type = 0;
filter.frequency.value = 440;

var analyzer = context.createAnalyser();

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
navigator.getUserMedia({ video: false, audio: true }, function (stream) {
    var mic = context.createMediaStreamSource(stream);
    mic.connect(filter);
    filter.connect(analyzer);
}, function (error) {
    return;
});

var getSoundData = function getSoundData() {
    //let wd = new Float32Array(analyzer.frequencyBinCount);
    var wd = new Uint8Array(analyzer.frequencyBinCount);

    //analyzer.getFloatTimeDomainData(wd);
    analyzer.getByteFrequencyData(wd);

    return wd;
};

var keyd = function keyd() {
    console.log("" + event.key);

    //if(event.key == "1"){
    angle = 2 * Math.PI * parseInt(event.key) / 9;
    //}
};

document.onkeydown = keyd;