var scene = null;
var camera = null;
var renderer = null;

var radius = 500;
var angle = 0;
var plane = null;

var scale = 300000;

const SIZE = 800*3;

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
    scene.add(wireMesh);
}

var geoUpdate = (wd) =>{
    plane.geometry.verticesNeedUpdate = true;
    for(let i = 0;i<plane.geometry.vertices.length;i++){
        let vertex = plane.geometry.vertices[i];
        let fl = (Math.floor(Math.random()*10)%2==0)?-1:1;
        let fs = (Math.floor(Math.random()*10)%2==0)?-1:1;
        vertex.z = wd[i%wd.length]*scale*fl;
        vertex.y = wd[i%wd.length]*scale*fs;
        //vertex.x = wd[i%wd.length]*1000000*fs;
    }
}

var setup = () => {
    init();
    window.addEventListener("resize",resize,false);
    draw();
}

var draw = () =>{
    camera.position.x = radius*Math.cos(angle);
    camera.position.y = 200;
    camera.position.z = radius*Math.sin(angle);
    //camera.position.x = 200;
    //camera.position.y = 0;
    //camera.position.z = 200;

    camera.lookAt(new THREE.Vector3( 0, 0, 0 ));

    geoUpdate(getSoundData());

    renderer.render(scene,camera);
    window.requestAnimationFrame(draw);
}

setup();