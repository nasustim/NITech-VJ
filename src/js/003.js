var canvas;
var ctx;

var setup = () => {
    let container = document.getElementById('container');
    canvas = document.createElement("canvas");
    container.appendChild(canvas);

    ctx = canvas.getContext("2d");

    draw();
}

var draw = () =>{

    let s = getSoundData();
    if(s[0] > 4){

    }

    window.requestAnimationFrame(draw);
}
setup();