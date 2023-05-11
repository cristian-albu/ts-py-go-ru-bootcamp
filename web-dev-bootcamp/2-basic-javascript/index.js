// PRIMITIVES
// Initialization
var globalVar;
// Assignment
globalVar = "This is hoisted";

let modifyVar = "This can be modified";

const constVar = "This can't be modified";

const stringVar = "This is a string";
const stringConcatenation = "a" + "b"; // "ab"
const templateLiteral = `This is some text and ${modifyVar}`; // This is some text and This can be modified
const numVar = 35;
const numVar2 = -35.3;

const boolVar = true;

const nullVar = null;
const undefinedVar = undefined;

// OPERATORS

let number5 = 5;
number5 += 1; // 6
number5 -= 1; // 5
number5 *= 2; // 10
number5 /= 2; // 5

// Equality operator

1 == 1; // true
1 == "1"; // true
0 == false; // true
null == undefined; // true
0 == null; // false

// Strict equality operator

1 === "1"; // false
null === undefined; // false

6 > 5; // true
5 >= 5; // true
4 < 4; // false
4 <= 4; // true

// NOT operator

1 != 1; // false
true != false; // true

// AND operator

typeof numVar === "number" && numVar === 35; // true
typeof globalVar === "string" && globalVar === "A string"; // false

// OR operator

let orVar = typeof globalVar === "string" || globalVar === "A string"; // true
let orVar2 = 2 + 2 === 4 || 2 + 2 === 5; // true

// MODULO operator

let moduloVar = 15 % 6; // 3
let moduloTruthy = 15 % 5 === 0; // true

// ------------ARRAYS---------------
// these are objects so you can modify them even if using const because they reference a place in memory not the actual value
// They can be expanded and modified

const arrayVar = [15, 12, 35, "Any kind of value"];
const nestedArrVarr = [15, 35, [28, 17], [["String", true, ["subArray"]]]];

const initializeArray = new Array(5); // [ , , , , ]

arrayVar.length; // 4

// Access values from array

arrayVar[0]; // 15
arrayVar[3]; // "Any kind of value"
arrayVar[4]; // undefined

arrayVar.push("Last element"); // [15, 12, 35, "Any kind of value", "Last element"]
// You can store the popped value in a variable
arrayVar.pop(); // [15, 12, 35, "Any kind of value"];
arrayVar.unshift("Add a new first element"); // ["Add a new first element", 15, 12, 35, "Any kind of value"];
// You can store the shifted element in a variable
arrayVar.shift(); // [15, 12, 35, "Any kind of value"];

// Reasign
arrayVar[2] = "Changed value"; // [15, 12, "Changed value", "Any kind of value"]

typeof arrayVar; // object
Array.isArray(arrayVar); // true

let newArr = [];
let newArr2 = [];
let newArr3 = newArr;

let arrayEquality = newArr === newArr2; // false - does not compare by values
let arrayEquality2 = newArr === newArr3; // true - compares by reference

newArr.push(1);

newArr; // [1]
newArr3; // [1]

// ----------OBJECT LITERALS------------

// Ket value stores. No particular order so there is no index.
const newObj = { key: "value" };
const newObj2 = {
  string: "string",
  number: 5,
  boolean: true,
  random: newArr,
  arr: ["Nested array"],
  obj: { nestedObj: "An object in an object" },
};

newObj.key; // "value"
newObj["key"]; // "value"
newObj2.arr[0]; // "Nested array"

// Reassign
newObj2.string = "Change the string";

typeof newObj; // object

// Create an array from the keys
Object.keys(newObj2); // ['string', 'number', 'boolean', 'random', 'arr', 'obj']
Object.values(newObj2); // 'Change the string', 5, true, [1], ['Nested array'], {nestedObj: "An object in an object"}

// Create a shallow copy

const shallowCopy = Object.assign({}, newObj2);

// Create a deep copy of an Object

const deepCopyObj = JSON.parse(JSON.stringify(newObj2));

// ----------CONTROL FLOW------------

let val = true;
if (val) {
  console.log("Do this");
} else {
  console.log("Do that");
}

if (typeof val === "boolean" && 2 + 2 === 4) {
  console.log("Works");
}

switch (val) {
  case true:
    console.log("Case true");
    break;
  case false:
    console.log("Case false");
    break;
}
// Ternary operator

val === true ? console.log(true) : console.log(false);

const newVal = val ? "If" : "Else"; // "If"

// ---------FUNCTIONS--------------

//Function declaration

function myFunction() {
  console.log("Value");
}

myFunction(); // Value

function myFunction2() {
  return "Value";
}

const myFunc2 = myFunction2();

console.log(myFunction2()); // Value

// An arrow function and a normal function. These are called function expression because they are declared and stored in a variable directly. They are anonymous function (you can see that you don't declare their names, just the variables where they are stored)
const myFunc3 = () => {
  console.log("Value");
};

// Arrow function don't have "this". You will learn a bit later about "this"

const myFunc4 = function () {
  console.log("Value");
};

myFunc3(); // Value
myFunc4(); // Value

// Function declarations are better suited when you need something more complex or if you want to hoist it (use it before declaration).
// Function expression are usually used when you need more flexibility, you want to quickly pass it to another function or you want to immediately invoke it IIFE

function funcWithArgs(num) {
  return num + num;
}

const double = funcWithArgs(5); // 10

function funcWithMultipleArgs(num1, num2) {
  return num1 + num2;
}

const multipleArgs = funcWithMultipleArgs(2, 2); // 4

function funcWithOptionalArgs(arg1, arg2 = "Cristian") {
  console.log(arg1, arg2);
}

funcWithOptionalArgs("Hello"); // Hello Cristian
funcWithOptionalArgs("Hello", "John"); // Hello John

let funcScope = "This is the outer scope";

function scopeFunction() {
  let funcScope = "This is the inner scope";
  console.log(funcScope);
  return funcScope;
}

let getInnverValue = scopeFunction(); // "This is the inner scope"

// Object with functions aka object methods

const objWithFunc = {
  func: () => "I'm a function",
};

console.log(objWithFunc.func()); // I'm a function

const objWithFunction = {
  objVal: "object val",
  func: function () {
    return `returned ${this.objVal}`;
  },
};

console.log(objWithFunction.func()); // returned object val

// return a function

// factory function
function isBetween(min, max) {
  return function (num) {
    return num > min && num < max;
  };
}

const between15and25 = isBetween(15, 25);
console.log(between15and25(17)); // true

const between10and100 = isBetween(10, 100);
console.log(between10and100(7)); // false

// Callbacks: these are function that are will be invoked later

function sayHello(name) {
  return "Hello " + name;
}

function callbackfunc(callback, personName) {
  const name = "Mr. " + personName;
  return callback(name);
}

const exampleCallback = callbackfunc(sayHello, "Cristian");
console.log(exampleCallback); // Hello Mr. Cristian

// Higher order functions (functions as arguments)

function argFunction() {
  return "String";
}

function argFunction2(arg) {
  console.log(arg);
}

argFunction2(argFunction()); // String

// Recursive functions
function recursiveFunction(arg) {
  if (arg >= 10) {
    return;
  }
  arg += 1;
  console.log(arg); // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  recursiveFunction(arg);
}

recursiveFunction(0);

// --------------- LOOPS -------------------

const myArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const iterableObject = { someVal: 1, someOtherVal: 2, otherVal: 3 };

// For loop

for (let i = 0; i < myArr.length; i++) {
  console.log(myArr[i]); // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
}

for (val of myArr) {
  console.log(val); // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
}

for (index in myArr) {
  console.log(index); // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
}

let counter = 0;

while (counter < myArr.length) {
  console.log(myArr[counter]); // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  counter++;
}

// Looping over objects. You can't directly loop over object literals but you can over object keys or object values

for (val of Object.keys(iterableObject)) {
  console.log(val); // someVal, someOtherVal, otherVal
}

for (val in Object.values(iterableObject)) {
  console.log(val); // 0, 1, 2
}

for (val of Object.entries(iterableObject)) {
  console.log(val); // [['someVal', 1], ['someOtherVal', 2], ['otherVal', 3]]
  console.log(val[1]); // 1, 2, 3
}

// --------- OBJECT METHODS-----------
// Most of these you will notice use callback arrow functions (e) => e

// map() iterates over an array and makes a new array. Also works on strings
const myArrCopy = myArr.map((e) => e);
myArrCopy.pop();
console.log(myArr, myArrCopy); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Equivalent of map() in a more traditional way
const myMap = (array) => {
  const outputArray = [];
  for (let i = 0; i < array.length; i++) {
    outputArray.push(array[i]);
  }
  return outputArray;
};

const mappedArr = myMap(myArr);
console.log(mappedArr); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// forEach iterates over just like map but does not return a new array. You can modifiy the original array if you specify the proper arguments

myArrCopy.forEach((e, index, theArray) => (theArray[index] = e * 2));
console.log(myArrCopy);

// filter() returns a new array of filtered items

const filteredArr = myArr.filter((e) => e < 5);
console.log(filteredArr); // [1, 2, 3, 4]

// slice() returns a new array from the specified index to the specified index (args 2) or to the end of the arr if no argument is specified

const sliceOfArr = myArr.slice(5, 7);
const slideOfArr2 = myArr.slice(7);
console.log(sliceOfArr, slideOfArr2); // [6, 7] [8, 9, 10]

// splice()
// arg 1 index to delete/start from, arg 2 number of elements to delete, arg 3 elements to insert
const splicedArr = [1, 3, 4];
splicedArr.splice(1, 0, 2);
// at index 1, remove 0 elements, add 2
console.log(splicedArr); // [1, 2, 3, 4]

// sort()
// Default sorts alphabetically

const toSort1 = [1, 5, 4, 2, 3, -1, -10, -5];
const toSort2 = ["a", "c", "D", "b", "bc"];

console.log(toSort1.sort()); // [-1, -10, -5, 1, 2, 3, 4, 5]
console.log(toSort2.sort()); // ['D', 'a', 'b', 'bc', 'c']

// Can take a function as an argument
toSort1.sort((a, b) => a - b);
console.log(toSort1); // [-10, -5, -1, 1, 2, 3, 4, 5]
toSort1.sort((a, b) => b - a);
console.log(toSort1); // [5, 4, 3, 2, 1, -1, -5, -10]

// reduce()
const arrayOfNums = [1, 2, 3, 4, 5, 6];
const reducedArray = arrayOfNums.reduce(
  (accumulator, currentVal) => accumulator + currentVal,
  (initialValue = 0)
);
console.log(reducedArray); // 21

// indexOf()
// returs the index where you will find the element or -1 if it does not exist
console.log(arrayOfNums.indexOf(2)); // 1

// includes()
console.log(arrayOfNums.includes(2)); // true

// reverse()
console.log([1, 2, 3].reverse()); // [3, 2, 1]

// join()
console.log(["Hello", "World", "and", "welcome"].join("-")); // Hello-World-and-welcome

// toString()
console.log(["Hello", "World"].toString()); // Hello,World

// SPREAD and REST operator an array or object

const anArr = [1, 2, 3];
const anArr2 = [4, 5, 6];
const anArr3 = [...anArr, ...anArr2]; // [1, 2, 3, 4, 5, 6]

const anObj = {
  val: "Text",
  val2: "Text2",
};

const anObj2 = {
  ...anObj,
  val3: "Text3",
};
console.log(anObj2); // {val: "Text", val2: "Text2", val3: "Text3"}

function sum() {
  // arguments is like an array of every argument passed to the function but it has not predefined methods like map or reduce..
  // This is why you can use the rest operator to destructure it
  const args = [...arguments];
  return args.reduce((acc, e) => acc + e);
}

console.log(sum(1, 5, 6, 1, 2, 7, 2)); // 24

// String methods

const myString = "This is my String";

// toLowerCase()

const lower = myString.toLowerCase(); // "this is my string"

const upper = myString.toUpperCase(); // "THIS IS MY STRING"

const replaced = upper.replace("STRING", "text");

console.log(replaced); // THIS IS MY text

const arrFromString = replaced.split(" ");

console.log(arrFromString); // ['THIS', 'IS', 'MY', 'text']

// Destructuring

const strucObject = {
  myName: {
    firstName: "Cristian",
    lastName: "Albu",
  },
  birthday: [2, 5, 1995],
};

const { myName, birthday } = strucObject;
console.log(myName); //{firstName: "Cristian", astName: "Albu"}

console.log(birthday); // [2, 5, 1995]

const [theDay, theMonth, theYear] = birthday;

console.log(theDay, theMonth, theYear); // 2 5 1995
