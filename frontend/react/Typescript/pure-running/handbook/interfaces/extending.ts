// example 1
interface IShape {
  color: string;
}

interface ISquare extends IShape {
  sideLength: number;
}

let square = {} as ISquare;
square.color = "blue";
square.sideLength = 10;

// example 2
interface IPenStroke {
  penWidth: number;
}

interface ISquare2 extends IShape, IPenStroke {
  sideLength: number;
}

let square2 = {} as ISquare2;
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;

