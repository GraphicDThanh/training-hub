Console.WriteLine("Numeric Types");
Console.WriteLine("---------- start ----------\n");

Console.WriteLine("- Numeric Types Reference:");
int x = 124;
long y = 0x7F;
int milion = 1_000_000;
var b = 0b1010_1011_1100_1101_1110_1111;
double d = 1.5;
double million = 1E06;

Console.WriteLine("type of x: " + x.GetType());
Console.WriteLine("type of y: " + y.GetType());
Console.WriteLine("type of milion: " + milion.GetType());
Console.WriteLine("type of b: " + b.GetType());
Console.WriteLine("type of d: " + d.GetType());
Console.WriteLine("type of million: " + million.GetType());

Console.WriteLine("---");
Console.WriteLine("1.0 has type: " + 1.0.GetType()); // Double (double)
Console.WriteLine("1E06 has type: " + 1E06.GetType()); // Double (double)
Console.WriteLine("1 has type: " + 1.GetType()); // System.Int32 (int)
// System.UInt32 (uint)
Console.WriteLine("0xF0000000 has type: " + 0xF0000000.GetType());
// System.Int64  (long)
Console.WriteLine("0x100000000 has type: " + 0x100000000.GetType()); 

Console.WriteLine("-----------------------------");
Console.WriteLine("- numeric suffix");
float f = 1.0F;
double d0 = 1D;
decimal d1 = 1.0M;
uint i = 1U;
long i1 = 1L;
ulong i2 = 1UL;

long i3 = 5; // Implicit lossless conversion from int literal to long
double x1 = 4.0;
float f1 = 4.5F;
decimal d2 = -1.23M;

Console.WriteLine("f has value 1.0F has type: " + f.GetType());
Console.WriteLine("d0 has value 1D has type: " + d0.GetType());
Console.WriteLine("d1 has value 1.0M has type: " + d1.GetType());
Console.WriteLine("i has value 1U has type: " + i.GetType());
Console.WriteLine("i1 has value 1L has type: " + i1.GetType());
Console.WriteLine("i2 has value 1UL has type: " + i2.GetType());
Console.WriteLine("i3 has value 5 has type: " + i3.GetType());
Console.WriteLine("x1 has value 4.0 has type: " + x1.GetType());
Console.WriteLine("f1 has value 4.5 has type: " + f1.GetType());
Console.WriteLine("d2 has value -1.23M has type: " + d2.GetType());

Console.WriteLine("-----------------------------");
Console.WriteLine("- Conversion");
int x2 = 1234; // int is a 32-bit integer
long y2 = x2; // implicit conversion to 64-bit integral type
short z = (short)x2; // explicit conversion to 16-bit integral type
Console.WriteLine("type of x2: " + x2.GetType());
Console.WriteLine("type of y2: " + y2.GetType());
Console.WriteLine("type of z: " + z.GetType());

// conversion between floating-point
int i4 = 1;
float f2 = i4;
int i5 = (int)f2;
Console.WriteLine("i5 is: " + i5);
Console.WriteLine("type of i5: " + i5.GetType());

int i6 = 100000001;
float f3 = i6;
int i7 = (int)f3;
Console.WriteLine("i7 is: " + i7); // 100000000
Console.WriteLine("type of i7: " + i7.GetType());

Console.WriteLine("-----------------------------");
Console.WriteLine("- increment, decrement operators");
int x3 = 0, y3 = 0;
Console.WriteLine("print x3 before: " + x3);
Console.WriteLine("print x3++: " + x3++); // Outputs 0; x is now 1
Console.WriteLine("print x3 after: " + x3);

Console.WriteLine("print y3 before: " + y3);
Console.WriteLine("print y3++: " + ++y3); // Outputs 1; y is now 1
Console.WriteLine("print y3 after: " + y3);

Console.WriteLine("-----------------------------");
Console.WriteLine("- division");
int a = 2 / 3;
Console.WriteLine("a is: " + a); // 0
int b1 = 0;
Console.WriteLine("b is: " + b1); // 0
                                  //int c = 5 / b1; // throw DivideByZeroException

Console.WriteLine("-----------------------------");
Console.WriteLine("- overflow");
int a2 = int.MinValue;
a2--;
Console.WriteLine(a2 == int.MaxValue);

// check operator
int a3 = 1000000;
int b2 = 1000000;

// Check just the expression
try
{
    int c1 = checked(a3 * b2); // throw System.OverflowException
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}


// Check all expressions in statement block.
try
{
    int c2;
    checked
    {
        c2 = a2 * b; // throw System.OverflowException
    }

}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}

// uncheck operator
int x4 = int.MaxValue;
Console.WriteLine("x4 is: " + x4);

int y4 = unchecked(x4 + 1);
Console.WriteLine("y4 is: " + y4);

unchecked
{
    int z4 = x4 + 1;
    Console.WriteLine("z4 is: " + z4);
}

Console.WriteLine("-----------------------------");
Console.WriteLine("- 8 and 16-bit");
short x5 = 1, y5 = 1;
//short z5 = x5 + y5; // Compile-time Error: Cannot implicit convert type int and short
short z6 = (short)(x5 + y5); // OK
Console.WriteLine("z6 is: " + z6);

Console.WriteLine("-----------------------------");
Console.WriteLine("- Special Float, Double values");
Console.WriteLine("double.NegativeInfinity: " + double.NegativeInfinity);

// Divide nonzero number to zero
Console.WriteLine("1.0 / 0.0 = " + 1.0 / 0.0);  // ∞
Console.WriteLine("-1.0 / 0.0 = " + -1.0 / 0.0);  // -∞
Console.WriteLine("1.0 / -0.0 = " + 1.0 / -0.0); // -∞
Console.WriteLine("-1.0 / -0.0 = " + -1.0 / -0.0); // ∞

// Divide zero to zero
Console.WriteLine("0.0 / 0.0 = " + 0.0 / 0.0);  // NaN
Console.WriteLine("(1.0 / 0.0) - (1.0 / 0.0)" + ((1.0 / 0.0) - (1.0 / 0.0))); // NaN

// with ==, NaN value never equal to another value, even another NaN value
// Warning CA2242: https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/ca2242 
//Console.WriteLine("0.0 / 0.0 == double.NaN = " + (0.0 / 0.0 == double.NaN)); // False

// test NaN value with double.IsNaN()
Console.WriteLine("double.IsNaN(0.0 / 0.0) = " + double.IsNaN(0.0 / 0.0)); // True

Console.WriteLine("-----------------------------");
Console.WriteLine("- Real Number Rounding Error");
float x6 = 0.1f;
Console.WriteLine(
    "x6 + x6 + x6 + x6 + x6 + x6 + x6 + x6 + x6 + x6 = "
    + (x6 + x6 + x6 + x6 + x6 + x6 + x6 + x6 + x6 + x6)
);    // 1.0000001
decimal m = 1M / 6M;
Console.WriteLine("m = " + m); // 0.1666666666666666666666666667
double d3 = 1.0 / 6.0;
Console.WriteLine("d3 = " + d3); // 0.16666666666666666

// rounding error
decimal notQuiteWholeM = m + m + m + m + m + m; // 1.0000000000000000000000000002M
Console.WriteLine("notQuiteWholeM: " + (notQuiteWholeM));
double notQuiteWholeD = d3 + d3 + d3 + d3 + d3 + d3; // 0.9999999999999999
Console.WriteLine("notQuiteWholeD: " + (notQuiteWholeD));

// comparison
Console.WriteLine("notQuiteWholeM == 1M: " + (notQuiteWholeM == 1M)); // False
Console.WriteLine("notQuiteWholeD < 1.0: " + (notQuiteWholeD < 1.0)); // True
Console.WriteLine("\n---------- end ------------");

