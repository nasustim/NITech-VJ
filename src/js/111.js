var setup = () => {
    //init();
    //window.addEventListener("resize", resize, false);
    draw();
}
function draw(){
    console.log(getSoundData()[0]);
    window.requestAnimationFrame(draw);
};

var keyd = () =>{
    console.log(`${event.key}`);

    //if(event.key == "1"){
    //angle = 2 * Math.PI * parseInt(event.key) / 9;
    //}
}

document.onkeydown = keyd;

setup();