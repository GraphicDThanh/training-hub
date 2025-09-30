using TypeBasics;

Console.WriteLine("Type Basics");
Console.WriteLine("---------- start ----------\n");

Console.WriteLine("- declare a variable of type int");
int x = 12 * 30;
Console.WriteLine(x);

Console.WriteLine("-----------------------------");
Console.WriteLine("- constant variable int");
const int y = 360;
Console.WriteLine(y);

Console.WriteLine("-----------------------------");
Console.WriteLine("- predefine type");

// - predefine type int
int z = 12 * 30;
Console.WriteLine(z);

// - predefine type string
string message = "Hello, World!";
string upperMessage = message.ToUpper();
Console.WriteLine("upperMessage is" + upperMessage);

int x1 = 2024;
message += x1.ToString();
Console.WriteLine("message is: " + message);

// - predefine type bool
bool simpleVar = false;
if (simpleVar)
    Console.WriteLine("This will not print");

int x2 = 5000;
bool lessThanAMile = x2 < 5280;
if (lessThanAMile)
    Console.WriteLine("This will print");

Console.WriteLine("-----------------------------");
Console.WriteLine("- custom type");
UnitConverter feetToInchesConverter = new(12);
UnitConverter milesToFeetConverter = new(5280);

Console.WriteLine(feetToInchesConverter.Convert(30)); // 360
Console.WriteLine(feetToInchesConverter.Convert(100)); // 1200
Console.WriteLine(milesToFeetConverter.Convert(1)); // 1200
Console.WriteLine(
    feetToInchesConverter.Convert(milesToFeetConverter.Convert(1)));

Console.WriteLine("-----------------------------");
Console.WriteLine("- instance vs. static members");
// Ex 4: instance vs. static members
PandaTypeBasics p1 = new("Pan Dee");
PandaTypeBasics p2 = new("Pan Dah");

Console.WriteLine(p1.Name); // Pan Dee
Console.WriteLine(p2.Name); // Pan Dah

Console.WriteLine(PandaTypeBasics.Population); // 2

Console.WriteLine("-----------------------------");
Console.WriteLine("- Namespace");
// import namespace Animals
PandaTypeBasics p3 = new("Pan Dee 3");
PandaTypeBasics p4 = new("Pan Dah 4");
Console.WriteLine(p3.Name); // Pan Dee 3
Console.WriteLine(p4.Name); // Pan Dee 4
Console.WriteLine(PandaTypeBasics.Population); // 2 

// without imported Animals namespace
Animals2.PandaAnimals2 a2p1 = new("Pan Dee");
Animals2.PandaAnimals2 a2p2 = new("Pan Dah");
Animals2.PandaAnimals2 _ = new("Pan Teo");

Console.WriteLine(a2p1.Name); // Pan Dee
Console.WriteLine(a2p2.Name); // Pan Dah

Console.WriteLine(Animals2.PandaAnimals2.Population); // 3


Console.WriteLine("-----------------------------");
Console.WriteLine("- Program Without Top-Level Statement");
/* using System;
class Program
{
    static void Main() // Program entry point
    {
        int x = 12 * 30;
        Console.WriteLine (x);
    }
} */

Console.WriteLine("\n---------- end ------------");

namespace TypeBasics
{
    public class UnitConverter
    {
        // Class implementation goes here
        readonly int ratio; // Field

        public UnitConverter(int unitRatio) // Constructor
        {
            ratio = unitRatio;
        }

        public int Convert(int unit) // Method
        {
            return unit * ratio;
        }
    }

    public class PandaTypeBasics
    {
        public string Name;              // Instance field
        
        #pragma warning disable CA2211  
        public static int Population;    // Static field
        #pragma warning restore CA2211
        
        public PandaTypeBasics(string n)          // Constructor
        {
            Name = n;                    // Assign the instance field
            Population++; // Increment the static Population field
        }
    }

}


namespace Animals2
{
    public class PandaAnimals2
    {
        public string Name;
        public static int Population;

        public PandaAnimals2(string n)
        {
            Name = n;
            Population++;
        }
    }
}
