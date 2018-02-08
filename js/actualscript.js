"use strict";

var main = function () {

//trinity of holy objects
    var scene, camera, renderer;

//mesh objects
    var cornerNE, cornerNW, cornerSE, cornerSW, ship, earth;
    init();
    animate();

    function init() {
    //depicting of the genesis
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 23;
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

    //images and textures
    // load a resourcevar
    var matEarth
    var colorMapEarth = new Image();
    colorMapEarth.crossOrigin = "anonymous";
    colorMapEarth.onload = function() {
            matEarth = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                //specular: 0x333333,
                //shininess: 15,
                map: colorMapEarth
            });
        };
        colorMapEarth.src =  "earth.jpg";


//        var colorMapEarth = new THREE.TextureLoader().load("https://www.solarsystemscope.com/images/textures/full/2k_earth_daymap.jpg");

    //materials engineering
        var matShip = new THREE.MeshBasicMaterial({color: 0xffffff});
        var bismatEarth = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            //specular: 0x333333,
            //shininess: 15,
            map: colorMapEarth
        });
        var matRed = new THREE.MeshBasicMaterial({color: 0xff0000});
        var matGreen = new THREE.MeshBasicMaterial({color: 0x00ff00});
        var matBlue = new THREE.MeshBasicMaterial({color: 0x0000ff});
        var matWhite = new THREE.MeshBasicMaterial({color: 0xffffff});

    //geometry
        var geomCube = new THREE.BoxGeometry(1, 1, 1);
        var geomSphere = new THREE.SphereGeometry (1,24,16);

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


        //light
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		renderer.toneMapping = THREE.ReinhardToneMapping;
		renderer.toneMappingExposure = 3;

        scene.add( new THREE.HemisphereLight( 0x443333, 0x222233, 4 ) );





    }


    function animate() {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
    }

};
