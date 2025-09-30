
// // OOP
// // models behind the 
// // Console.WriteLine("Hello World!");
// using System;

// namespace MyNamespace
// {
//     public class MyApp
//     {
//         public static void Main()
//         {
//             Console.WriteLine("Hello World!");
//         }
//     }
// }

// // basic OOP
// var p1 = new Person("Felipe", "Silva", new DateOnly(1989, 10, 10));
// var p2 = new Person("Ana", "Silva", new DateOnly(1989, 1, 10));

// List<Person> people = [p1, p2];

// Console.WriteLine(people.Count);

// public class Person(string firstname, string lastname, DateOnly birthday)
// {
//     public string First { get; } = firstname;
//     public string Last { get; } = lastname;
//     public DateOnly Birthday { get; } = birthday;
// }

// abstract class, override
using Internal;
using System;
using System.Collections.Generic;

var p1 = new Person("Felipe", "Silva", new DateOnly(1989, 10, 10));
var p2 = new Person("Ana", "Silva", new DateOnly(1989, 1, 10));

p1.Pets.Add(new Cat("Mittens"));
p1.Pets.Add(new Dog("Fido"));

p2.Pets.Add(new Dog("Fido"));

List<Person> people = [p1, p2];

foreach (var person in people)
{
    Console.WriteLine($"{person}");
    foreach (var pet in person.Pets)
    {
        Console.WriteLine($"{pet}");
    }
}

public class Person(string firstname, string lastname, DateOnly birthday)
{
    public string First { get; } = firstname;
    public string Last { get; } = lastname;
    public DateOnly Birthday { get; } = birthday;
    public List<Pet> Pets { get; } = new();

    public override string ToString() => $"Human {First} {Last}";
}

public abstract class Pet(string firstname)
{
    public string First { get; } = firstname;
    public abstract string MakeNoice();
    public override string ToString() => $"{First} and I am a {GetType().Name} and I make {MakeNoice()}.";
}

public class Cat(string firstname) : Pet(firstname)
{
    public override string MakeNoice() => "Meow";
}


public class Dog(string firstname) : Pet(firstname)
{
    public override string MakeNoice() => "Bark";
}