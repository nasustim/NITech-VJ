var canvas;
var ctx;

var setup = () => {
    let container = document.getElementById('container');
    canvas = document.createElement("canvas");
    container.appendChild(canvas);

    ctx = canvas.getContext("2d");

    draw();
};

var draw = () =>{

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    let s = getSoundData();
<<<<<<< HEAD

    console.log(s[0]);

    if(s[0] > 4){

=======

    console.log(s[0]);

    if(s[0] > 0.01){
>>>>>>> 416ff20f99ed73b57f96f9f11e1ebbd3930e9648
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillRect(20, 20, 80, 40);
    }

    window.requestAnimationFrame(draw);
};

setup();