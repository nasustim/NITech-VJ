var scene = null;
var camera = null;
var renderer = null;

var radius = 500;
var angle = 0;
var plane = null;

var scale = 3;

const SIZE = 30;

var count = 0;

var flag = false;

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

    geoInit();
}

var geoInit = () =>{

    //let mat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });
    //let geo = new THREE.PlaneGeometry(500,500,20,20);
    let geo = new THREE.Geometry();


    for(let i = 0;i<=SIZE;i++){
        for(let j = 0;j<=SIZE;j++){

           // let y = ((i-SIZE)*500);
           // let x =  -Math.cos(Math.PI / SIZE * 2 * j) * SIZE*2*50 * Math.sin(Math.PI / SIZE * 2 * i);
           // let z =  Math.sin(Math.PI / SIZE * 2 * j) * x;


            let x = 150 * Math.cos(Math.cos(Math.PI / 30 * 2 * j)) * Math.cos(Math.PI / 30 * 2 *  i);
            let z = 150 * Math.cos(Math.cos(Math.PI / 30 * 2 * j)) * Math.sin(Math.PI / 30 * 2 *  i);
            let y = 150 * Math.sin(Math.cos(Math.PI / 30 * 2 * j));

            geo.vertices.push(new THREE.Vector3(x, y, z));

            //console.log(z);

        }
    }

    for(let i = 0;i<SIZE+1;i++){
        for(let j = 0;j<SIZE+1;j++){
            //let x = ((i * 30) + (j % 30));
            //let y = (i * 30);
            //let z = 0;
            let x = ((i * 30) + (j % 30));
            let y = ((i * 30) + (j % 30)) + 1;
            let z = (((i+1) * 30) + (j % 30));
            geo.faces.push(new THREE.Face3(x,y,z));
            x = (((i+1) * 30) + ((j+1) % 30));
            y = ((i * 30) + (j % 30)) + 1;
            z = (((i+1) * 30) + (j % 30));
            geo.faces.push(new THREE.Face3(x,y,z));

            //geo.faces.push(new THREE.Face3(i*SIZE+j,i*SIZE+j+1,(i+1)*SIZE+j));
            //geo.faces.push(new THREE.Face3(i*SIZE+j,(i+1)*SIZE+j,(i+1)*SIZE+j+1));

        }
    }


    geo.computeFaceNormals();

    let mat = new THREE.MeshNormalMaterial();
    plane = new THREE.Mesh(geo, mat);



    scene.add(plane);

    //let wire = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
    //let wireMesh = new THREE.Mesh(geo, wire);
    //scene.add(wireMesh);
}

var geoUpdate = (wd) =>{
    if(wd[0]<=D_MAX && flag === true){
        
        scene.remove(plane);
        geoInit();
        flag = false;
    }
    if(wd[0]>D_MAX){
        flag = true;
    }
    plane.geometry.verticesNeedUpdate = true;
    for(let i = 0;i<plane.geometry.vertices.length;i++){
        let vertex = plane.geometry.vertices[i];
        let fl = (Math.random()%2==0)?-1:1;
        let fs = (Math.random()%2==0)?-1:1;
        let ss = Math.random() * 2;
        vertex.z = (wd[0]<=50)? vertex.z : vertex.z *scale*fl * ss;
        vertex.y = (wd[0]<=50)? vertex.y : vertex.y *scale*fl * ss;
        vertex.x = (wd[0]<=50)? vertex.x : vertex.x *scale*fl * ss;
        //vertex.x = wd[i%wd.length]*1000000*fs;
    }
};

var setup = () => {
    init();
    window.addEventListener("resize",resize,false);
    draw();
}

var draw = () =>{

    count = (++count >= 720) ? 0 : count;
    camera.position.x = radius*Math.cos(Math.PI / 180  * count);
  //  camera.position.y = radius;
    camera.position.y = radius*Math.sin(Math.PI / 180  * count);
    //camera.position.x = 200;
    //camera.position.y = 0;
    //camera.position.z = 200;

    camera.lookAt(new THREE.Vector3( 0, 0, 0 ));


    geoUpdate(getSoundData());

    renderer.render(scene,camera);
    window.requestAnimationFrame(draw);
}



var keyd = () =>{
    console.log(`${event.key}`);
/*
    if(event.key == "0"){

        console.log("0");

        scene.remove(plane);
        geoInit();
    }*/
}

document.onkeydown = keyd;

setup();
