// @ts-check
import { Bear } from './bear.model';
import { Animal } from './animal.model';



const bear = new Bear({name: 'July', tail: true});
bear.claws = 5;
// bear.tail = 3; //not allow
bear.add(1, 3);
// bear.addTwo(1, 3); // not allow
const animal = new Animal({type: bear});
