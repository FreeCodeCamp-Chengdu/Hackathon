const SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50
const container = document.querySelector('#indexLizi')
let camera, scene, renderer, texture, material, light1, light2
var particles = [], particle, count = 0

init()
animate()

function init(){
	camera = new THREE.PerspectiveCamera( 75, container.offsetWidth / container.offsetHeight, 1, 10000 )
	camera.position.z = 1000

	scene = new THREE.Scene()
	const particleSystem = new THREE.Group()


	// texture  = new THREE.TextureLoader().load('//game.gtimg.cn/images/tgideas/2017/three/shader/dot.png')

	//
	// material = new THREE.PointsMaterial({size: 4, color: 0x95a4b4, map: texture})




	light1 = new THREE.PointLight( 0xFFFFFF, 1, 500 )
	light1.position.x = -170
	light1.position.y = 0
	light1.position.z = 500
	light1.power = 50
	scene.add( light1 )
	light2 = new THREE.PointLight( 'blue', 1, 500 )
	light2.position.x = 170
	light2.position.y = 0
	light2.position.z = 500
	light2.power = 50
	scene.add( light2 )

	//光源helper
	var sphereSize = 1
	var pointLightHelper1 = new THREE.PointLightHelper( light1, sphereSize )
	scene.add( pointLightHelper1 )
	var pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize )
	scene.add( pointLightHelper2 )

	var texture = new THREE.TextureLoader().load('static/texture/dot.png')




	//材质
	// var uniforms = {
	// 	color:{value: new THREE.Color(0xffffff)},
	// 	texture:{value: new THREE.TextureLoader().load( "//game.gtimg.cn/images/tgideas/2017/three/shader/dot.png")},
	// 	val: {value: 1.0}
	// };
	// material = new THREE.ShaderMaterial({
	// 	uniforms:       uniforms,
	// 	vertexShader:   document.getElementById('vertexshader').textContent,
	// 	fragmentShader: document.getElementById('fragmentshader').textContent,
	// 	blending:       THREE.AdditiveBlending,
	// 	depthTest:      false,
	// 	transparent:    true
	// });

	// console.log(document.getElementById('vertexshader').textContent)
	// console.log(document.getElementById('fragmentshader').textContent)

	const geometry = new THREE.Geometry()
	geometry.vertices.push(new THREE.Vector3())

	let i = 0
	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
			material = new THREE.PointsMaterial({size: 4,
																			color: new THREE.Color(0xFFFFFF),
																			map: texture,
																			lights: true})
			// particle = particles[ i ++ ] = new THREE.Points( geometry ,material )
			particle = particles[ i ++ ] = new THREE.Points( geometry ,material )
			particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 )
			particle.position.y = -100
			particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 )
			particleSystem.add(particle)
		}
	}
	scene.add( particleSystem );

	renderer = new THREE.WebGLRenderer({alpha:true})
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize( container.offsetWidth, container.offsetHeight )
	renderer.domElement.style.background = 'transparent'
	container.appendChild( renderer.domElement )
}
function animate(){
	requestAnimationFrame(animate)
	update()
}
function update(){
	camera.lookAt( scene.position )
	var i = 0;
	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
			particle = particles[ i++ ];
			particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 20 ) +
				( Math.sin( ( iy + count ) * 0.5 ) * 20 ) - 100;
			particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 4 +
				( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 4;
		}
	}
	renderer.render( scene, camera )
	count += 0.1;
}


