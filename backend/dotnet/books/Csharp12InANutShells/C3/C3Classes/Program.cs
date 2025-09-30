using System.Text;
using C3Classes;

Console.WriteLine("Syntax");
Console.WriteLine("---------- start ----------\n");

Console.WriteLine("- Examples");
// Ex 1: Field
// Octopus

// Ex 2: constants
// TestConstantAndReadOnly

// Ex 3: methods
// Bar

// Ex 4: Instance Constructor
Panda p = new("Petey"); // call constructor

// 4.2 overload constructor
Wine w1 = new(10, 1990);
Console.WriteLine(w1.Price);
Console.WriteLine(w1.Year);

// 4.3 constructor & field initialization order
Panda43 p43 = new("Petey", 3);
Console.WriteLine(p43.name);  // Petey
Console.WriteLine(p43.age);  // 3

// 4.4 nonpublic constructor
// Class1 c1 = new Class1("Thanh"); // error as protection level
Class44 c1 = Class44.Create("Thanh"); // have to call to custom create instance
Console.WriteLine(c1.Name); // prefix-Thanh

Console.WriteLine("-----------------------------");
Console.WriteLine("- Deconstructor");
// Ex 5: Deconstructor
var rect = new DeconstructRectangle(3, 4);
(float width, float height) = rect; // deconstruction
Console.WriteLine(width + " " + height);
// or 
(var width1, var height1) = rect;
Console.WriteLine(width1 + " " + height1);
// or
var (width2, height2) = rect;
Console.WriteLine(width2 + " " + height2);
// or
float width3, height3;
(width3, height3) = rect;
Console.WriteLine(width3 + " " + height3);
// or
//double x1 = 0;
//(x1, double y2) = rect;
//Console.WriteLine(x1 + " " + y2);

// equal to:
float w, h;
rect.Deconstruct(out w, out h);
// or
rect.Deconstruct(out var w2, out var h2);

Console.WriteLine("-----------------------------");
Console.WriteLine("- Object initializer");
// 6.1
ObjectInitializerBunny b1 = new() { Name = "Bo", LikesCarrots = true, LikesHumans = false };
ObjectInitializerBunny b2 = new("Bo") { LikesCarrots = true, LikesHumans = false };

// behind the scene - temporary variable to ensure full-initialization object
// ObjectInitializerBunny temp1 = new ObjectInitializerBunny();
// temp1.Name = "Bo";
// temp1.LikesCarrots = true;
// temp1.LikesHumans = false;
// ObjectInitializerBunny b1 = temp1;

// ObjectInitializerBunny temp2 = new ObjectInitializerBunny();
// temp2.Name = "Bo";
// temp2.LikesCarrots = true;
// temp2.LikesHumans = false;
// ObjectInitializerBunny b2 = temp2;

// 6.2: optional parameters in constructor
ObjectInitializerBunny2 b3 = new(name: "Bo", likesCarrots: true);

Console.WriteLine("-----------------------------");
Console.WriteLine("- this Reference");
// 1
ThisReferencePanda p1 = new("p1");
ThisReferencePanda p2 = new("p2");
p2.Marry(p1);
Console.WriteLine(p1.Mate.Name);
Console.WriteLine(p2.Mate.Name);

// 2
TestThisReference t1 = new("Test");
Console.WriteLine(t1.name);

Console.WriteLine("-----------------------------");
Console.WriteLine("- Properties");
// 1:
Stock msft = new()
{
    CurrentPrice = 30
};
msft.CurrentPrice -= 3;
Console.WriteLine(msft.CurrentPrice);

// 2: calculated properties, expression-bodied property
Stock82 msft82 = new(10, 20);
Console.WriteLine(msft82.Worth); // 200
Console.WriteLine(msft82.Worth2); // 200
msft82.Worth3 = 40;
Console.WriteLine(msft82.sharesOwned); // 4

// 3: automatic properties
Stock83 msft83 = new()
{
    CurrentPrice = 10
};
Console.WriteLine(msft83.CurrentPrice);

// 4: get and set accessibility
// a public property with internal access modifier
Foo84 f = new();
f.SetX();
Console.WriteLine(f.X);

// 5 init-only setters
var note = new Note85 { Pitch = 50 };
Console.WriteLine(note.Pitch);
// note.Pitch = 10; // error init-only setter

// above similar to read-only with populate via constructor
// this version make versioning difficult on adding opt params on constructor
// break binary compatibility with consumers
var note851 = new Note851();
Console.WriteLine(note851.Pitch);

// init with implement
Note852 n = new();
Console.WriteLine(n.Pitch); // 20

Console.WriteLine("-----------------------------");
Console.WriteLine("- string index");
string s = "Hello";
Console.WriteLine(s[0]); // H
Console.WriteLine(s[3]); // l

// Ex2: index can be call null-conditionally with ?
string? s1 = null;
Console.WriteLine(s1?[0]);

// Ex 3: implement an indexer
// IndexSentence
IndexSentence s2 = new();
Console.WriteLine(s2[3]); // fox
s2[3] = "kangaroo";
Console.WriteLine(s2[3]); // kangaroo

// Ex 4: indices, range with indexers
IndexSentenceIndicesRange s3 = new();
Console.WriteLine(s3[^1]); // fox
string[] firstTwoWords = s3[..2]; // (The, quick)
Console.WriteLine(firstTwoWords);
foreach (string c in firstTwoWords)
{
    Console.WriteLine(c);
}

Console.WriteLine("-----------------------------");
Console.WriteLine("- Primary Constructor");
// // Ex 5: Primary constructors (C# 12)
// // 5.1 primary constructor
// var pp = new PersonPrimaryConstructor ("Alice", "Jones");
// pp.Print();

// // 5.2 explicit constructor
// var p = new PersonExplicitConstructor ("Alice", "Jones");
// p.Print();

// // 5.3 both primary constructor and explicit constructor
// var p3 = new PersonPrimaryAndExplicitConstructor(
//     "Alice", "Jones", 12
// );
// p3.Print();

// // 5.4 assign field, property to primary constructor parameters
// var p4 = new PersonPrimaryConstructorAndFieldPropertyInit("Name1", "Name2");
// p4.Print();

// // 5.5 field, property can reuse primary constructor parameters
// var p5 = new PersonPrimaryConstructorAndReuseParamsName("P5 Name1", "P5 Name2");
// p5.Print();

// // 5.6 Validation primary constructor parameters
// var p6 = new PersonWithFullName("First Name", "Last Name");
// p6.Print();
// var p7 = new PersonWithLastNameUpper("First Name 7", "Last Name 7");
// p7.Print();

// Unhandled exception. System.NullReferenceException: Object reference not set to an instance of an object.
// var p8 = new PersonWithLastNameUpper("First Name 8", null);
// Throw custom exception 'lastName'
// var p9 = new PersonWithLastNameUpperExceptionHandle("First Name 9", null);

//var p10 = new PersonPrimaryConstructorWithLastNamePropertyGetSet("First Name 10", "Last Name 10");
//Console.WriteLine(p10.LastName);
//p10.LastName = "last name 1000";
//p10.Print();
// p10.LastName = null;
// Console.WriteLine (p10.LastName);

// var p11 = new PersonPrimaryConstructorWithLastNamePropertyGetSet("First Name 10", null);
// p11.LastName = "LAST NAME 11";
// p11.Print();

Console.WriteLine("-----------------------------");
Console.WriteLine("- Static Constructor");
Console.WriteLine("Chapter 3 - Class - Static Constructor");
// Ex1: static constructor execute one per type
var a = new TestStaticConstructor();
var b = new TestStaticConstructor();

// Ex 2: order run static constructor and field initialization
//Console.WriteLine(FooOrderStaticConstructorAndFieldInitialization.X); // 0
//Console.WriteLine(FooOrderStaticConstructorAndFieldInitialization.Y); // 3

//Console.WriteLine("-----------------------------");
//Console.WriteLine("- Finalizers");
//var f = new FooWithFinalizer();

Console.WriteLine("-----------------------------");
Console.WriteLine("- PartialTypesAndMethods");
// Ex 1: Partial Type
// // PaymentFormGen.cs - auto-generated
// partial class PaymentForm {...}
// // PaymentForm.cs - hand-authored
// partial class PaymentForm {...}

// Ex 2: Partial method
// partial class PaymentForm // In auto-generated file
// {
//     // ...
//     partial void ValidatePayment (decimal amount);
// }

// partial class PaymentForm // In hand-authored file
// {
//     // ...
//     partial void ValidatePayment (decimal amount) 
//     {
//         if (amount > 100) {
//             // ...
//         }
//     }
// }

// Ex 3: Partial extend method
// public partial class Test
// {
//     public partial void M1(); // Extended partial method
//     private partial void M2(); // Extended partial method
// }

// allow out modifier
// public partial class Test 
// {
//     public partial bool IsValid (string identifier);
//     internal partial bool TryParse (string number, out int result);
// }

Console.WriteLine("-----------------------------");
Console.WriteLine("- The NameOf Operator");
int count = 123;
string name = nameof(count); // name is "count"
Console.WriteLine(name);

string name2 = nameof(StringBuilder.Length);
Console.WriteLine(name2);
Console.WriteLine($"{nameof(StringBuilder)}.{nameof(StringBuilder.Length)}");

Console.WriteLine("\n---------- end ------------");

namespace C3Classes
{
    public class Panda
    {
        string name; // define field
                     // public Panda (string n) // define constructor
                     // {
                     //     name = n; // initialization code
                     // }

        // shorter
        public Panda(string n) => name = n;
    }

    public class Wine
    {
        public decimal Price;
        public int Year;
        public Wine(decimal price) => Price = price;
        public Wine(decimal price, int year) : this(price) => Year = year;
    }

    public class Panda43
    {
        public string name = "Panda"; // initialization first
        public int age = 1; // initialization second

        public Panda43(string n, int m) // constructor thirth
        {
            Console.WriteLine(this.name); // Panda
            Console.WriteLine(this.age);  // 1
            name = n;
            age = m;
        }
    }

    public class Class44
    {
        public string Name = "Name";
        Class44(string name)
        { // private constructor
            Name = name;
        }

        public static Class44 Create(string name)
        {
            name = $"prefix-{name}";
            return new Class44(name);
        }
    }

    class DeconstructRectangle
    {
        public readonly float Width, Height;

        public DeconstructRectangle(float width, float height)
        {
            Width = width;
            Height = height;
        }

        public void Deconstruct(out float width, out float height)
        {
            width = Width;
            height = Height;
        }
    }

    public class ObjectInitializerBunny
    {
        public string Name;
        public bool LikesCarrots, LikesHumans;

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public ObjectInitializerBunny() { }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        public ObjectInitializerBunny(string n) => Name = n;
    }

    public class ObjectInitializerBunny2
    {
        public string Name;
        public bool LikesCarrots, LikesHumans;

        public ObjectInitializerBunny2(string name, bool likesCarrots = false, bool likeHumans = false)
        {
            Name = name;
            LikesCarrots = likesCarrots;
            LikesHumans = likeHumans;
        }
    }

    public class ThisReferencePanda
    {
        public string Name;
        public ThisReferencePanda Mate;

        public ThisReferencePanda(string n) => Name = n;

        public void Marry(ThisReferencePanda partner)
        {
            Mate = partner;
            partner.Mate = this;
        }
    }

    public class TestThisReference
    {
        public string name;

        // error cannot access with instance reference
        // static public string name; 
        public TestThisReference(string name) => this.name = name;
    }

    public class Stock
    {
        decimal currentPrice; // the private "backing" field

        public decimal CurrentPrice // the public property
        {
            get { return currentPrice; }
            set { currentPrice = value; }
        }
    }

    public class Stock82
    {
        public decimal currentPrice, sharesOwned;
        public Stock82(decimal p, decimal s)
        {
            currentPrice = p;
            sharesOwned = s;
        }
        public decimal Worth
        {
            get { return currentPrice * sharesOwned; }
        }

        // shorter with expression-bodied property
        public decimal Worth2 => currentPrice * sharesOwned;

        // expression-bodied property
        public decimal Worth3
        {
            get => currentPrice * sharesOwned;
            set => sharesOwned = value / currentPrice;
        }
    }

    public class Stock83
    {
        public decimal CurrentPrice { get; set; }
        public decimal HighestPrice { get; set; } = 100;
        public int Maximum { get; } = 999;
    }

    public class Foo84
    {
        private decimal x;
        public decimal X
        {
            get { return x; }
            private set { x = Math.Round(value, 2); }
        }
        public void SetX() => this.X = 10.1111M;
    }

    public class Note85
    {
        public int Pitch { get; init; } = 20; // init only property
        public int Duration { get; init; } = 100;  // init only property
    }

    public class Note851
    {
        public int Pitch { get; }
        public int Duration { get; }
        public Note851(int pitch = 20, int duration = 100)
        {
            Pitch = pitch; Duration = duration;
        }
    }

    public class Note852
    {
        readonly int _pitch = 20;
        public int Pitch { get => _pitch; init => _pitch = value; }
    }

    class IndexSentence
    {
        readonly string[] words = "The quick brown fox".Split();
        public string this[int wordNum] // indexer
        {
            get { return words[wordNum]; }
            set { words[wordNum] = value; }
        }

        public string this[int wordNum, string wordNum2]
        {
            get { return words[wordNum]; }
        }
    }

    class IndexSentenceIndicesRange
    {
        string[] words = "The quick brown fox".Split();

        public string this[Index index] => words[index];
        public string[] this[Range range] => words[range];
    }

    // .NET 7 not support yet
    //class PersonPrimaryConstructor(string firstName, string lastName)
    //{
    //    public void Print() => Console.WriteLine(firstName + " " + lastName);
    //}

    class PersonExplicitConstructor
    {
        private readonly string firstName;
        private readonly string lastName;

        public PersonExplicitConstructor(string firstName, string lastName)
        {
            this.firstName = firstName;
            this.lastName = lastName;
        }
        public void Print() => Console.WriteLine(firstName + " " + lastName);
    }

    class TestStaticConstructor
    {
        static TestStaticConstructor() { Console.WriteLine("Type initialized"); }
    }

}


//class PersonPrimaryAndExplicitConstructor(string firstName, string lastName)
//{
//    int age;
//    public PersonPrimaryAndExplicitConstructor(string firstName, string lastName, int age)
//        : this(firstName, lastName) // must call primary constructor
//    {
//        this.age = age;
//    }
//    public void Print() => Console.WriteLine(firstName + " " + lastName + " " + age);
//}

//class PersonPrimaryConstructorAndFieldPropertyInit(string firstName, string lastName)
//{
//    public readonly string Firstname = firstName; // field
//    public string LastName { get; } = lastName; // Property 
//    public void Print() => Console.WriteLine(Firstname + " " + LastName);
//}

//class PersonPrimaryConstructorAndReuseParamsName(string firstName, string lastName)
//{
//    public readonly string firstName = firstName;
//    public string lastName = lastName;
//    public void Print() => Console.WriteLine(firstName + " " + lastName);
//}

//class PersonWithFullName(string firstName, string lastName)
//{
//    public readonly string FullName = firstName + " " + lastName;
//    public void Print() => Console.WriteLine(FullName);
//}

//class PersonWithLastNameUpper(string firstName, string lastName)
//{
//    public readonly string lastName = lastName.ToUpper();
//    public void Print() => Console.WriteLine(firstName + " " + lastName);
//}

//class PersonWithLastNameUpperExceptionHandle(string firstName, string lastName)
//{
//    public readonly string lastName = (lastName == null)
//        ? throw new ArgumentException("lastName")
//        : lastName.ToUpper();
//    public void Print() => Console.WriteLine(firstName + " " + lastName);
//}

//class PersonPrimaryConstructorWithLastNamePropertyGetSet(string firstName, string lastName)
//{
//    public string LastName
//    {
//        get
//        {
//            if (lastName == null)
//            {
//                throw new ArgumentException("lastName");
//            }
//            else
//            {
//                return lastName.ToUpper();
//            }
//        }
//        set
//        {
//            if (value == null)
//            {
//                throw new ArgumentException("lastName");
//            }
//            else
//            {
//                lastName = value;
//            }
//        }
//    }
//    public void Print() => Console.WriteLine(firstName + " " + LastName);
//}


//class FooOrderStaticConstructorAndFieldInitialization ()
//{
//    public static int X = Y; // 0
//    public static int Y = 3; // 3
//}

//class FooWithFinalizer ()
//{
//    ~FooWithFinalizer() => Console.WriteLine("Finalizing");

//}