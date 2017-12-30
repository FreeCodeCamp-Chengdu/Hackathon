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

	var camera, scene, renderer;
	var isUserInteracting = false,
	    onMouseDownMouseX = 0,
	    onMouseDownMouseY = 0,
	    lon = 90,
	    onMouseDownLon = 0,
	    lat = 0,
	    onMouseDownLat = 0,
	    phi = 0,
	    theta = 0,
	    onPointerDownPointerX = 0,
	    onPointerDownPointerY = 0,
	    onPointerDownLon = 0,
	    onPointerDownLat = 0;
	target = new THREE.Vector3();
	//lon是x的偏移(纬度)
	//lat是y的偏移(经度)
	//onPointerDownPointerX, onPointerDownPointerY是mousedown的时候的坐标
	// onPointerDownLon,onPointerDownLat 是mousedown的时候的经纬度

	init();
	animate();

	function init() {

		var container, mesh;

		container = document.getElementById('container');
		camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 10, 1100);

		scene = new THREE.Scene();

		mesh = new THREE.Mesh(new THREE.SphereGeometry(300, 32, 32), loadTexture('static/textures/full_view.jpg'));
		mesh.scale.x = -1;

		scene.add(mesh);
		var light = new THREE.AmbientLight(0xffffff);
		scene.add(light);

		// camera.position = new THREE.Vector3(0,0,0)
		// camera.lookAt(new THREE.Vector3(1,1,1))

		// for ( var i = 0, l = mesh.geometry.vertices.length; i < l; i ++ ) {

		// 	var vertex = mesh.geometry.vertices[ i ];

		// 	vertex.normalize();
		// 	vertex.multiplyScalar( 550 );

		// }

		renderer = new THREE.WebGLRenderer();
		// console.log(window.devicePixelRatio)
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		renderer.render(scene, camera);

		document.addEventListener('mousedown', onDocumentMouseDown, false);
		document.addEventListener('mousemove', onDocumentMouseMove, false);
		document.addEventListener('mouseup', onDocumentMouseUp, false);
		document.addEventListener('wheel', onDocumentMouseWheel, false);

		document.addEventListener('touchstart', onDocumentTouchStart, false);
		document.addEventListener('touchmove', onDocumentTouchMove, false);

		//

		drawAxes(scene);
		// window.addEventListener( 'resize', onWindowResize, false );

	}

	// function onWindowResize() {

	// 	camera.aspect = window.innerWidth / window.innerHeight;
	// 	camera.updateProjectionMatrix();

	// 	renderer.setSize( window.innerWidth, window.innerHeight );

	// }

	function loadTexture(path) {

		// var texture = new THREE.Texture( texture_placeholder );
		var texture = new THREE.ImageUtils.loadTexture(path);
		var material = new THREE.MeshBasicMaterial({ map: texture });

		return material;
	}

	function onDocumentMouseDown(event) {

		event.preventDefault();

		isUserInteracting = true;

		onPointerDownPointerX = event.clientX;
		onPointerDownPointerY = event.clientY;

		onPointerDownLon = lon;
		onPointerDownLat = lat;
	}

	// onPointerDownPointerX，onPointerDownPointerY  鼠标点击的位置
	// lon = 90, onMouseDownLon = 0,
	// lat = 0, onMouseDownLat = 0,
	// phi = 0, theta = 0,

	function onDocumentMouseMove(event) {

		if (isUserInteracting === true) {

			lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
			lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
		}
	}

	function onDocumentMouseUp(event) {

		isUserInteracting = false;
	}

	function onDocumentMouseWheel(event) {

		camera.fov += event.deltaY * 0.05;
		camera.updateProjectionMatrix();
	}

	function onDocumentTouchStart(event) {

		if (event.touches.length == 1) {

			event.preventDefault();

			onPointerDownPointerX = event.touches[0].pageX;
			onPointerDownPointerY = event.touches[0].pageY;

			onPointerDownLon = lon;
			onPointerDownLat = lat;
		}
	}

	function onDocumentTouchMove(event) {

		if (event.touches.length == 1) {

			event.preventDefault();

			lon = (onPointerDownPointerX - event.touches[0].pageX) * 0.1 + onPointerDownLon;
			lat = (event.touches[0].pageY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
		}
	}

	function animate() {
		// console.log(1)
		requestAnimationFrame(animate);
		update();
	}

	function update() {

		if (isUserInteracting === false) {

			lon += 0.1;
		}

		// onMouseDownMouseX = 0, onMouseDownMouseY = 0,
		// lon = 90, onMouseDownLon = 0,
		// lat = 0, onMouseDownLat = 0,
		// phi = 0, theta = 0,


		lat = Math.max(-85, Math.min(85, lat));
		phi = THREE.Math.degToRad(90 - lat);
		theta = THREE.Math.degToRad(lon); //就是lon转成弧度

		// target.x = 500 * Math.sin( phi ) * Math.cos( theta );
		// target.y = 500 * Math.cos( phi );
		// target.z = 500 * Math.sin( phi ) * Math.sin( theta );
		target.x = 500 * Math.cos(theta);
		target.y = 500 * Math.cos(phi);
		target.z = 500 * Math.sin(theta);
		//将target的向量给camera，然后让camera反向
		// camera.position.copy( target ).negate();
		// camera.position.copy( target )
		camera.position = new THREE.Vector3(0, 0, 0);
		camera.lookAt(target);

		// camera.lookAt(new THREE.Vector3(0,0,0))

		renderer.render(scene, camera);
	}

	function drawAxes(scene) {
		// x-axis
		var xGeo = new THREE.Geometry();
		xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
		xGeo.vertices.push(new THREE.Vector3(3000, 0, 0));
		var xMat = new THREE.LineBasicMaterial({
			color: 0xff0000
		});
		var xAxis = new THREE.Line(xGeo, xMat);
		scene.add(xAxis);

		// y-axis
		var yGeo = new THREE.Geometry();
		yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
		yGeo.vertices.push(new THREE.Vector3(0, 3000, 0));
		var yMat = new THREE.LineBasicMaterial({
			// color: 0x00ff00
			color: 0xff0000
		});
		var yAxis = new THREE.Line(yGeo, yMat);
		scene.add(yAxis);

		// z-axis
		var zGeo = new THREE.Geometry();
		zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
		zGeo.vertices.push(new THREE.Vector3(0, 0, 3000));
		var zMat = new THREE.LineBasicMaterial({
			// color: 0x00ccff
			color: 0xff0000
		});
		var zAxis = new THREE.Line(zGeo, zMat);
		scene.add(zAxis);
	}

/***/ })
/******/ ]);