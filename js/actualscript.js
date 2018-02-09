"use strict";

var main = function () {

//engine variables
    var time = 0;

//trinity of holy objects
    var scene, camera, renderer;

//camera controls
    var controls


//lights
    var sunlight;

//mesh objects
    var cornerNE, cornerNW, cornerSE, cornerSW, ship, earth, sun, skybox;
    init();

    animate();

    function init() {
    //depicting of the genesis
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.001, 200);
        //camera.position.z = 5;
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        controls = new THREE.OrbitControls( camera );

    //images and textures
    var textureLoader = new THREE.TextureLoader();//https://www.solarsystemscope.com/images/textures/full/2k_earth_daymap.jpg
    var colorMapEarth = textureLoader.load("earth.jpg");
    var normalMapEarth = textureLoader.load("earth_normal_map.tif");
    var specularMapEarth = textureLoader.load("earth_specular_map.tif");
    var colorMapSkybox = textureLoader.load("milkyway.jpg");


    //materials engineering
    var matEarth = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        specular: 0x333333,
        shininess: 15,
        map: colorMapEarth,
        /*specular: specularMapEarth,
        normalMap: normalMapEarth*/
    });
    var matSkybox = new THREE.MeshBasicMaterial({
        map: colorMapSkybox,
        side: THREE.BackSide
    });

    var matShip = new THREE.MeshBasicMaterial({color: 0xffffff});
    var matRed = new THREE.MeshBasicMaterial({color: 0xff0000});
    var matGreen = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var matBlue = new THREE.MeshBasicMaterial({color: 0x0000ff});
    var matWhite = new THREE.MeshBasicMaterial({color: 0xffffff});
    var matToon = new THREE.MeshToonMaterial({color: 0xaaaaaa});

    //geometry
    var geomCube = new THREE.BoxGeometry(1, 1, 1);
    var geomSphere = new THREE.SphereGeometry (1,24,16);
    var geomSkybox = new THREE.SphereGeometry (10,24,16);

    //mesh positioning
    cornerNE = new THREE.Mesh(geomCube, matRed);
    cornerNE.position.x = 8;
    cornerNE.position.y = 4.5;
    scene.add(cornerNE);
    cornerNW = new THREE.Mesh(geomCube, matGreen);
    cornerNW.position.x = -8;
    cornerNW.position.y = 4.5;
    scene.add(cornerNW);
    cornerSE = new THREE.Mesh(geomCube, matBlue);
    cornerSE.position.x = 8;
    cornerSE.position.y = -4.5;
    scene.add(cornerSE);
    cornerSW = new THREE.Mesh(geomCube, matWhite);
    cornerSW.position.x = -8;
    cornerSW.position.y = -4.5;
    scene.add(cornerSW);
    ship = new THREE.Mesh(geomCube, matShip);
    ship.position.x = 0;
    ship.position.y = -4.5;
    scene.add(ship);
    earth = new THREE.Mesh(geomSphere, matEarth);
    earth.position.x = 0;
    earth.position.y = 0;
    scene.add(earth);
    sun = new THREE.Mesh(geomSphere, matWhite);
    sun.position.x = 0;
    sun.position.y = 0;
    scene.add(sun);
    skybox = new THREE.Mesh(geomSkybox, matSkybox);
    skybox.material.depthWrite = false;
    skybox.renderOrder = -999;

    scene.add(skybox);


    //light
    //renderer.gammaInput = true;
    //renderer.gammaOutput = true;
    //renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2; //affect exposure
    sunlight = new THREE.PointLight( 0xffffff, 1, 50 );
    scene.add( sunlight );
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        time += 1;
        earth.rotation.y += 0.01;
        earth.position.x=4*Math.cos(-time/300);
        earth.position.z=4*Math.sin(-time/300);
        skybox.position.x=camera.position.x;
        skybox.position.y=camera.position.y;
        skybox.position.z=camera.position.z;

        renderer.render(scene, camera);
    }
};
