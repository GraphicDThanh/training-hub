import { Person } from "./person.model";

const example1: Person = new Person(
  {firstName: "Dolan"});

example1.firstName = "Dylan";
example1.middleName = "God";
example1.lastName = "Hi";

