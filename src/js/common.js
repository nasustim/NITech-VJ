window.AudioContext = window.AudioContext;
const context = new AudioContext();
const analyzer = context.createAnalyser();

navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
navigator.getUserMedia(
    { video: false, audio: true },
    (stream) => {
        var mic = context.createMediaStreamSource(stream);
        mic.connect(analyzer);
    },
    (error) => { return; }
);

var getSoundData = () => {
    let wd = new Float32Array(analyzer.frequencyBinCount);
    analyzer.getFloatTimeDomainData(wd);

    return wd;
}

var keyd = () =>{
    console.log(`${event.key}`);

    //if(event.key == "1"){
        angle = 2 * Math.PI * parseInt(event.key) / 9;
    //}
}

document.onkeydown = keyd;