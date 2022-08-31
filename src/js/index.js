const objA = { x: 1, y: 2 };
const objB = { y: 5, z: 7 };
const objC = {};

console.log('objA:', objA);
console.log('objB:', objB);

for (const key in objA) {
  if (objA.hasOwnProperty(key)) {
    const element = objA[key];
    console.log('key:', key);
    console.log('element:', element);
  }
}
