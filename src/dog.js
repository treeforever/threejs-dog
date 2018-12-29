import {
  Mesh,
  MeshBasicMateria,
  Group,
  MeshLambertMaterial,
  BoxGeometry
} from "three";
import MATERIAL_MAP from "./material";
import { initialState } from "./initialState";

const partCreator = element => {
  const { width, height, depth, material, position, rotation } = element;

  const box = new BoxGeometry(width, height, depth);
  const part = new Mesh(box, MATERIAL_MAP[material]);
  part.position.set(position.x, position.y, position.z);
  rotation && part.rotation.set(rotation.x, rotation.y, rotation.z);
  return part;
};

const genAllParts = dogData => {
  const parts = {};
  for (let k in dogData) {
    parts[k] = partCreator(dogData[k]);
  }

  return parts;
};

function groupParts(parts) {
  const g = new Group();
  for (let k in parts) {
    g.add(parts[k]);
  }
  return g;
}

export function Dog() {
  const parts = genAllParts(initialState);
  Object.assign(this, parts);

  this.group = groupParts(parts);

  // don't care now
  // this.threegroup.traverse(function(object) {
  //   if (object instanceof Mesh) {
  //     object.castShadow = true;
  //     object.receiveShadow = true;
  //   }
  // });

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
  // this.group.headgroup.rotation.x = tHeadRotX;
  // this.group.headgroup.rotation.y = tHeadRotY;

  const { tEyeBall1PoX, tEyeBall1PoY, tEyeBall2PoX, tEyeBall2PoY } = moveEyes(
    xTarget,
    yTarget
  );
  this.eyeBall1.position.x = tEyeBall1PoX;
  this.eyeBall1.position.y = tEyeBall1PoY;
  this.eyeBall2.position.x = tEyeBall2PoX;
  this.eyeBall2.position.y = tEyeBall2PoY;

  // console.log("☄️️️️", this.eyeBall1.position.x);
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
    // console.log("☄️️️️", this.tongueMoving, this.tongue.position.z, 1 / speed);
    updateTonguePosition(this.tongue.position.z, 1 / speed);
  }
};
