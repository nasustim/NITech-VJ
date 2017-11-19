window.AudioContext = window.AudioContext;
const context = new AudioContext();

var filter = context.createBiquadFilter();
filter.type = 0;
filter.frequency.value = 440;

const analyzer = context.createAnalyser();

navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
navigator.getUserMedia(
    { video: false, audio: true },
    (stream) => {
        let mic = context.createMediaStreamSource(stream);
        mic.connect(filter);
        filter.connect(analyzer);
    },
    (error) => { return; }
);

var getSoundData = () => {
    //let wd = new Float32Array(analyzer.frequencyBinCount);
    let wd = new Uint8Array(analyzer.frequencyBinCount);

    //analyzer.getFloatTimeDomainData(wd);
    analyzer.getByteFrequencyData(wd);

    return wd;
};