// example 1
interface IClockInterface1 {
  currentTime: Date;
  setTime(d: Date);
}

class Clock1 implements IClockInterface1 {
  currentTime: Date;
  constructor(h: number, m: number) { };
  setTime(d: Date) {
    this.currentTime = d;
  }
}

// example 2 - error
/**
 * This is because when a class implements an interface, only the instance side of the class is checked. Since the constructor sits in the static side, it is not included in this check.
 * */
interface IClockConstructor2 {
  new { hour: number, minute: number };
}


// example 3: work with the static side of class directly
class Clock implements IClockConstructor2 {
  currentTime: Date;
  constructor(h: number, m: number) { }
}

// example 3
interface IClockConstructor3 {
    new (hour: number, minute: number): IClockInterface3;
}

interface IClockInterface3 {
  tick();
}

function createClock(ctor: IClockConstructor3, hour: number, minute: number): IClockInterface3 {
  return new ctor(hour, minute);
}

class DigitalClock implements IClockInterface3 {
  constructor(h: number, m: number) { }
  tick() {
    console.log('beep beep');
  }
}
class AnalogClock implements IClockInterface3 {
  constructor(h: number, m: number) { }
  tick() {
    console.log('tick tock');
  }
}

let digital = createClock(DigitalClock, 13, 17);
let analog = createClock(AnalogClock, 5, 5);
