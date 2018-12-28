// to transfor original dog setups to data types
const transformer = key => {
  const element = dog[key];
  return {
    [key]: {
      width: element.geometry.parameters.width,
      height: element.geometry.parameters.height,
      depth: element.geometry.parameters.depth,
      material: "",
      position: {
        x: element.position.x,
        y: element.position.y,
        z: element.position.z
      }
    }
  };
};

const dogParts = [
  "eyeBall1",
  "eyeBall2",
  "nose",
  "tongue",
  "upperBody",
  "middleBody",
  "bottom",
  "rightBackThigh",
  "rightBackLeg",
  "rightFrontThigh",
  "rightFrontLeg",
  "leftBackThigh",
  "leftBackLeg",
  "leftFrontThigh",
  "leftFrontLeg",
  "leftFrontPaw",
  "rightFrontPaw",
  "tail1",
  "tail2"
];
