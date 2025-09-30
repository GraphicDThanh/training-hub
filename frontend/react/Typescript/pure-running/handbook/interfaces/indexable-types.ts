// example 1
interface IStringArray {
  [index: number]: string;
}

let myArray: IStringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

// example 2
class Animal {
  public name: string;
}

class Dog extends Animal {
  public breed: string;
}

interface INotOkay {
  // Error: indexing with a numeric string might get you a completely separate type of Animal!
  [x: number]: Dog;
  [x: string]: Animal;
}

// example 3
interface INumberDictionary {
  [index: string]: number;
  length: number; // ok, length is number
  // name: string; // error, the type of name is not subtype of the indexder
}

// example 4
interface IReadOnlyStringArray {
  readonly [index: number]: string;
}

let myArray2: IReadOnlyStringArray = ["Alice", "Bob"];
myArray2[2] = "Thanh";
console.log('testing myArray', myArray2);
