var scene = null;
var camera = null;
var renderer = null;

var radius = 500;
var angle = 0;
var plane = null;

var scale = 1;

var SIZE = 3;

var geo;

var wire, wireMesh;


var xc = [];
var yc = [];

const MAX = 300;

var xp = [];
var yp = [];
xp.push((Math.random()*MAX-MAX/2)); yp.push((Math.random()*MAX-MAX/2));
xp.push((Math.random()*MAX-MAX/2)); yp.push((Math.random()*MAX-MAX/2));
xp.push((Math.random()*MAX-MAX/2)); yp.push((Math.random()*MAX-MAX/2));


var resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}

var init = () =>{
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,2000);
    scene.add(camera);
    camera.position.z = radius;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window,innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer.setClearColor(0x000000);

    for(var i = 0; i< 8000 ;i+= 30){
        xc.push(i * Math.cos(Math.PI/ 180 * i));
        yc.push(i * Math.sin(Math.PI/ 180 * i));
    }
    geoInit();
}

var geoInit = () =>{
    //let mat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });
    //let geo = new THREE.PlaneGeometry(500,500,20,20);
    geo = new THREE.Geometry();
/*
    for(let i = 0;i<SIZE;i++){

        let fl = (Math.floor(Math.random()*400)%2)?-1:1;

        let y = fl * Math.floor(Math.random() * 30);

        fl = (Math.floor(Math.random()*400)%2)?-1:1;
        let fa = (Math.floor(Math.random()*400)%2)?-1:1;
        let fb = (Math.floor(Math.random()*400)%2)?-1:1;
        let fc = (Math.floor(Math.random()*400)%2)?-1:1;

        let z = fl * Math.floor(Math.random() * 30);

        let x =
            -(((Math.random()) *2 * fa)*y + ((Math.random()) * 2 * fb)*z)
            /
            ((Math.random())*2 * fc);


        //let x = 150 * Math.cos(Math.cos(Math.PI / 30 * 2 * j)) * Math.cos(Math.PI / 30 * 2 *  i);
        //let z = 150 * Math.cos(Math.cos(Math.PI / 30 * 2 * j)) * Math.sin(Math.PI / 30 * 2 *  i);
        //let y = 150 * Math.sin(Math.cos(Math.PI / 30 * 2 * j));

        geo.vertices.push(new THREE.Vector3(x, y, z));


    }

    for(let i = 0;i<SIZE/3;i+=3){
        geo.faces.push(new THREE.Face3(i,i+1,i+2));

    }


    geo.computeFaceNormals();

    let mat = new THREE.MeshNormalMaterial();
    plane = new THREE.Mesh(geo, mat);
    scene.add(plane);

    let wire = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
    let wireMesh = new THREE.Mesh(geo, wire);
    scene.add(wireMesh);*/
};

var geoUpdate = (wd) =>{



    geo = new THREE.Geometry();

    scene.remove(plane);
    scene.remove(wireMesh);


   // for(let i = 0;i<xc.length;i+=3){
     //   xp.push(xc[i]-50); yp.push(yc[i]);
     //   xp.push(xc[i]-25); yp.push(yc[i]-25);
      //  xp.push(xc[i]-25); yp.push(yc[i]-25);
   // }

    //console.log(xp);

    for(let i = 0;i<xp.length;i++){


        geo.vertices.push(new THREE.Vector3(xp[i], yp[i], 0));



    }

    for(let i = 0;i<xp.length;i+=3){
        geo.faces.push(new THREE.Face3(i,i+1,i+2));

    }

    //console.log(xp);
    //console.log(yp);


    geo.computeFaceNormals();


   // wire = new THREE.MeshLambertMaterial({color: 0x7777ff, wireframe: true});
   // wireMesh = new THREE.Mesh(geo, wire);
   // scene.add(wireMesh);

    let mat = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
    plane = new THREE.Mesh(geo, mat);
    scene.add(plane);



    plane.geometry.verticesNeedUpdate = true;
    for(let i = 0;i<plane.geometry.vertices.length;i++){
        let vertex = plane.geometry.vertices[i];
        let fl = (Math.floor(Math.random()*10)%2===0)?-1:1;
        let fs = (Math.floor(Math.random()*10)%2===0)?-1:1;
        // vertex.z = wd[i%wd.length]*scale*fl;
        // vertex.y = wd[i%wd.length]*scale*fs;
        vertex.z = wd[0]*scale*fl;
        vertex.y = ((wd[1]+wd[0])/2)*scale*fs*xp[i];
        //vertex.x = wd[i%wd.length]*1000000*fs;
    }
}

var setup = () => {
    init();
    window.addEventListener("resize",resize,false);
    draw();
}

var draw = () =>{
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 200;
    //camera.position.x = 200;
    //camera.position.y = 0;
    //camera.position.z = 200;

    camera.lookAt(new THREE.Vector3( 0, 0, 0 ));

    geoUpdate(getSoundData());
    //geoUpdate();

    renderer.render(scene,camera);
    window.requestAnimationFrame(draw);
};



var keyd = () =>{
    console.log(`${event.key}`);

    if(event.key=="1") {
        xp.push((Math.random()*MAX-MAX/2)); yp.push((Math.random()*MAX-MAX/2));
        xp.push((Math.random()*MAX-MAX/2)); yp.push((Math.random()*MAX-MAX/2));
        xp.push((Math.random()*MAX-MAX/2)); yp.push((Math.random()*MAX-MAX/2));
        SIZE+=3;

    }else if(event.key == "0"){

        xp=[(Math.random()*MAX-MAX/2)]; yp=[(Math.random()*MAX-MAX/2)];
        xp.push((Math.random()*MAX-MAX/2)); yp.push((Math.random()*MAX-MAX/2));
        xp.push((Math.random()*MAX-MAX/2)); yp.push((Math.random()*MAX-MAX/2));

        SIZE=3;
    }

    console.log(xp);

    //if(event.key == "1"){
//    angle = 2 * Math.PI * parseInt(event.key) / 9;
    //}
};

document.onkeydown = keyd;

setup();