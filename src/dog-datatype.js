import { Group, BoxGeometry, Mesh } from "three";

const prototype = {
  headGroup: [
    {
      eye1: {
        length: 40,
        width: 40,
        height: 10,
        material: "whiteMat",
        position: {
          x: 50,
          y: 90,
          z: 0
        }
      },
      eye2: {
        length: 40,
        width: 40,
        height: 10,
        material: "whiteMat",
        position: {
          x: -50,
          y: 90,
          z: 0
        }
      }
    }
  ]
};

// map over keys. if it is an array then add to a group, each element needs to be generated.

const partCreator = element => {
  const {
    length,
    width,
    height,
    material,
    position: { x, y, z },
    rotation: { x: rX, y: rY, z: rZ }
  } = element;
  const box = new BoxGeometry(length, width, height);
  const part = new Mesh(box, material);
  part.position.set(x, y, z);
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

const dogGenerator = dogData => {
  const keys = Object.keys(dogData);
  const dogGroup = keys.map(key => composeParts(dogData[key]));
  return dogGroup;
};
