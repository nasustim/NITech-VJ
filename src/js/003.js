var canvas;
var ctx;

var count = 0;

var x = [0,0,0,0];

var w = window.innerWidth;
var h = window.innerHeight;

var setup = () => {
    let container = document.getElementById('container');
    canvas = document.createElement("canvas");
    container.appendChild(canvas);

    $("canvas").attr({
        "width": w,
        "height": h
    });

    ctx = canvas.getContext("2d");

    draw();
};

var draw = () =>{
    if(count % 3 === 1) {


        w = window.innerWidth;
        h = window.innerHeight;

        $("canvas").attr({
            "width": w,
            "height": h
        });


        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        let s = getSoundData();

        console.log(s[0]);

        //if (s[0] > 100) {
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.fillRect(100, 100,(30*s[0] - 200) , (30*s[0] - 200));
        //}
    }

    count++;
    if(count > 3){
        count = 0;
    }

    window.requestAnimationFrame(draw);
};

setup();