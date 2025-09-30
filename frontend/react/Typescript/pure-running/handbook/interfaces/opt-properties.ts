// Example: Optional Properties
interface ISquareConfig {
  color?: string;
  width?: number;
  // [propName: string]: any;
}

function createSquare(config: ISquareConfig): {color: string; area: number} {
  const newSquare = {
    area: 100,
    color: "white",
  };

  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width;
  }

  return newSquare;
}

let squareOpts = {
  colour: "black",
};
let mySquare = createSquare(squareOpts);

// console.log('testing mySquare', mySquare);
