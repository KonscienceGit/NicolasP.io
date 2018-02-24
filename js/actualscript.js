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
    var cornerNE, cornerNW, cornerSE, cornerSW, ship, earth, mars, sun, skybox;

    init();
    animate();

    function init() {
    //depicting of the genesis
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.001, 200);
        camera.position.z = 2.5;

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        controls = new THREE.OrbitControls( camera );
    //Anisotrop filtering, setting to the max possible
        var maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    //images and textures
        var textureLoader = new THREE.TextureLoader();//https://www.solarsystemscope.com/images/textures/full/2k_earth_daymap.jpg
        var colorMapEarth = textureLoader.load("maps/earth.jpg");
        colorMapEarth.anisotropy = maxAnisotropy;
        var specularMapEarth = textureLoader.load("maps/earth_specular_map.jpg");
        var normalMapEarth = textureLoader.load("maps/earth_normal_map.jpg");
        normalMapEarth.anisotropy = maxAnisotropy;

        var colorMapMars = textureLoader.load("maps/mars.jpg");
        colorMapMars.anisotropy = maxAnisotropy;
        var normalMapMars = textureLoader.load("maps/mars_norm_map.png");
        colorMapMars.anisotropy = maxAnisotropy;
        var displacementMapMars = textureLoader.load("maps/mars_disp_map.png");
        colorMapMars.anisotropy = maxAnisotropy;

        var colorMapSkybox = textureLoader.load("maps/milkyway.jpg");
        colorMapSkybox.anisotropy = maxAnisotropy;

    //materials engineering
        var matEarth = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            shininess: 25,
            map: colorMapEarth,
            specularMap: specularMapEarth,
            normalMap: normalMapEarth
        });
        var matMars = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            specular: 0x000000,
            shininess: 0,
            map: colorMapMars,
            normalMap: normalMapMars,
            displacementMap: displacementMapMars,
            displacementScale: 0.1
        });
        var matSkybox = new THREE.MeshBasicMaterial({
            map: colorMapSkybox,
            side: THREE.BackSide
        });

        var matWhite = new THREE.MeshBasicMaterial({color: 0xffffff});


    //geometry
        var geomCube = new THREE.BoxGeometry(1, 1, 1);
        var geomSphere = new THREE.SphereGeometry (1,300,200);
        var geomSkybox = new THREE.SphereGeometry (10,24,16);

    //mesh positioning
        earth = new THREE.Mesh(geomSphere, matEarth);
        earth.position.x = 0;
        earth.position.y = 2.5;
        scene.add(earth);
        mars = new THREE.Mesh(geomSphere, matMars);
        mars.position.x = 0;
        mars.position.y = 0;
        scene.add(mars);
        sun = new THREE.Mesh(geomSphere, matWhite);
        sun.position.x = 10;
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
        sunlight.position.x=10;
        scene.add( sunlight );
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        time += 1;
        earth.rotation.y += 0.003;
        mars.rotation.y += 0.003;
        /*earth.position.x=8*Math.cos(-time/800);*/
        /*earth.position.z=8*Math.sin(-time/800);*/
        skybox.position.x=camera.position.x;
        skybox.position.y=camera.position.y;
        skybox.position.z=camera.position.z;

        renderer.render(scene, camera);
    }
};
