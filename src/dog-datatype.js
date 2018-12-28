import { Group, BoxGeometry, Mesh } from "three";
import MATERIAL_MAP from "./material";

export const prototype = {
  headGroup: [
    {
      head1: {
        width: 200,
        height: 100,
        depth: 300,
        material: "yellowMat",
        position: { x: 0, y: 0, z: 0 }
      }
    },
    {
      head2: {
        width: 200,
        height: 80,
        depth: 150,
        material: "yellowMat",
        position: { x: 0, y: 90, z: -75 }
      }
    },
    {
      eye1: {
        width: 40,
        height: 40,
        depth: 10,
        material: "whiteMat",
        position: { x: 50, y: 90, z: 0 }
      }
    },
    {
      eye2: {
        width: 40,
        height: 40,
        depth: 10,
        material: "whiteMat",
        position: { x: -50, y: 90, z: 0 }
      }
    },
    {
      ear1: {
        width: 15,
        height: 160,
        depth: 100,
        material: "orangeMat",
        position: { x: 125, y: 85, z: -135 },
        rotation: { x: -100, y: -100, z: -100 }
      }
    },
    {
      ear2: {
        width: 15,
        height: 160,
        depth: 100,
        material: "orangeMat",
        position: { x: -125, y: 85, z: -135 },
        rotation: { x: -100, y: 100, z: 100 }
      }
    },
    {
      eyeBall1: {
        width: 15,
        height: 15,
        depth: 5,
        material: "blackMat",
        position: { x: 50, y: 90, z: 11 }
      }
    },
    {
      eyeBall2: {
        width: 15,
        height: 15,
        depth: 5,
        material: "blackMat",
        position: { x: -50, y: 90, z: 11 }
      }
    },
    {
      nose: {
        width: 35,
        height: 35,
        depth: 30,
        material: "orangeMat",
        position: { x: 0, y: 45, z: 145 }
      }
    },
    {
      tongue: {
        width: 80,
        height: 20,
        depth: 80,
        material: "pinkMat",
        position: { x: 0, y: -20, z: 160 }
      }
    }
  ],
  body: [
    {
      upperBody: {
        width: 120,
        height: 400,
        depth: 100,
        material: "yellowMat",
        position: { x: 0, y: -200, z: -100 }
      }
    },
    {
      middleBody: {
        width: 160,
        height: 200,
        depth: 300,
        material: "yellowMat",
        position: { x: 0, y: -250, z: -300 }
      }
    },
    {
      bottom: {
        width: 260,
        height: 250,
        depth: 200,
        material: "yellowMat",
        position: { x: 0, y: -225, z: -550 }
      }
    },
    {
      rightBackThigh: {
        width: 50,
        height: 150,
        depth: 100,
        material: "orangeMat",
        position: { x: 165, y: -275, z: -550 }
      }
    },
    {
      rightBackLeg: {
        width: 50,
        height: 50,
        depth: 200,
        material: "orangeMat",
        position: { x: 165, y: -325, z: -400 }
      }
    },
    {
      rightFrontThigh: {
        width: 50,
        height: 150,
        depth: 50,
        material: "orangeMat",
        position: { x: 105, y: -275, z: -100 }
      }
    },
    {
      rightFrontLeg: {
        width: 50,
        height: 50,
        depth: 200,
        material: "orangeMat",
        position: { x: 105, y: -325, z: 0 }
      }
    },
    {
      leftBackThigh: {
        width: 50,
        height: 150,
        depth: 100,
        material: "orangeMat",
        position: { x: -165, y: -275, z: -550 }
      }
    },
    {
      leftBackLeg: {
        width: 50,
        height: 50,
        depth: 200,
        material: "orangeMat",
        position: { x: -165, y: -325, z: -400 }
      }
    },
    {
      leftFrontThigh: {
        width: 50,
        height: 150,
        depth: 50,
        material: "orangeMat",
        position: { x: -105, y: -275, z: -100 }
      }
    },
    {
      leftFrontLeg: {
        width: 50,
        height: 50,
        depth: 200,
        material: "orangeMat",
        position: { x: -105, y: -325, z: 0 }
      }
    },
    {
      leftFrontPaw: {
        width: 7,
        height: 51,
        depth: 30,
        material: "pawMat",
        position: { x: -175, y: -324, z: -314 }
      }
    },
    {
      rightFrontPaw: {
        width: 7,
        height: 51,
        depth: 30,
        material: "pawMat",
        position: { x: 175, y: -324, z: -314 }
      }
    },
    {
      tail1: {
        width: 20,
        height: 20,
        depth: 100,
        material: "orangeMat",
        position: { x: 0, y: -250, z: -700 }
      }
    },
    {
      tail2: {
        width: 80,
        height: 20,
        depth: 20,
        material: "orangeMat",
        position: { x: -50, y: -250, z: -740 }
      }
    }
  ]
};

const getObjectValue = object => {
  const key = Object.keys(object)[0];
  return object[key];
};

const partCreator = element => {
  const { width, height, depth, material, position, rotation } = getObjectValue(
    element
  );

  const box = new BoxGeometry(width, height, depth);
  const part = new Mesh(box, MATERIAL_MAP[material]);
  part.position.set(position.x, position.y, position.z);
  rotation && part.rotation.set(rotation.x, rotation.y, rotation.z);
  return part;
};

const composeParts = element => {
  const group = new Group();
  if (element.length) {
    element.forEach(item => {
      const childGroup = composeParts(item);
      group.add(childGroup);
    });
  } else {
    const part = partCreator(element);
    group.add(part);
  }
  return group;
};

export const dogGenerator = dogData => {
  const keys = Object.keys(dogData);
  const dogGroup = new Group();
  keys
    .map(key => composeParts(dogData[key]))
    .forEach(group => dogGroup.add(group));
  return dogGroup;
};

// Original Code:

// var head1 = new BoxGeometry(200, 100, 300);
// var head2 = new BoxGeometry(200, 80, 150);
// this.head1 = new Mesh(head1, MATERIAL_MAP.yellowMat);
// this.head2 = new Mesh(head2, MATERIAL_MAP.yellowMat);
// this.head2.position.set(0, 90, -75);

// var ear1 = new BoxGeometry(15, 160, 100);
// var ear2 = new BoxGeometry(15, 160, 100);

// this.ear1 = new Mesh(ear1, MATERIAL_MAP.orangeMat);
// this.ear2 = new Mesh(ear2, MATERIAL_MAP.orangeMat);

// this.ear1.position.set(125, 85, -135);
// this.ear2.position.set(-125, 85, -135);

// this.ear1.rotation.set(-100, -100, -100);
// this.ear2.rotation.set(-100, 100, 100);

// this.threegroup.add(this.ear1);
// this.threegroup.add(this.ear2);

// var eye1 = new BoxGeometry(40, 40, 10);
// var eye2 = new BoxGeometry(40, 40, 10);

// this.eye1 = new Mesh(eye1, MATERIAL_MAP.whiteMat);
// this.eye2 = new Mesh(eye2, MATERIAL_MAP.whiteMat);

// this.eye1.position.set(50, 90, 0);
// this.eye2.position.set(-50, 90, 0);

// var eyeBall1 = new BoxGeometry(15, 15, 5);
// var eyeBall2 = new BoxGeometry(15, 15, 5);

// this.eyeBall1 = new Mesh(eyeBall1, MATERIAL_MAP.blackMat);
// this.eyeBall2 = new Mesh(eyeBall2, MATERIAL_MAP.blackMat);

// this.eyeBall1.position.set(50, 90, 11);
// this.eyeBall2.position.set(-50, 90, 11);

// var nose = new BoxGeometry(35, 35, 30);
// this.nose = new Mesh(nose, MATERIAL_MAP.orangeMat);
// this.nose.position.set(0, 45, 145);

// var tongue = new BoxGeometry(80, 20, 80);
// this.tongue = new Mesh(tongue, MATERIAL_MAP.pinkMat);
// this.tongue.position.set(0, -20, 160);

// freckles
// var freckle1 = new BoxGeometry(2, 7, 7);
// this.freckle1 = new Mesh(freckle1, this.pawMat);
// this.freckle1.position.set(40, 25, 120);
// this.threegroup.add(this.freckle1);

// this.headgroup.add(this.tongue);
// this.headgroup.add(this.nose);
// this.headgroup.add(this.eyeBall1);
// this.headgroup.add(this.eyeBall2);
// this.headgroup.add(this.tongue);
// this.headgroup.add(this.eye1);
// this.headgroup.add(this.eye2);
// this.headgroup.add(this.head1);
// this.headgroup.add(this.head2);
// this.headgroup.add(this.ear1);
// this.headgroup.add(this.ear2);

// this.threegroup.add(this.headgroup);

// // body
// var upperBody = new BoxGeometry(120, 400, 100);
// this.upperBody = new Mesh(upperBody, this.yellowMat);
// this.upperBody.position.set(0, -200, -100);
// this.threegroup.add(this.upperBody);

// var middleBody = new BoxGeometry(160, 200, 300);
// this.middleBody = new Mesh(middleBody, this.yellowMat);
// this.middleBody.position.set(0, -250, -300);
// this.threegroup.add(this.middleBody);

// var bottom = new BoxGeometry(260, 250, 200);
// this.bottom = new Mesh(bottom, this.yellowMat);
// this.bottom.position.set(0, -225, -550);
// this.threegroup.add(this.bottom);

// // legs
// // right
// var rightBackThigh = new BoxGeometry(50, 150, 100);
// this.rightBackThigh = new Mesh(rightBackThigh, MATERIAL_MAP.orangeMat);
// this.rightBackThigh.position.set(165, -275, -550);
// this.threegroup.add(this.rightBackThigh);

// var rightBackLeg = new BoxGeometry(50, 50, 200);
// this.rightBackLeg = new Mesh(rightBackLeg, MATERIAL_MAP.orangeMat);
// this.rightBackLeg.position.set(165, -325, -400);
// this.threegroup.add(this.rightBackLeg);

// var rightFrontThigh = new BoxGeometry(50, 150, 50);
// this.rightFrontThigh = new Mesh(rightFrontThigh, MATERIAL_MAP.orangeMat);
// this.rightFrontThigh.position.set(105, -275, -100);
// this.threegroup.add(this.rightFrontThigh);

// var rightFrontLeg = new BoxGeometry(50, 50, 200);
// this.rightFrontLeg = new Mesh(rightFrontLeg, MATERIAL_MAP.orangeMat);
// this.rightFrontLeg.position.set(105, -325, 0);
// this.threegroup.add(this.rightFrontLeg);

// // left
// var leftBackThigh = new BoxGeometry(50, 150, 100);
// this.leftBackThigh = new Mesh(leftBackThigh, MATERIAL_MAP.orangeMat);
// this.leftBackThigh.position.set(-165, -275, -550);
// this.threegroup.add(this.leftBackThigh);

// var leftBackLeg = new BoxGeometry(50, 50, 200);
// this.leftBackLeg = new Mesh(leftBackLeg, MATERIAL_MAP.orangeMat);
// this.leftBackLeg.position.set(-165, -325, -400);
// this.threegroup.add(this.leftBackLeg);

// var leftFrontThigh = new BoxGeometry(50, 150, 50);
// this.leftFrontThigh = new Mesh(leftFrontThigh, MATERIAL_MAP.orangeMat);
// this.leftFrontThigh.position.set(-105, -275, -100);
// this.threegroup.add(this.leftFrontThigh);

// var leftFrontLeg = new BoxGeometry(50, 50, 200);
// this.leftFrontLeg = new Mesh(leftFrontLeg, MATERIAL_MAP.orangeMat);
// this.leftFrontLeg.position.set(-105, -325, 0);
// this.threegroup.add(this.leftFrontLeg);

// // paws
// // left - front - one
// var leftFrontPaw = new BoxGeometry(7, 51, 30);
// this.leftFrontPaw = new Mesh(leftFrontPaw, this.pawMat);
// this.leftFrontPaw.position.set(-115, -324, 87);
// this.threegroup.add(this.leftFrontPaw);

// // left - front - two
// var leftFrontPaw = new BoxGeometry(7, 51, 30);
// this.leftFrontPaw = new Mesh(leftFrontPaw, this.pawMat);
// this.leftFrontPaw.position.set(-95, -324, 87);
// this.threegroup.add(this.leftFrontPaw);

// // left - back - one
// var leftFrontPaw = new BoxGeometry(7, 51, 30);
// this.leftFrontPaw = new Mesh(leftFrontPaw, this.pawMat);
// this.leftFrontPaw.position.set(-155, -324, -314);
// this.threegroup.add(this.leftFrontPaw);

// // left - back - two
// var leftFrontPaw = new BoxGeometry(7, 51, 30);
// this.leftFrontPaw = new Mesh(leftFrontPaw, this.pawMat);
// this.leftFrontPaw.position.set(-175, -324, -314);
// this.threegroup.add(this.leftFrontPaw);

// // right - front - one
// var rightFrontPaw = new BoxGeometry(7, 51, 30);
// this.rightFrontPaw = new Mesh(rightFrontPaw, this.pawMat);
// this.rightFrontPaw.position.set(115, -324, 87);
// this.threegroup.add(this.rightFrontPaw);

// // right - front - two
// var rightFrontPaw = new BoxGeometry(7, 51, 30);
// this.rightFrontPaw = new Mesh(rightFrontPaw, this.pawMat);
// this.rightFrontPaw.position.set(95, -324, 87);
// this.threegroup.add(this.rightFrontPaw);

// // right - back - one
// var rightFrontPaw = new BoxGeometry(7, 51, 30);
// this.rightFrontPaw = new Mesh(rightFrontPaw, this.pawMat);
// this.rightFrontPaw.position.set(155, -324, -314);
// this.threegroup.add(this.rightFrontPaw);

// // right - back - two
// var rightFrontPaw = new BoxGeometry(7, 51, 30);
// this.rightFrontPaw = new Mesh(rightFrontPaw, this.pawMat);
// this.rightFrontPaw.position.set(175, -324, -314);
// this.threegroup.add(this.rightFrontPaw);

// // tail
// var tail1 = new BoxGeometry(20, 20, 100);
// this.tail1 = new Mesh(tail1, MATERIAL_MAP.orangeMat);
// this.tail1.position.set(0, -250, -700);
// this.threegroup.add(this.tail1);

// var tail2 = new BoxGeometry(80, 20, 20);
// this.tail2 = new Mesh(tail2, MATERIAL_MAP.orangeMat);
// this.tail2.position.set(-50, -250, -740);
// this.threegroup.add(this.tail2);
