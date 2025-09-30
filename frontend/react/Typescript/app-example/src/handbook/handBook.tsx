import * as React from 'react';

const handBook = () => {
  /** CLASSES example - begin **/
  // const publicPrivateProtect = () => {
  //   class Animal {
  //       private name: string;
  //       constructor(theName: string) { this.name = theName; }
  //   }

  //   return new Animal("Cat").name;
  // }
  // const staticPropertiesEx = () => {
  //   class Grid {
  //     static origin = {x: 0, y: 0};
  //     calculateDistanceFromOrigin(point: {x: number; y: number;}) {
  //       let xDist = (point.x - Grid.origin.x);
  //       let yDist = (point.y - Grid.origin.y);
  //       return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  //     }

  //     constructor (public scale: number) { }
  //   }

  //   let grid1 = new Grid(1.0);
  //   let grid2 = new Grid(5.0);

  //   console.log('result grid 1:', grid1.calculateDistanceFromOrigin({
  //     x: 10,
  //     y: 10
  //   }))
  //   console.log('result grid 2:', grid2.calculateDistanceFromOrigin({
  //     x: 10,
  //     y: 10
  //   }))
  // }

  // const abstractClassEx = () => {
  //   abstract class Department {
  //     constructor(public name: string) {
  //     }

  //     printName(): void {
  //       console.log('Departmant name: ' + this.name);
  //     }

  //     abstract printMeeting(): void;
  //   }

  //   class AccountingDepartment extends Department {
  //     constructor() {
  //       super('Accounting and Auditing');
  //     }

  //     printMeeting(): void {
  //       console.log('The Accounting Department meets each Monday at 10am');
  //     }

  //     generateReports(): void {
  //       console.log('Generating accounting reports...');
  //     }
  //   }

  //   let department: Department;
  //   // department = new Department(); // error Cannot create an instance of the abstract class 'Department'.
  //   department = new AccountingDepartment();
  //   department.printName();
  //   department.printMeeting();
  //   // department.generateReports(); // error: does not exist on type Department
  // }
  // const advanceTechniques = () => {
  //   class Greeter {
  //     static standardGreeting = "Hello, there";
  //     greeting: string;
  //     greet() {
  //         if (this.greeting) {
  //             return "Hello, " + this.greeting;
  //         }
  //         else {
  //             return Greeter.standardGreeting;
  //         }
  //     }
  //   }

  //   console.log(Greeter);
  //   let greeter1: Greeter;
  //   greeter1 = new Greeter();
  //   console.log(greeter1.greet());

  //   // console.log(typeof Greeter);
  //   let greeterMaker: typeof Greeter = Greeter;
  //   greeterMaker.standardGreeting = "Hey there!";

  //   let greeter2: Greeter = new greeterMaker();
  //   console.log(greeter2.greet());
  // // }
  // const useClassAsInterface = () => {
  //   class Point {
  //     x: number;
  //     y: number;
  //   }

  //   interface Point3d extends Point {
  //     z: number;
  //   }

  //   let point3d: Point3d = { x: 1, y: 3, z: 3};
  //   console.log(point3d);
  // }

  // const usingClassExtend = () => {
  //   class Animal {
  //     name: string;
  //     constructor(theName: string) {
  //       this.name = theName;
  //     }
  //     move(distance: number) {
  //       console.log(`Animal named ${this.name} go ${distance}`);
  //     }
  //   }

  //   class Dog extends Animal {
  //     bark() {
  //       console.log('testing this', this)
  //       console.log(`Dog name ${this.name} say woof!`)
  //     }
  //   }

  //   class Cat extends Animal {
  //     move(distance = 15) {
  //       distance ++;
  //       console.log('testing super', super.move);
  //       super.move(distance);
  //     }
  //   }

  //   let Moly = new Dog('Moly');
  //   Moly.move(5);
  //   Moly.bark();

  //   let Raly = new Cat('Raly');
  //   Raly.move();
  // }
  /** CLASSES example - end **/

  /** FUNCTIONS example - start **/
  // const functionType = () => {
  //   // function named
  //   function add(x: number, y: number) {
  //     return x + y;
  //   }

  //   // an anonymous function
  //   let myAdd = function(x: number, y: number): number { return x + y };

  //   console.log(add(4, 5));
  //   console.log(myAdd(4, 5));

  //   let myAdd2: (x: number, y: number) => number = function(x: number, y: number) { return x + y; }
  //   console.log(myAdd2(4, 5));

  //   let myAdd3: (baseValue: number, increment: number) => number = function(x: number, y: number): number { return x + y; };
  //   console.log(myAdd3(4, 5));

  //   let shortestAdd: (x: number, y: number) => void = (x, y) => x + y;
  //   console.log(shortestAdd(4, 5));
  // }
  // const thisAndArrowFunc = () => {
  //   let deck = {
  //     suits: ["hearts", "spades", "clubs", "diamonds"],
  //     cards: Array(52),
  //     createCardPicker: function(this: any) {
  //         // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
  //         return () => {
  //             let pickedCard = Math.floor(Math.random() * 52);
  //             let pickedSuit = Math.floor(pickedCard / 13);

  //             return {suit: this.suits[pickedSuit], card: pickedCard % 13};
  //         }
  //     }
  //   }

  //   let cardPicker = deck.createCardPicker();
  //   let pickedCard = cardPicker();

  //   alert("card: " + pickedCard.card + " of " + pickedCard.suit);
  // }
  // const thisParameter = () => {
  //   interface Card {
  //     suit: string;
  //     card: number;
  //   }

  //   interface Deck {
  //     suits: string[];
  //     cards: number[];
  //     creatCardPicker(this: Deck): () => Card;
  //   }

  //   let deck: Deck = {
  //     suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  //     cards: Array(52),
  //     creatCardPicker: function(this: Deck) {
  //       return () => {
  //         let pickedCard = Math.floor(Math.random() * 52);
  //         let pickedSuit = Math.floor(pickedCard / 12);

  //         return {
  //           suit: this.suits[pickedSuit],
  //           card: pickedCard % 13,
  //         }
  //       }
  //     }
  //   }

  //   let cardPicker = deck.creatCardPicker();
  //   let pickedCard = cardPicker();
  //   alert('card: ' + pickedCard.card + ' of ' + pickedCard.suit);
  // }
  // const thisParameterInCallback = () => {
  //   class Handler {
  //     info: string;
  //     onClickGood = (e: Event) => {
  //       this.info = 'e.message;'
  //     }
  //   }

  //   let h = new Handler();
  //   // uiElement.addClickListener(h.onClickGood);
  // }
  // const overLoadEx = () => {
  //   let suits = ['hearts', 'spades', 'clubs', 'diamonds'];

  //   function pickCard(x: { suit: string; card: number; }[]): number;
  //   function pickCard(x: number): { suit: string; card: number; };
  //   function pickCard(x: any): any {
  //     if (typeof x === 'object') {
  //       let pickedCard = Math.floor(Math.random() * x.length);
  //       return pickedCard;
  //     } else if (typeof x === 'number') {
  //       let pickedSuit = Math.floor(x / 13);
  //       return {
  //         suit: suits[pickedSuit],
  //         card: x % 13,
  //       };
  //     }
  //   }

  //   let myDeck = [
  //     {
  //       suit: 'diamonds',
  //       card: 2
  //     },
  //     {
  //       suit: 'spades',
  //       card: 4
  //     },
  //     {
  //       suit: 'clubs',
  //       card: 6
  //     },
  //   ];

  //   let pickedCard1 = myDeck[pickCard(myDeck)];
  //   alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

  //   let pickedCard2 = pickCard(14);
  //   alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
  // }
  /** FUNCTIONS example - end **/
  /** GENERICS example - begin **/
  // const helloGenerics = () => {
  //   function identity<T>(arg: T): T {
  //     return arg;
  //   }

  //   let output = identity('My string');
  //   console.log(output);
  // }

  // const genericTypeVariable = () => {
  //   function identity<T>(arg: T): T {
  //     return arg;
  //   }

  //   let myIdentity: <T>(arg: T) => T = identity;

  //   let myIdentity2: <U>(arg: U) => U = identity;
  //   let myIdentity3: {<T>(arg: T): T} = identity;

  //   interface GenericIndentityFn<T> {
  //     (arg: T): T;
  //   }

  //   function identity<T>(arg: T): T {
  //     return arg;
  //   }

  //   let myIdentity: GenericIndentityFn<number> = identity;
  // }
  // const genericClasses = () => {
  //   class GenericNumber<T> {
  //     zeroValue: T;
  //     add: (x: T, y: T) => T;
  //   }

  //   let myGenericNumber = new GenericNumber<number>();
  //   myGenericNumber.zeroValue = 0;
  //   myGenericNumber.add = (x, y) => x + y;

  //   let stringNumberic = new GenericNumber<string>();
  //   stringNumberic.zeroValue = '';
  //   stringNumberic.add = (x, y) => x + y;

  //   console.log('testing myGenericNumber', myGenericNumber);
  //   console.log('testing stringNumberic', stringNumberic);
  //   console.log(stringNumberic.add(stringNumberic.zeroValue, 'test'))
  //   console.log(myGenericNumber.add(myGenericNumber.zeroValue, 6))
  // }
  // const genericConstraint = () => {
  //   interface LengthWise {
  //     length: number;
  //   }

  //   function loggingIdentity<T extends LengthWise>(arg: T): T {
  //     console.log(arg.length);

  //     return arg;
  //   }

  //   loggingIdentity({
  //     length: 4,
  //     value: 5
  //   });
  // }

  // const genericConstraintUseTypeParam = () => {
  //   function getProperty<T, K extends keyof T>(obj: T, key: K) {
  //     return obj[key]
  //   }

  //   let x = {
  //     a: 1,
  //     b: 2,
  //     c: 3
  //   };

  //   getProperty(x, 'a');
  //   // getProperty(x, 'm'); // err
  // }

  // const genericConstraintUseClassType = () => {
  //   // function create<T>(c: {new(): T}): T {
  //   //   return new c();
  //   // }

  //   class BeeKeeper {
  //     hasMask: boolean;
  //   }

  //   class ZooKeeper {
  //     nametag: string;
  //   }

  //   class Animal {
  //     numLegs: number;
  //   }

  //   class Bee extends Animal {
  //     keeper: BeeKeeper;
  //   }

  //   class Lion extends Animal {
  //     keeper: ZooKeeper;
  //   }

  //   function createInstance<A extends Animal>(c: new () => A): A {
  //     return new c();
  //   }

  //   createInstance(Lion).keeper.nametag;
  //   createInstance(Bee).keeper.hasMask;
  // }
  /** GENERICS example - end **/
  /** ADVANCED TYPES example - begin **/
  // const unionTypes = () => {
  //   // example 1
  //   const paddingLeft = (value: string, padding: string | number) => {
  //     if (typeof padding === "number") {
  //         return Array(padding + 1).join(" ") + value;
  //     }
  //     if (typeof padding === "string") {
  //         return padding + value;
  //     }
  //     throw new Error(`Expected string or number, got '${padding}'.`);
  //   }

  //   paddingLeft('Hello world', 'r');
  // }
  // const typeAliasAndInterface = () => {
  //   type Alias = { num: number };
  //   interface Interface { num: number; }

  //   declare function aliased(arg: Alias): Alias;
  //   declare function interfaced(arg: Interface): Interface;
  // }
  const discriminatedUnions = () => {
    const enum EShape {
      Square,
      Rectangle,
      Circle,
    };

    interface Square {
      kind: EShape.Square;
      size: number;
    }

    interface Rectangle {
      kind: EShape.Rectangle;
      width: number;
      height: number;
    }

    interface Circle {
      kind: EShape.Circle;
      radius: number;
    }

    type Shape = Square | Rectangle | Circle;

    function area(s: Shape) {
      switch(s.kind) {
        case EShape.Square:
          return s.size * s.size;
        case EShape.Rectangle:
          return s.height * s.width;
        case EShape.Circle:
          return Math.PI * s.radius ** 2;
      }
    }

    class GreenSquare implements Square {
      kind: EShape.Square = EShape.Square;
      size: number;
      constructor(size: number) {
        this.size = size;
      }
      // logInfo(): void {
      //   console.log(`GreenSquare with kind ${this.kind} and size ${this.size}`);
      // }
    }

    let GreenSquare1 = new GreenSquare(4);
    console.log(area(GreenSquare1));
    // console.log(area(GreenSquare1));
  }
  /** ADVANCED TYPES example - end **/
  return (
    <div>
      <h3>Handbook examples</h3>
      <div>
        {/*<label>classes examples</label>*/}
        {/*<p>example 1: {publicPrivateProtect()}</p>*/}
        {/*<p>example 2: {staticPropertiesEx()}</p>*/}
        {/*<p>example 3: {abstractClassEx()}</p>*/}
        {/*<p>example 4: {advanceTechniques()}</p>*/}
        {/*<p>example 5: {useClassAsInterface()}</p>*/}
        {/*<p>example 6: {usingClassExtend()}</p>*/}

        {/*<label>functions examples</label>*/}
        {/*<p>example 1: {functionType()}</p>*/}
        {/*<p>example 2: {thisAndArrowFunc()}</p>*/}
        {/*<p>example 3: {thisParameter()}</p>*/}
        {/*<p>example 4: {thisParameterInCallback()}</p>*/}
        {/*<p>example 5: {overLoadEx()}</p>*/}

        {/*<label>generics examples</label>*/}
        {/*<p>example "Hello world of Generics" {helloGenerics()}</p>*/}
        {/*<p>example "Generics Type Variables" {genericTypeVariable()}</p>*/}
        {/*<p>example "Generics Classes" {genericClasses()}</p>*/}
        {/*<p>example "Generics Constraint" {genericConstraint()}</p>*/}
        {/*<p>example "Generics Constraint - using type parameters" {genericConstraintUseTypeParam()}</p>*/}
        {/*<p>example "Generics Constraint - using class type" {genericConstraintUseClassType()}</p>*/}

        <label>advanced types examples</label>
        {/*<p>example Union types {unionTypes()}</p>*/}
        {/*<p>example types alias and interface {typeAliasAndInterface()}</p>*/}
        <p>example discriminated unions {discriminatedUnions()}</p>

      </div>
    </div>
  )
}
export default handBook;