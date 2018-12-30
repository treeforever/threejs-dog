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

function createWorldContainer() {
  const el = document.createElement("div");
  el.setAttribute("id", "world");
  return el;
}

let mousePos = {
  x: 0,
  y: 0
};
function handleMouseMove(event) {
  mousePos = { x: event.clientX, y: event.clientY };
}

function createLights() {
  const light = new HemisphereLight(0xffffff, 0xffffff, 0.5);

  const shadowLight = new DirectionalLight(0xffffff, 0.8);
  shadowLight.position.set(200, 200, 200);
  shadowLight.castShadow = true;
  // shadowLight.shadowDarkness = 0.2; // shadowDarkness has been removed

  const backLight = new DirectionalLight(0xffffff, 0.4);
  backLight.position.set(-100, 200, 50);
  // backLight.shadowDarkness = 0.1; // shadowDarkness has been removed
  backLight.castShadow = true;

  scene.add(light);
  scene.add(shadowLight);
  scene.add(backLight);
}

function createFloor() {
  const floor = new Mesh(
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

function addGrid() {
  const gridHelper = new GridHelper(1000, 50);
  scene.add(gridHelper);
}

function addDogToScene(dog) {
  scene.add(dog);
}

function render() {
  if (controls) {
    controls.update();
  }
  renderer.render(scene, camera);
}

function loop(dog) {
  function renderLoop(timestamp) {
    const xTarget = mousePos.x - windowHalfX;
    const yTarget = mousePos.y - windowHalfY;
    render();

    dog.moveWithCursor(xTarget, yTarget);

    requestAnimationFrame(renderLoop);
  }
  renderLoop();
}

function sleep(millsecs) {
  return new Promise(resolve => setTimeout(resolve, millsecs));
}

async function tongueToggleController(dog) {
  while (true) {
    dog.tongueMoving = !dog.tongueMoving;
    const randomInterval = Math.ceil(Math.random() * 4) * 1000;
    await sleep(randomInterval);
  }
}

async function tongueController(dog) {
  while (true) {
    dog.maybeMoveTongue(0.5);
    await sleep(10);
  }
}

//INIT THREE JS, SCREEN AND MOUSE EVENTS
let scene,
  HEIGHT,
  WIDTH,
  aspectRatio,
  fieldOfView,
  nearPlane,
  farPlane,
  camera,
  renderer,
  controls,
  windowHalfX,
  windowHalfY;

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
  render();

  document.body.appendChild(createWorldContainer());
  const container = document.getElementById("world");
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;

  document.addEventListener("mousemove", handleMouseMove, false);

  createLights();
  createFloor();
  // addGrid();
}

function initDog() {
  const dog = new Dog();
  addDogToScene(dog.group);
  loop(dog);
  tongueToggleController(dog);
  tongueController(dog);
}

init();
initDog();
