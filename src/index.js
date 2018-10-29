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
} from 'three';

import OrbitControls from './OrbitControls';

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
  lion,
  fan,
  isBlowing = false;

//SCREEN VARIABLES

var HEIGHT,
  WIDTH,
  windowHalfX,
  windowHalfY,
  mousePos = {
    x: 0,
    y: 0,
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

  camera.position.x = 0;
  camera.position.z = 800;
  camera.position.y = 0;
  camera.lookAt(new Vector3(0, 0, 0));

  renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMapEnabled = true;
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;
  controls = new OrbitControls(camera, renderer.domElement);

  controls.update();
}

function addGrid() {
  var gridHelper = new GridHelper(1000, 50);
  scene.add(gridHelper);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

function createLights() {
  light = new HemisphereLight(0xffffff, 0xffffff, 0.5);

  shadowLight = new DirectionalLight(0xffffff, 0.8);
  shadowLight.position.set(200, 200, 200);
  shadowLight.castShadow = true;
  shadowLight.shadowDarkness = 0.2;

  backLight = new DirectionalLight(0xffffff, 0.4);
  backLight.position.set(-100, 200, 50);
  backLight.shadowDarkness = 0.1;
  backLight.castShadow = true;

  scene.add(backLight);
  scene.add(light);
  scene.add(shadowLight);
}

function createFloor() {
  floor = new Mesh(
    new PlaneBufferGeometry(1000, 500),
    new MeshBasicMaterial({
      color: 0xebe5e7,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -100;
  floor.receiveShadow = true;
  scene.add(floor);
}

function createLion() {
  lion = new Lion();
  scene.add(lion.threegroup);
}

function Lion() {
  this.windTime = 0;
  this.bodyInitPositions = [];
  this.maneParts = [];
  this.threegroup = new Group();
  this.yellowMat = new MeshLambertMaterial({
    color: 0xffb10a,
    shading: FlatShading,
  });
  this.redMat = new MeshLambertMaterial({
    color: 0xad3525,
    shading: FlatShading,
  });

  this.pinkMat = new MeshLambertMaterial({
    color: 0xe55d2b,
    shading: FlatShading,
  });

  this.lightPinkMat = new MeshLambertMaterial({
    color: 0xffd177,
    shading: FlatShading,
  });

  this.whiteMat = new MeshLambertMaterial({
    color: 0xffffff,
    shading: FlatShading,
  });

  this.purpleMat = new MeshLambertMaterial({
    color: 0x451954,
    shading: FlatShading,
  });

  this.greyMat = new MeshLambertMaterial({
    color: 0x653f4c,
    shading: FlatShading,
  });

  this.blackMat = new MeshLambertMaterial({
    color: 0x302925,
    shading: FlatShading,
  });

  // head
  var head1 = new BoxGeometry(80, 100, 300);
  var head2 = new BoxGeometry(80, 80, 150);
  this.head1 = new Mesh(head1, this.yellowMat);
  this.head2 = new Mesh(head2, this.yellowMat);
  this.head2.position.set(0, 90, -75);
  this.threegroup.add(this.head1);
  this.threegroup.add(this.head2);

  // ears & nose
  var ear1 = new BoxGeometry(15, 160, 100);
  var ear2 = new BoxGeometry(15, 160, 100);
  var nose = new BoxGeometry(35, 35, 30);

  this.ear1 = new Mesh(ear1, this.pinkMat);
  this.ear2 = new Mesh(ear2, this.pinkMat);
  this.nose = new Mesh(nose, this.pinkMat);

  this.ear1.position.set(90, 85, -135);
  this.ear2.position.set(-90, 85, -135);
  this.nose.position.set(0, 50, 165);

  this.threegroup.add(this.ear1);
  this.threegroup.add(this.ear2);

  this.threegroup.add(this.nose);

  // eyes
  var eye1 = new BoxGeometry(10, 30, 30);
  var eye2 = new BoxGeometry(10, 30, 30);

  this.eye1 = new Mesh(eye1, this.whiteMat);
  this.eye2 = new Mesh(eye2, this.whiteMat);

  this.eye1.position.set(45, 90, -40);
  this.eye2.position.set(-45, 90, -40);

  this.threegroup.add(this.eye1);
  this.threegroup.add(this.eye2);

  // eyeballs
  var eyeBall1 = new BoxGeometry(5, 10, 10);
  var eyeBall2 = new BoxGeometry(5, 10, 10);

  this.eyeBall1 = new Mesh(eyeBall1, this.blackMat);
  this.eyeBall2 = new Mesh(eyeBall2, this.blackMat);

  this.eyeBall1.position.set(50, 90, -40);
  this.eyeBall2.position.set(-50, 90, -40);

  this.threegroup.add(this.eyeBall1);
  this.threegroup.add(this.eyeBall2);

  // body
  var upperBody = new BoxGeometry(160, 300, 100);
  this.upperBody = new Mesh(upperBody, this.yellowMat);
  this.upperBody.position.set(0, -200, -100);
  this.threegroup.add(this.upperBody);

  var middleBody = new BoxGeometry(160, 200, 300);
  this.middleBody = new Mesh(middleBody, this.yellowMat);
  this.middleBody.position.set(0, -250, -300);
  this.threegroup.add(this.middleBody);

  var bottom = new BoxGeometry(260, 250, 200);
  this.bottom = new Mesh(bottom, this.yellowMat);
  this.bottom.position.set(0, -225, -550);
  this.threegroup.add(this.bottom);

  // legs
  // right
  var rightBackThigh = new BoxGeometry(50, 150, 100);
  this.rightBackThigh = new Mesh(rightBackThigh, this.pinkMat);
  this.rightBackThigh.position.set(165, -275, -550);
  this.threegroup.add(this.rightBackThigh);

  var rightBackLeg = new BoxGeometry(50, 50, 200);
  this.rightBackLeg = new Mesh(rightBackLeg, this.pinkMat);
  this.rightBackLeg.position.set(165, -325, -400);
  this.threegroup.add(this.rightBackLeg);

  var rightFrontThigh = new BoxGeometry(50, 150, 50);
  this.rightFrontThigh = new Mesh(rightFrontThigh, this.pinkMat);
  this.rightFrontThigh.position.set(105, -275, -100);
  this.threegroup.add(this.rightFrontThigh);

  var rightFrontLeg = new BoxGeometry(50, 50, 200);
  this.rightFrontLeg = new Mesh(rightFrontLeg, this.pinkMat);
  this.rightFrontLeg.position.set(105, -325, 0);
  this.threegroup.add(this.rightFrontLeg);

  // left
  var leftBackThigh = new BoxGeometry(50, 150, 100);
  this.leftBackThigh = new Mesh(leftBackThigh, this.pinkMat);
  this.leftBackThigh.position.set(-165, -275, -550);
  this.threegroup.add(this.leftBackThigh);

  var leftBackLeg = new BoxGeometry(50, 50, 200);
  this.leftBackLeg = new Mesh(leftBackLeg, this.pinkMat);
  this.leftBackLeg.position.set(-165, -325, -400);
  this.threegroup.add(this.leftBackLeg);

  var leftFrontThigh = new BoxGeometry(50, 150, 50);
  this.leftFrontThigh = new Mesh(leftFrontThigh, this.pinkMat);
  this.leftFrontThigh.position.set(-105, -275, -100);
  this.threegroup.add(this.leftFrontThigh);

  var leftFrontLeg = new BoxGeometry(50, 50, 200);
  this.leftFrontLeg = new Mesh(leftFrontLeg, this.pinkMat);
  this.leftFrontLeg.position.set(-105, -325, 0);
  this.threegroup.add(this.leftFrontLeg);

  // tail
  var tail1 = new BoxGeometry(20, 20, 100);
  this.tail1 = new Mesh(tail1, this.pinkMat);
  this.tail1.position.set(0, -250, -700);
  this.threegroup.add(this.tail1);

  var tail2 = new BoxGeometry(80, 20, 20);
  this.tail2 = new Mesh(tail2, this.pinkMat);
  this.tail2.position.set(-50, -250, -740);
  this.threegroup.add(this.tail2);

  // don't care now
  this.threegroup.traverse(function(object) {
    if (object instanceof Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
}

function loop() {
  render();
  requestAnimationFrame(loop);
}

function render() {
  if (controls) controls.update();
  renderer.render(scene, camera);
}

function component() {
  const el = document.createElement('div');
  el.setAttribute('id', 'world');
  return el;
}

document.body.appendChild(component());

init();
createLights();
// addGrid();
// createFloor();
createLion();
loop();
