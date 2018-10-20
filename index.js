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
dist = 0;

var onMouseDownPosition;

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function init() {
  scene = new THREE.Scene();
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 2000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane,
  );

  camera.position.x = 0;
  camera.position.z = 800;
  camera.position.y = 0;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMapEnabled = true;
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  controls.update();
}

function addGrid() {
  var gridHelper = new THREE.GridHelper(1000, 50);
  scene.add(gridHelper);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

function createLights() {
  light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);

  shadowLight = new THREE.DirectionalLight(0xffffff, 0.8);
  shadowLight.position.set(200, 200, 200);
  shadowLight.castShadow = true;
  shadowLight.shadowDarkness = 0.2;

  backLight = new THREE.DirectionalLight(0xffffff, 0.4);
  backLight.position.set(-100, 200, 50);
  backLight.shadowDarkness = 0.1;
  backLight.castShadow = true;

  scene.add(backLight);
  scene.add(light);
  scene.add(shadowLight);
}

function createFloor() {
  floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1000, 500),
    new THREE.MeshBasicMaterial({
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

Lion = function() {
  this.windTime = 0;
  this.bodyInitPositions = [];
  this.maneParts = [];
  this.threegroup = new THREE.Group();
  this.yellowMat = new THREE.MeshLambertMaterial({
    color: 0xffb10a,
    shading: THREE.FlatShading,
  });
  this.redMat = new THREE.MeshLambertMaterial({
    color: 0xad3525,
    shading: THREE.FlatShading,
  });

  this.pinkMat = new THREE.MeshLambertMaterial({
    color: 0xe55d2b,
    shading: THREE.FlatShading,
  });

  this.whiteMat = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading,
  });

  this.purpleMat = new THREE.MeshLambertMaterial({
    color: 0x451954,
    shading: THREE.FlatShading,
  });

  this.greyMat = new THREE.MeshLambertMaterial({
    color: 0x653f4c,
    shading: THREE.FlatShading,
  });

  this.blackMat = new THREE.MeshLambertMaterial({
    color: 0x302925,
    shading: THREE.FlatShading,
  });

  var head1 = new THREE.BoxGeometry(300, 200, 100);
  var ear1 = new THREE.BoxGeometry(100, 50, 30);
  var ear2 = new THREE.BoxGeometry(100, 50, 30);
  var eye1 = new THREE.BoxGeometry(60, 35, 30);
  var eye2 = new THREE.BoxGeometry(60, 35, 30);

  this.head1 = new THREE.Mesh(head1, this.yellowMat);
  this.ear1 = new THREE.Mesh(ear1, this.pinkMat);
  this.ear2 = new THREE.Mesh(ear2, this.pinkMat);
  this.eye1 = new THREE.Mesh(eye1, this.pinkMat);
  this.eye2 = new THREE.Mesh(eye2, this.pinkMat);

  this.ear1.position.x = 150;
  this.ear1.position.z = 0;
  this.ear1.position.y = 125;

  this.ear2.position.x = -150;
  this.ear2.position.z = 0;
  this.ear2.position.y = 125;

  this.eye1.position.x = 80;
  this.eye1.position.z = 65;
  this.eye1.position.y = 30;

  this.eye2.position.x = -80;
  this.eye2.position.z = 65;
  this.eye2.position.y = 30;

  this.threegroup.add(this.head1);
  this.threegroup.add(this.ear1);
  this.threegroup.add(this.ear2);
  this.threegroup.add(this.eye1);
  this.threegroup.add(this.eye2);

  this.threegroup.traverse(function(object) {
    if (object instanceof THREE.Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
};

function loop() {
  render();
  requestAnimationFrame(loop);
}

function render() {
  if (controls) controls.update();
  renderer.render(scene, camera);
}

init();
createLights();
addGrid();
// createFloor();
createLion();
loop();
