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

export function Dog() {
  this.windTime = 0;
  this.bodyInitPositions = [];
  this.maneParts = [];
  this.threegroup = new Group();
  this.headgroup = new Group();
  this.yellowMat = new MeshLambertMaterial({
    color: 0xffd177
    // shading: FlatShading,
  });
  this.redMat = new MeshLambertMaterial({
    color: 0xad3525
    // shading: FlatShading,
  });

  this.orangeMat = new MeshLambertMaterial({
    color: 0xf78800
    // shading: FlatShading,
  });

  this.lightorangeMat = new MeshLambertMaterial({
    color: 0xffd177
    // shading: FlatShading,
  });

  this.whiteMat = new MeshLambertMaterial({
    color: 0xffffff
    // shading: FlatShading,
  });

  this.purpleMat = new MeshLambertMaterial({
    color: 0x451954
    // shading: FlatShading,
  });

  this.greyMat = new MeshLambertMaterial({
    color: 0x653f4c
    // shading: FlatShading,
  });

  this.blackMat = new MeshLambertMaterial({
    color: 0x302925
    // shading: FlatShading,
  });

  this.pinkMat = new MeshLambertMaterial({
    color: 0xf77d65
    // shading: FlatShading,
  });

  this.pawMat = new MeshLambertMaterial({
    color: 0x704515
    // shading: FlatShading,
  });

  var head1 = new BoxGeometry(200, 100, 300);
  var head2 = new BoxGeometry(200, 80, 150);
  this.head1 = new Mesh(head1, this.yellowMat);
  this.head2 = new Mesh(head2, this.yellowMat);
  this.head2.position.set(0, 90, -75);

  var ear1 = new BoxGeometry(15, 160, 100);
  var ear2 = new BoxGeometry(15, 160, 100);

  this.ear1 = new Mesh(ear1, this.orangeMat);
  this.ear2 = new Mesh(ear2, this.orangeMat);

  this.ear1.position.set(125, 85, -135);
  this.ear2.position.set(-125, 85, -135);

  this.ear1.rotation.set(-100, -100, -100);
  this.ear2.rotation.set(-100, 100, 100);

  this.threegroup.add(this.ear1);
  this.threegroup.add(this.ear2);

  var eye1 = new BoxGeometry(40, 40, 10);
  var eye2 = new BoxGeometry(40, 40, 10);

  this.eye1 = new Mesh(eye1, this.whiteMat);
  this.eye2 = new Mesh(eye2, this.whiteMat);

  this.eye1.position.set(50, 90, 0);
  this.eye2.position.set(-50, 90, 0);

  var eyeBall1 = new BoxGeometry(15, 15, 5);
  var eyeBall2 = new BoxGeometry(15, 15, 5);

  this.eyeBall1 = new Mesh(eyeBall1, this.blackMat);
  this.eyeBall2 = new Mesh(eyeBall2, this.blackMat);

  this.eyeBall1.position.set(50, 90, 11);
  this.eyeBall2.position.set(-50, 90, 11);

  var nose = new BoxGeometry(35, 35, 30);
  this.nose = new Mesh(nose, this.orangeMat);
  this.nose.position.set(0, 45, 145);

  var tongue = new BoxGeometry(80, 20, 80);
  this.tongue = new Mesh(tongue, this.pinkMat);
  this.tongue.position.set(0, -20, 160);

  // freckles
  // var freckle1 = new BoxGeometry(2, 7, 7);
  // this.freckle1 = new Mesh(freckle1, this.pawMat);
  // this.freckle1.position.set(40, 25, 120);
  // this.threegroup.add(this.freckle1);

  this.headgroup.add(this.tongue);
  this.headgroup.add(this.nose);
  this.headgroup.add(this.eyeBall1);
  this.headgroup.add(this.eyeBall2);
  this.headgroup.add(this.tongue);
  this.headgroup.add(this.eye1);
  this.headgroup.add(this.eye2);
  this.headgroup.add(this.head1);
  this.headgroup.add(this.head2);
  this.headgroup.add(this.ear1);
  this.headgroup.add(this.ear2);

  this.threegroup.add(this.headgroup);

  // body
  var upperBody = new BoxGeometry(120, 400, 100);
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
  this.rightBackThigh = new Mesh(rightBackThigh, this.orangeMat);
  this.rightBackThigh.position.set(165, -275, -550);
  this.threegroup.add(this.rightBackThigh);

  var rightBackLeg = new BoxGeometry(50, 50, 200);
  this.rightBackLeg = new Mesh(rightBackLeg, this.orangeMat);
  this.rightBackLeg.position.set(165, -325, -400);
  this.threegroup.add(this.rightBackLeg);

  var rightFrontThigh = new BoxGeometry(50, 150, 50);
  this.rightFrontThigh = new Mesh(rightFrontThigh, this.orangeMat);
  this.rightFrontThigh.position.set(105, -275, -100);
  this.threegroup.add(this.rightFrontThigh);

  var rightFrontLeg = new BoxGeometry(50, 50, 200);
  this.rightFrontLeg = new Mesh(rightFrontLeg, this.orangeMat);
  this.rightFrontLeg.position.set(105, -325, 0);
  this.threegroup.add(this.rightFrontLeg);

  // left
  var leftBackThigh = new BoxGeometry(50, 150, 100);
  this.leftBackThigh = new Mesh(leftBackThigh, this.orangeMat);
  this.leftBackThigh.position.set(-165, -275, -550);
  this.threegroup.add(this.leftBackThigh);

  var leftBackLeg = new BoxGeometry(50, 50, 200);
  this.leftBackLeg = new Mesh(leftBackLeg, this.orangeMat);
  this.leftBackLeg.position.set(-165, -325, -400);
  this.threegroup.add(this.leftBackLeg);

  var leftFrontThigh = new BoxGeometry(50, 150, 50);
  this.leftFrontThigh = new Mesh(leftFrontThigh, this.orangeMat);
  this.leftFrontThigh.position.set(-105, -275, -100);
  this.threegroup.add(this.leftFrontThigh);

  var leftFrontLeg = new BoxGeometry(50, 50, 200);
  this.leftFrontLeg = new Mesh(leftFrontLeg, this.orangeMat);
  this.leftFrontLeg.position.set(-105, -325, 0);
  this.threegroup.add(this.leftFrontLeg);

  // paws
  // left - front - one
  var leftFrontPaw = new BoxGeometry(7, 51, 30);
  this.leftFrontPaw = new Mesh(leftFrontPaw, this.pawMat);
  this.leftFrontPaw.position.set(-115, -324, 87);
  this.threegroup.add(this.leftFrontPaw);

  // left - front - two
  var leftFrontPaw = new BoxGeometry(7, 51, 30);
  this.leftFrontPaw = new Mesh(leftFrontPaw, this.pawMat);
  this.leftFrontPaw.position.set(-95, -324, 87);
  this.threegroup.add(this.leftFrontPaw);

  // left - back - one
  var leftFrontPaw = new BoxGeometry(7, 51, 30);
  this.leftFrontPaw = new Mesh(leftFrontPaw, this.pawMat);
  this.leftFrontPaw.position.set(-155, -324, -314);
  this.threegroup.add(this.leftFrontPaw);

  // left - back - two
  var leftFrontPaw = new BoxGeometry(7, 51, 30);
  this.leftFrontPaw = new Mesh(leftFrontPaw, this.pawMat);
  this.leftFrontPaw.position.set(-175, -324, -314);
  this.threegroup.add(this.leftFrontPaw);

  // right - front - one
  var rightFrontPaw = new BoxGeometry(7, 51, 30);
  this.rightFrontPaw = new Mesh(rightFrontPaw, this.pawMat);
  this.rightFrontPaw.position.set(115, -324, 87);
  this.threegroup.add(this.rightFrontPaw);

  // right - front - two
  var rightFrontPaw = new BoxGeometry(7, 51, 30);
  this.rightFrontPaw = new Mesh(rightFrontPaw, this.pawMat);
  this.rightFrontPaw.position.set(95, -324, 87);
  this.threegroup.add(this.rightFrontPaw);

  // right - back - one
  var rightFrontPaw = new BoxGeometry(7, 51, 30);
  this.rightFrontPaw = new Mesh(rightFrontPaw, this.pawMat);
  this.rightFrontPaw.position.set(155, -324, -314);
  this.threegroup.add(this.rightFrontPaw);

  // right - back - two
  var rightFrontPaw = new BoxGeometry(7, 51, 30);
  this.rightFrontPaw = new Mesh(rightFrontPaw, this.pawMat);
  this.rightFrontPaw.position.set(175, -324, -314);
  this.threegroup.add(this.rightFrontPaw);

  // tail
  var tail1 = new BoxGeometry(20, 20, 100);
  this.tail1 = new Mesh(tail1, this.orangeMat);
  this.tail1.position.set(0, -250, -700);
  this.threegroup.add(this.tail1);

  var tail2 = new BoxGeometry(80, 20, 20);
  this.tail2 = new Mesh(tail2, this.orangeMat);
  this.tail2.position.set(-50, -250, -740);
  this.threegroup.add(this.tail2);

  // don't care now
  this.threegroup.traverse(function(object) {
    if (object instanceof Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  this.tongueMoving = true;
  this.moveBackward = true;
}

function rule3(v, vmin, vmax, tmin, tmax) {
  var nv = Math.max(Math.min(v, vmax), vmin);
  var dv = vmax - vmin;
  var pc = (nv - vmin) / dv;
  var dt = tmax - tmin;
  var tv = tmin + pc * dt;
  return tv;
}

function moveEyes(xTarget, yTarget) {
  var tEyeBall1PoX = rule3(xTarget, 37.5, 62.5, 37.5, 62.5);
  var tEyeBall1PoY = rule3(-yTarget, 77.5, 102.5, 77.5, 102.5);

  var tEyeBall2PoX = rule3(xTarget, -62.5, -37.5, -62.5, -37.5);
  var tEyeBall2PoY = rule3(-yTarget, 77.5, 102.5, 77.5, 102.5);
  return { tEyeBall1PoX, tEyeBall1PoY, tEyeBall2PoX, tEyeBall2PoY };
}

function moveHead(xTarget, yTarget) {
  var tHeadRotY = rule3(xTarget, -200, 200, -Math.PI / 8, Math.PI / 8); // rotation Y calcution involves X
  var tHeadRotX = rule3(yTarget, -200, 200, -Math.PI / 8, Math.PI / 8); // rotation X calcution involves Y
  return { tHeadRotY, tHeadRotX };
}

Dog.prototype.moveWithCursor = function(xTarget, yTarget) {
  const { tHeadRotY, tHeadRotX } = moveHead(xTarget, yTarget);
  this.headgroup.rotation.x = tHeadRotX;
  this.headgroup.rotation.y = tHeadRotY;

  const { tEyeBall1PoX, tEyeBall1PoY, tEyeBall2PoX, tEyeBall2PoY } = moveEyes(
    xTarget,
    yTarget
  );
  this.eyeBall1.position.x = tEyeBall1PoX;
  this.eyeBall1.position.y = tEyeBall1PoY;
  this.eyeBall2.position.x = tEyeBall2PoX;
  this.eyeBall2.position.y = tEyeBall2PoY;
};

const TONGUE_Z_MIN = 160;
const TONGUE_Z_MAX = 200;

Dog.prototype.maybeMoveTongue = function(speed) {
  const updateTonguePosition = (z, distancePerSecond) => {
    if (this.moveBackward) {
      z = z + distancePerSecond;
      if (z >= TONGUE_Z_MAX) {
        this.moveBackward = false;
      }
    } else if (!this.moveBackward) {
      z = z - distancePerSecond;
      if (z <= TONGUE_Z_MIN) {
        this.moveBackward = true;
      }
    }

    this.tongue.position.z = z;
  };
  if (this.tongueMoving) {
    updateTonguePosition(this.tongue.position.z, 1 / speed);
  }
};
