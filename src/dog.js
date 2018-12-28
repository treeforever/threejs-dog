import {
  Mesh,
  MeshBasicMateria,
  Group,
  MeshLambertMaterial,
  BoxGeometry
} from "three";
import MATERIAL_MAP from "./material";
import { dogGenerator, prototype } from "./dog-datatype";

export function Dog() {
  this.group = dogGenerator(prototype);

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
  this.group.headgroup.rotation.x = tHeadRotX;
  this.group.headgroup.rotation.y = tHeadRotY;

  const { tEyeBall1PoX, tEyeBall1PoY, tEyeBall2PoX, tEyeBall2PoY } = moveEyes(
    xTarget,
    yTarget
  );
  this.group.headgroup.eyeBall1.position.x = tEyeBall1PoX;
  this.group.headgroup.eyeBall1.position.y = tEyeBall1PoY;
  this.group.headgroup.eyeBall2.position.x = tEyeBall2PoX;
  this.group.headgroup.eyeBall2.position.y = tEyeBall2PoY;
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
