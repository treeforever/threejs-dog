var tongueZMin = 160;
var tongueZMax = 200;

function moveTongue(z, distancePerSec, moveBackward) {
  if (moveBackward) {
    z += distancePerSec;
    if (z >= tongueZMax) {
      moveBackward = false;
    }
  } else if (!moveBackward) {
    z -= distancePerSec;
    if (z <= tongueZMin) {
      moveBackward = true;
    }
  }
  return { z, moveBackward };
}

// Test 1: when tongue z is 160, and flag is TRUE, z should increase by 1
console.log(
  "when Flag is true and tongue z is 160 ---",
  moveTongue(160, 1, true).z === 161,
  "---",
  moveTongue(160, 1, true).moveBackward === true
);

// Test 2: when tongue z 200, and flag is TRUE, z should increase by 1
console.log(
  "when Flag is true and when tongue z is 200 ---",
  moveTongue(199, 1, true).z === 200,
  "---",
  moveTongue(200, 1, true).moveBackward === false
);

// Test 3: when tongue z 190, and flag is FALSE, z should decrease by 1
console.log(
  "when Flag is false and when tongue z is 190 ---",
  moveTongue(190, 1, false).z === 189,
  "---",
  moveTongue(190, 1, false).moveBackward === false
);

// Test 4: when tongue z 161, and flag is FALSE, z should decrease by 1
console.log(
  "when Flag is false and when tongue z is 161 ---",
  moveTongue(161, 1, false).z === 160,
  "---",
  moveTongue(161, 1, false).moveBackward === true
);
