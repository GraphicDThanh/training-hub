// Readonly properties
interface IPoint {
  readonly x: number;
  readonly y: number;
}

let p1: IPoint = {
  x: 10,
  y: 20,
};
// p1.x = 0;// error

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12;// error
// ro.push(5);// error
// ro.length = 100;//error
// a = ro;//error
a = ro as number[];
