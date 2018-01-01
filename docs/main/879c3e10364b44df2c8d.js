/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	var SEPARATION = 100,
	    AMOUNTX = 50,
	    AMOUNTY = 50;
	var container = document.querySelector('#indexLizi');
	var camera = void 0,
	    scene = void 0,
	    renderer = void 0;
	var particles = [],
	    particle,
	    count = 0;

	init();
	animate();

	function init() {
		camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 1, 10000);
		camera.position.z = 1000;

		scene = new THREE.Scene();
		var particleSystem = new THREE.Group();
		var texture = new THREE.TextureLoader().load('//game.gtimg.cn/images/tgideas/2017/three/shader/dot.png');
		var material = new THREE.PointsMaterial({ size: 4, color: 0x95a4b4, map: texture });
		var geometry = new THREE.Geometry();
		// const light1 = new THREE.PointLight( 0xffffff, 1, 1000 )
		// light1.position.x = 0
		// light1.position.y = 0
		// light1.position.z = 1000
		// scene.add( light1 )
		geometry.vertices.push(new THREE.Vector3());

		var i = 0;
		for (var ix = 0; ix < AMOUNTX; ix++) {
			for (var iy = 0; iy < AMOUNTY; iy++) {
				particle = particles[i++] = new THREE.Points(geometry, material);
				particle.position.x = ix * SEPARATION - AMOUNTX * SEPARATION / 2;
				particle.position.y = -100;
				particle.position.z = iy * SEPARATION - AMOUNTY * SEPARATION / 2;
				particleSystem.add(particle);
			}
		}
		scene.add(particleSystem);

		renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(container.offsetWidth, container.offsetHeight);
		renderer.domElement.style.background = 'transparent';
		container.appendChild(renderer.domElement);
	}
	function animate() {
		requestAnimationFrame(animate);
		update();
	}
	function update() {
		camera.lookAt(scene.position);
		var i = 0;
		for (var ix = 0; ix < AMOUNTX; ix++) {
			for (var iy = 0; iy < AMOUNTY; iy++) {
				particle = particles[i++];
				particle.position.y = Math.sin((ix + count) * 0.3) * 20 + Math.sin((iy + count) * 0.5) * 20 - 100;
				particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4;
			}
		}
		renderer.render(scene, camera);
		count += 0.1;
	}

/***/ })
/******/ ]);