interface ICounter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): ICounter {
  const counter = ((start: number) => { }) as ICounter;
  counter.interval = 123;
  counter.reset = () => { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
