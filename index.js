const SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50
const container = document.querySelector('#indexLizi')
let camera, scene, renderer, texture, material, light1, light2, light3
var particles = [], particle, count = 0

init()
animate()

function init(){
	camera = new THREE.PerspectiveCamera( 75, container.offsetWidth / container.offsetHeight, 1, 10000 )
	camera.position.z = 1000

	scene = new THREE.Scene()
	const particleSystem = new THREE.Group()

	light1 = new THREE.PointLight( 0x407ea8, 1, 500 )
	light1.position.set(-170, 0, 500)
	light1.power = 50
	scene.add( light1 )
	light2 = new THREE.PointLight( 0x9ec2c6, 1, 500 )
	light2.position.set(170, 0, 500)
	light2.power = 50
	scene.add( light2 )
	light3 = new THREE.PointLight( 0xFFFFFF, 1, 500 )
	light3.position.set(0, 0, 500)
	light3.power = 50
	scene.add( light2 )

	//光源helper
	// var sphereSize = 1
	// var pointLightHelper1 = new THREE.PointLightHelper( light1, sphereSize )
	// scene.add( pointLightHelper1 )
	// var pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize )
	// scene.add( pointLightHelper2 )

	var texture = new THREE.TextureLoader().load('static/texture/dot.png')


	const geometry = new THREE.Geometry()
	geometry.vertices.push(new THREE.Vector3())

	let i = 0
	for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
		for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
			material = new THREE.PointsMaterial({size: 7,
																			color: new THREE.Color(0xFFFFFF),
																			map: texture,
																			lights: true})
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
