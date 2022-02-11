import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
//import { generateUUID } from 'three/src/math/MathUtils'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const gltfLoader1 = new GLTFLoader()
const gltfLoader2 = new GLTFLoader()
const gltfloader3 = new GLTFLoader()

const gui = new dat.GUI()
const gui2 = new dat.GUI()

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

//The Comet Watcher
gltfloader3.load('scene3.gltf', (gltf3) => {

    gltf3.scene.scale.set(0.3, 0.3, 0.3)
    gltf3.scene.rotation.set(0, 3.3, 0)

    gltf3.scene.position.x = 0
    gltf3.scene.position.y = 0.4
    gltf3.scene.position.z = 0
    scene.add(gltf3.scene)
})

//The Rocket Model
gltfLoader1.load('scene2.gltf', (gltf2) => {

    gltf2.scene.scale.set(0.002, 0.002, 0.002)
    gltf2.scene.rotation.set(0, 4.7, 0)

    gltf2.scene.position.x = 0.4
    gltf2.scene.position.y = 0
    gltf2.scene.position.z = 0.9
    scene.add(gltf2.scene)
})

//The Moon Model (new)
gltfLoader2.load('scene.gltf', (gltf) => {

   gltf.scene.scale.set(0.005, 0.005, 0.005)
   gltf.scene.rotation.set(0, 4.7, 0)
    scene.add(gltf.scene)
})


const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );


// Lights

const light1 = new THREE.PointLight(0xff0000, 2)
light1.position.set(2,2,2)

scene.add(light1)

    gui.add(light1.position, 'x').min(-9).max(9)
    gui.add(light1.position, 'y').min(-9).max(9)
    gui.add(light1.position, 'z').min(-9).max(9)


const light2 = new THREE.PointLight(0xffffff, 1)
light2.position.set(1,1,1)

scene.add(light2)

    gui2.add(light2.position, 'x').min(-3).max(3).step(0.01)
    gui2.add(light2.position, 'y').min(-3).max(3).step(0.01)
    gui2.add(light2.position, 'z').min(-3).max(3).step(0.01)


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// const controls = new OrbitControls(camera, canvas)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime
    renderer.render(scene, camera)

        window.requestAnimationFrame(tick)
}

tick()
