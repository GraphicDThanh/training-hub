using System.Drawing;
using C2TypeAndConversions;

Console.WriteLine("Type And Conversions");
Console.WriteLine("---------- start ----------\n");

Console.WriteLine("- implicitly, explicitly conversion");
int x = 123;        // int is a 32-bit integer
Console.WriteLine(x.GetType());

long y = x;         // implicit conversion to 64-bit integer
Console.WriteLine(y.GetType());

short z = (short)x; // explicit conversion to 16-bit integer
Console.WriteLine(z.GetType());


Console.WriteLine("-----------------------------");
Console.WriteLine("- value types - define custom value type with 'struct' keyword");
// Point is struct
PointStruct p1 = new()
{
    X = 7
};
PointStruct p2 = p1; // Assignment causes copy

Console.WriteLine("p1.X is:" + p1.X); // 7
Console.WriteLine("p2.X is:" + p2.X); // 7

Console.WriteLine("Change p1.X to 9");
p1.X = 9; // Change p1.X only change p1

Console.WriteLine("p1.X is:" + p1.X); // 9
Console.WriteLine("p2.X is:" + p2.X); // 7

Console.WriteLine("-----------------------------");
Console.WriteLine("- reference types - define with class");

PointClass p3 = new()
{
    X = 7
};

PointClass p4 = p3; // Copies p1 reference

Console.WriteLine("p3.X is: " + p3.X); // 7
Console.WriteLine("p4.X is: " + p4.X); // 7

Console.WriteLine("Change p3.X to 9");
p3.X = 9; // Change p1.X

Console.WriteLine("p3.X is: " + p3.X); // 9
Console.WriteLine("p4.X is: " + p4.X); // 9

Console.WriteLine("- null types");
PointClass? p5 = null;
Console.WriteLine(p5 == null); // True

// Throw NullReferenceException
//Console.WriteLine (p5.X);
Console.WriteLine("\n---------- end ------------");

namespace C2TypeAndConversions
{
    public struct PointStruct { public int X; public int Y; }
    public class PointClass { public int X, Y; }
}
