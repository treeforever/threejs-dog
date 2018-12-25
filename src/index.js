import {
  Scene,
  PerspectiveCamera,
  Vector3,
  WebGLRenderer,
  GridHelper,
  HemisphereLight,
  DirectionalLight,
  Mesh,
  PlaneBufferGeometry,
  MeshBasicMateria,
  Group,
  MeshLambertMaterial,
  BoxGeometry,
  FlatShading,
  MeshBasicMaterial
} from "three";
import "@babel/polyfill";
import OrbitControls from "./OrbitControls";
import { Dog } from "./dog";

//THREEJS RELATED VARIABLES

var scene,
  camera,
  controls,
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane,
  shadowLight,
  backLight,
  light,
  renderer,
  container;

//SCENE
var floor,
  dog,
  fan,
  isBlowing = false;

//SCREEN VARIABLES

var HEIGHT,
  WIDTH,
  windowHalfX,
  windowHalfY,
  mousePos = {
    x: 0,
    y: 0
  };

var onMouseDownPosition;

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function init() {
  scene = new Scene();
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 2000;
  camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

  camera.position.x = 700;
  camera.position.z = 800;
  camera.position.y = 400;
  camera.lookAt(new Vector3(0, 0, 0));

  renderer = new WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  container = document.getElementById("world");
  container.appendChild(renderer.domElement);
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;
  controls = new OrbitControls(camera, renderer.domElement);

  controls.update();

  document.addEventListener("mousemove", handleMouseMove, false);
}

function handleMouseMove(event) {
  mousePos = { x: event.clientX, y: event.clientY };
}

function addGrid() {
  var gridHelper = new GridHelper(1000, 50);
  scene.add(gridHelper);
}

function createLights() {
  light = new HemisphereLight(0xffffff, 0xffffff, 0.5);

  shadowLight = new DirectionalLight(0xffffff, 0.8);
  shadowLight.position.set(200, 200, 200);
  shadowLight.castShadow = true;
  // shadowLight.shadowDarkness = 0.2; // shadowDarkness has been removed

  backLight = new DirectionalLight(0xffffff, 0.4);
  backLight.position.set(-100, 200, 50);
  // backLight.shadowDarkness = 0.1; // shadowDarkness has been removed
  backLight.castShadow = true;

  scene.add(backLight);
  scene.add(light);
  scene.add(shadowLight);
}

function createFloor() {
  floor = new Mesh(
    new PlaneBufferGeometry(2000, 2000),
    new MeshBasicMaterial({
      color: 0xf9d3c5
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -350;
  floor.position.z = -500;
  floor.receiveShadow = true;
  scene.add(floor);
}

function createDog() {
  dog = new Dog();
  scene.add(dog.threegroup);
}

function clamp(number, lower, upper) {
  if (number < lower) {
    return lower;
  }

  if (number > upper) {
    return upper;
  }
  return number;
}

let tongueMoving = true;

function sleep(millsecs) {
  return new Promise(resolve => setTimeout(resolve, millsecs));
}

async function tongeToggleLoop() {
  while (true) {
    tongueMoving = !tongueMoving;
    const randomInterval = Math.ceil(Math.random() * 4) * 1000;
    await sleep(randomInterval);
  }
}

function loop(timestamp) {
  render();
  var xTarget = mousePos.x - windowHalfX;
  var yTarget = mousePos.y - windowHalfY;

  dog.moveWithCursor(xTarget, yTarget);
  if (tongueMoving) {
    dog.moveTongue(0.5);
  }

  requestAnimationFrame(loop);
}

function render() {
  if (controls) controls.update();
  renderer.render(scene, camera);
}

function component() {
  const el = document.createElement("div");
  el.setAttribute("id", "world");
  return el;
}

document.body.appendChild(component());

init();
createLights();
// addGrid();
createFloor();
createDog();
loop();
tongeToggleLoop();
