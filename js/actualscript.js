"use strict";var main=function(){var time=0;var scene;var camera;var renderer;var controls;var sunlight;var geomSphere;var mars;var sun;var skybox;var matMars;var effectController={"NormalMapScale":0.55,"DisplacementMapScale":0.05,"VertexMultiplier":100};var obj={Reset:function(){resetOptions()}};function resetOptions(){effectController.NormalMapScale=0.55;effectController.DisplacementMapScale=0.05;effectController.VertexMultiplier=100;guiChanged();} var oldVertexMultiplier=10;init();initGUI();animate();function init(){scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.001,200);camera.position.z=2.5;renderer=new THREE.WebGLRenderer();renderer.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(renderer.domElement);controls=new THREE.OrbitControls(camera);var maxAnisotropy=renderer.capabilities.getMaxAnisotropy();if(maxAnisotropy>4){maxAnisotropy=4;} var textureLoader=new THREE.TextureLoader();var colorMapMars=textureLoader.load("maps/mars/mars.jpg");colorMapMars.anisotropy=maxAnisotropy;var normalMapMars=textureLoader.load("maps/mars/Blended_NRM.png");colorMapMars.anisotropy=maxAnisotropy;var displacementMapMars=textureLoader.load("maps/mars/Blended_DISP.jpg");var colorMapSkybox=textureLoader.load("maps/milkyway.jpg");colorMapSkybox.anisotropy=maxAnisotropy;matMars=new THREE.MeshPhongMaterial({color:0xaaaaaa,specular:0x000000,shininess:0,map:colorMapMars,normalMap:normalMapMars,displacementMap:displacementMapMars});var matSkybox=new THREE.MeshBasicMaterial({map:colorMapSkybox,side:THREE.BackSide});var matWhite=new THREE.MeshBasicMaterial({color:0xffffff});var geomCube=new THREE.BoxGeometry(1,1,1);geomSphere=new THREE.SphereGeometry(1,300,200);var geomSkybox=new THREE.SphereGeometry(10,24,16);sun=new THREE.Mesh(geomSphere,matWhite);sun.position.x=10;sun.position.y=0;scene.add(sun);skybox=new THREE.Mesh(geomSkybox,matSkybox);skybox.material.depthWrite=false;skybox.renderOrder=-999;scene.add(skybox);renderer.toneMappingExposure=2;sunlight=new THREE.PointLight(0xffffff,1,50);sunlight.position.x=10;scene.add(sunlight);window.addEventListener("resize",onWindowResize,false);} function animate(){requestAnimationFrame(animate);controls.update();time+=1;mars.rotation.y=time/300;skybox.position.x=camera.position.x;skybox.position.y=camera.position.y;skybox.position.z=camera.position.z;renderer.render(scene,camera);} function guiChanged(){if(oldVertexMultiplier!==effectController.VertexMultiplier){scene.remove(mars);} matMars.normalScale.set(effectController.NormalMapScale,effectController.NormalMapScale);matMars.displacementScale=effectController.DisplacementMapScale;if(oldVertexMultiplier!==effectController.VertexMultiplier){mars=new THREE.Mesh(new THREE.SphereGeometry(1,effectController.VertexMultiplier*3,effectController.VertexMultiplier*2),matMars);mars.position.x=0;mars.position.y=0;scene.add(mars);oldVertexMultiplier=effectController.VertexMultiplier;}} function initGUI(){var gui=new dat.GUI({width:350});gui.add(effectController,"NormalMapScale",0.0,1.0,0.01).onChange(guiChanged).name("Normal Map Scale").listen();gui.add(effectController,"DisplacementMapScale",0.0,0.15,0.005).onChange(guiChanged).name("Displacement Map Scale").listen();gui.add(effectController,"VertexMultiplier",5,150,1).onChange(guiChanged).name("Polygon Count Multiplier").listen();gui.add(obj,"Reset").onChange(guiChanged).name("RESET");guiChanged();} function onWindowResize(){camera.aspect=window.innerWidth/window.innerHeight;camera.updateProjectionMatrix();renderer.setSize(window.innerWidth,window.innerHeight);}};
