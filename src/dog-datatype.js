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
        position: { x: 125, y: 85, z: -135 }
      }
    },
    {
      ear2: {
        width: 15,
        height: 160,
        depth: 100,
        material: "orangeMat",
        position: { x: -125, y: 85, z: -135 }
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
    },
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
  rotation && part.rotation.set(rX, rY, rZ);
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
