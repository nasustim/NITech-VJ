"use strict";

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

var count = 0;

var MAX = 300;

var cy = [];

var step = [0, 45, 90, 135];

var xp = [];
var yp = [];
xp.push(Math.random() * MAX - MAX / 2);yp.push(Math.random() * MAX - MAX / 2);
xp.push(Math.random() * MAX - MAX / 2);yp.push(Math.random() * MAX - MAX / 2);
xp.push(Math.random() * MAX - MAX / 2);yp.push(Math.random() * MAX - MAX / 2);

var resize = function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

var init = function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    scene.add(camera);
    camera.position.z = radius;

    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 1000).normalize();
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window, innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer.setClearColor(0x000000);

    for (var i = 0; i < 8000; i += 30) {
        xc.push(i * Math.cos(Math.PI / 180 * i));
        yc.push(i * Math.sin(Math.PI / 180 * i));
    }
    geoInit();
};

var geoInit = function geoInit() {
    geo = new THREE.Geometry();

    cy = [new THREE.Mesh(new THREE.CylinderBufferGeometry(20, 20, 5000, 50), new THREE.MeshPhongMaterial({
        color: 0xffffff,
        ambient: 0xffffff,
        specular: 0xffffff,
        shininess: 200
    })), new THREE.Mesh(new THREE.CylinderBufferGeometry(20, 20, 5000, 50), new THREE.MeshPhongMaterial({
        color: 0xffffff,
        ambient: 0xffffff,
        specular: 0xffffff,
        shininess: 200
    })), new THREE.Mesh(new THREE.CylinderBufferGeometry(20, 20, 5000, 50), new THREE.MeshPhongMaterial({
        color: 0xffffff,
        ambient: 0xffffff,
        specular: 0xffffff,
        shininess: 200
    })), new THREE.Mesh(new THREE.CylinderBufferGeometry(20, 20, 5000, 50), new THREE.MeshPhongMaterial({
        color: 0xffffff,
        ambient: 0xffffff,
        specular: 0xffffff,
        shininess: 200
    }))];
};

var geoUpdate = function geoUpdate(wd) {

    for (var i = 0; i < 4; i++) {
        step[i]++;
        step[i] = step[i] >= 360 ? 0 : step[i];
    }

    //geo = new THREE.Geometry();

    for (var _i = 0; _i < 4; _i++) {
        scene.remove(cy[_i]);
    }

    for (var _i2 = 0; _i2 < 4; _i2++) {
        cy[_i2].position.set(100 * Math.sin(Math.PI / 180 * step[_i2]), 0, 0);
        scene.add(cy[_i2]);
    }
    /*
        for(let j=0;j<4;j++) {
            cy[j].geometry.verticesNeedUpdate = true;
            for (let i = 0; i < cy[j].geometry.vertices.length; i++) {
                let vertex = cy[j].geometry.vertices[i];
                let fl = (Math.floor(Math.random() * 10) % 2 === 0) ? -1 : 1;
                let fs = (Math.floor(Math.random() * 10) % 2 === 0) ? -1 : 1;
                // vertex.z = wd[i%wd.length]*scale*fl;
                // vertex.y = wd[i%wd.length]*scale*fs;
                vertex.z = wd[0] * scale * fl;
                vertex.y = ((wd[1] + wd[0]) / 2) * scale * fs;
                //vertex.x = wd[i%wd.length]*1000000*fs;
            }
        }*/
};

var setup = function setup() {
    init();
    window.addEventListener("resize", resize, false);
    draw();
};

var draw = function draw() {
    camera.position.x = 0; //radius*Math.sin(angle);
    camera.position.y = 0; //radius*Math.sin(angle);
    camera.position.z = 200;
    //camera.position.x = 200;
    //camera.position.y = 0;
    //camera.position.z = 200;

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    geoUpdate(getSoundData());
    //geoUpdate();

    renderer.render(scene, camera);
    window.requestAnimationFrame(draw);
};

var keyd = function keyd() {
    console.log("" + event.key);

    if (event.key == "1") {
        //xp.push((Math.random()*MAX-MAX/2)); yp.push((Math.random()*MAX-MAX/2));
        //xp.push((Math.random()*MAX-MAX/2)); yp.push((Math.random()*MAX-MAX/2));
        //xp.push((Math.random()*MAX-MAX/2)); yp.push((Math.random()*MAX-MAX/2));
        //SIZE+=3;

        angle = 2 * Math.PI * parseInt(event.key) / 9 + angle;
    } else if (event.key == "0") {

        //xp=[(Math.random()*MAX-MAX/2)]; yp=[(Math.random()*MAX-MAX/2)];
        //xp.push((Math.random()*MAX-MAX/2)); yp.push((Math.random()*MAX-MAX/2));
        //xp.push((Math.random()*MAX-MAX/2)); yp.push((Math.random()*MAX-MAX/2));

        //SIZE=3;
    }

    console.log(xp);

    //if(event.key == "1"){
    //    angle = 2 * Math.PI * parseInt(event.key) / 9;
    //}
};

document.onkeydown = keyd;

setup();