using System.Text;

Console.WriteLine("Variables And Parameters");
Console.WriteLine("---------- start ----------\n");

Console.WriteLine("- Stack & Heap");
static int Factorial(int x)
{
    if (x == 0) return 1;
    return x * Factorial(x - 1);
}

Console.WriteLine("2.8.10.1 - Heap");
StringBuilder ref1 = new("object 1");
Console.WriteLine(ref1);
// The String Builder referenced by ref1 is now eligible for GC

StringBuilder ref2 = new("object 2");
StringBuilder ref3 = ref2;
// The String Builder referenced by ref2 is NOT yet eligible for GC
Console.WriteLine(ref3);


Console.WriteLine("-----------------------------");
Console.WriteLine("- define assignment");
// compile error if not assign value when read from
// int x;
// Console.WriteLine (x); // build fail

// automatically initialized
int[] ints = new int[2];
Console.WriteLine(ints[0]); // 0

Console.WriteLine(Test.X); // 0 - default value auto init

Console.WriteLine("-----------------------------");
Console.WriteLine("- define values");
Console.WriteLine(default(decimal)); // 0

decimal d = default;
Console.WriteLine(d);

Console.WriteLine("-----------------------------");
Console.WriteLine("- Parameters  by value");
Foo(8); // 8 is argument
static void Foo(int p) { Console.WriteLine(p); } // p is parameter

int x = 8;
Foo(x); // make a copy of x
Console.WriteLine(x); // x still be 8

static void Foo2(int p)
{
    p++; // increment p by 1
    Console.WriteLine(p);
}

Console.WriteLine("-----------------------------");
Console.WriteLine("- Parameters by reference value");
// sb and fooSB are separate variables but same ref to StringBuilder object

StringBuilder sb = new();
Foo3(sb);
Console.WriteLine(sb.ToString()); // test

static void Foo3(StringBuilder fooSB)
{
    fooSB.Append("test"); // ref to StringBuilder
    fooSB = null; // ref to null
}

Console.WriteLine("-----------------------------");
Console.WriteLine("- ref modifier");
// Example 5.1
int x1 = 8;
Foo4(ref x1);
Console.WriteLine(x1); // 9

static void Foo4(ref int p)
{
    p++;
    Console.WriteLine(p);  // 9
}

// Example 5.2
string x2 = "Penn";
string y2 = "Teller";
Swap(ref x2, ref y2);
Console.WriteLine(x2); // Teller
Console.WriteLine(y2); // Penn

static void Swap(ref string a, ref string b)
{
    (b, a) = (a, b);
}

Console.WriteLine("-----------------------------");
Console.WriteLine("- out modifier");
string a, b;
Split("Stevie Ray Vaughn", out a, out b);
Console.WriteLine(a);
Console.WriteLine(b);

// out variable and discards
// declare on fly
Split("Stevie Ray Vaughn", out string c, out string d2);
Console.WriteLine(c);
Console.WriteLine(d2);

// discard
string e;
Split("Thanh Nguyen", out e, out _);
Console.WriteLine(e);

void Split(string name, out string firstNames, out string lastName)
{
    int i = name.LastIndexOf(' ');
    firstNames = name.Substring(0, i);
    lastName = name.Substring(i + 1);
}

// out modifier in implication of passing ref
TestOutModifier.Main();

Console.WriteLine("-----------------------------");
Console.WriteLine("- in modifier");
/* void Foo (in SomeBigStruct a) {...}
SomeBigStruct = ...;
Foo (x);
Foo (in x); */

Console.WriteLine("-----------------------------");
Console.WriteLine("- params modifier");
int total = Sum(1, 2, 3, 4);
Console.WriteLine(total);

// The call to Sum above is equivalent to:
int total2 = Sum(new int[] { 1, 2, 3, 4 });
Console.WriteLine(total2);

int total3 = Sum(new int[] { });
Console.WriteLine(total3);

int Sum(params int[] ints)
{
    int sum = 0;
    for (int i = 0; i < ints.Length; i++)
        sum += ints[i];
    return sum;
}

Console.WriteLine("-----------------------------");
Console.WriteLine("- optional parameter, name arguments");
Foo5();
Foo5(5);
void Foo5(int i = 23) { Console.WriteLine(i); }

Foo6(1);
Foo6(y: 1); // name arguments
void Foo6(int x = 0, int y = 0) { Console.WriteLine($"{x}, {y}"); }

Console.WriteLine("-----------------------------");
Console.WriteLine("- Ref Locals");
int[] numbers = { 0, 1, 2, 3, 4 };
ref int numRef = ref numbers[2];
Console.WriteLine(numRef); // 2

numRef *= 10;
Console.WriteLine(numRef); // 20
Console.WriteLine(numbers[2]); // 20

Console.WriteLine("-----------------------------");
Console.WriteLine("- Ref Returns");
// RefReturnsProgram

Console.WriteLine("-----------------------------");
Console.WriteLine("- var");

var x3 = "hello";
var y = new System.Text.StringBuilder();
var z = (float)Math.PI;
Console.WriteLine(x3.GetType()); // System.String
Console.WriteLine(y.GetType()); // System.Text.StringBuilder
Console.WriteLine(z.GetType()); // System.Single
                                // equal to:
string a1 = "hello";
System.Text.StringBuilder b1 = new System.Text.StringBuilder();
float c1 = (float)Math.PI;
Console.WriteLine(a1.GetType()); // System.String
Console.WriteLine(b1.GetType()); // System.Text.StringBuilder
Console.WriteLine(c1.GetType()); // System.Single

Random r = new Random();
var k = r.Next();
Console.WriteLine(k.GetType()); // System.Int32

Console.WriteLine("-----------------------------");
Console.WriteLine("- target-typed new expression");
// 1
StringBuilder sb1 = new();
StringBuilder sb2 = new("Test");
// --> equal with
StringBuilder sb3 = new StringBuilder();
StringBuilder sb4 = new StringBuilder("Test");

// 2
// TargetTypedNewExpressionFoo

// 3
// MyMethod (new ("test"));
// void MyMethod (System.Text.StringBuilder sb) { }

Console.WriteLine("\n---------- end ------------");

class Test { public static int X; }

class TestOutModifier
{
    static int x;
    public static void Main() { Foo(out x); }

    static void Foo(out int y)
    {
        Console.WriteLine(x); // 0
        y = 1;
        Console.WriteLine(x); // 1
    }
}