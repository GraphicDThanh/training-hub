using System.Drawing;

Console.WriteLine("Arrays");
Console.WriteLine("---------- start ----------\n");

Console.WriteLine("- declare array");
char[] vowels = new char[5];
vowels[0] = 'a';
vowels[1] = 'b';
vowels[2] = 'c';
vowels[3] = 'd';
vowels[4] = 'e';
Console.WriteLine(vowels);
Console.WriteLine(vowels[1]);

char[] vowels2 = new char[] { 'a', 'b', 'c', 'd', 'e' };
Console.WriteLine(vowels2);
Console.WriteLine(vowels2[1]);

char[] vowels3 = { 'a', 'b', 'c', 'd', 'e' };
Console.WriteLine(vowels3);


// C# 12
//char[] vowels4 = ['a', 'b', 'c', 'd', 'e'];
//Console.WriteLine(vowels4);


Console.WriteLine("-----------------------------");
Console.WriteLine("- iterate array");
char[] vowels4 = { 'a', 'b', 'c', 'd', 'e' };
Console.WriteLine("2.8.1 - iterate array");
for (int i1 = 0; i1 < vowels4.Length; i1++)
    Console.WriteLine(vowels4[i1]);

Console.WriteLine("-----------------------------");
Console.WriteLine("- default element initialization");
int[] a = new int[1000];
Console.WriteLine(a[123]); // 0

Console.WriteLine("-----------------------------");
Console.WriteLine("- value type, reference  type in array");
// value type
PointStruct[] p = new PointStruct[1000];
int x = p[500].X;
Console.WriteLine(x); // 0

// reference type
PointClass[] p2 = new PointClass[1000];
try
{
    int x1 = p2[500].X;
}
catch (Exception e)
{
    // Error: NullReferenceException
    Console.WriteLine(e.Message);
}

// reference type - fix
PointClass[] p3 = new PointClass[1000];
// iterate through all items, set value to new point
for (int i2 = 0; i2 < p3.Length; i2++)
    p3[i2] = new PointClass();

int x2 = p3[500].X;
Console.WriteLine("x2 is " + x2);

Console.WriteLine("-----------------------------");
Console.WriteLine("- indices array");
char[] vowels5 = { 'a', 'b', 'c', 'd', 'e' };
char lastElement = vowels5[^1];
char secondToLast = vowels5[^2];
Console.WriteLine("lastElement is: " + lastElement);
Console.WriteLine("secondToLast is: " + secondToLast);

// Index type
Index first = 0;
Index last = ^1;
char firstElement = vowels5[first];
char lastElement2 = vowels5[last];
Console.WriteLine("firstElement is: " + firstElement);
Console.WriteLine("lastElement2 is: " + lastElement2);

Console.WriteLine("-----------------------------");
Console.WriteLine("- range of array");
char[] vowels6 = { 'a', 'b', 'c', 'd', 'e' };
char[] firstTwo = vowels6[..2];
Console.WriteLine("firstTwo is: " + firstTwo);
char[] lastTwo = vowels6[^2..];
Console.WriteLine("lastTwo is: " + lastTwo);
char[] lastThree = vowels6[2..];
Console.WriteLine("lastThree is: " + lastThree);
char[] middleOne = vowels6[2..3];
Console.WriteLine("middleOne is: " + middleOne);

// Range Type
// char
string[] vowels7 = { "ab", "cd", "ef", "lm", "mo" };
Range firstTwoRange = 0..2;
string[] firstTwoo = vowels7[firstTwoRange];
Console.WriteLine("firstTwoo include: ");
foreach (var m in firstTwoo) { Console.WriteLine(m); }

// string
string[] vowels8 = { "ab", "cd", "ef", "lm", "mo" };
Range firstTwoRange3 = 0..2;
string[] firstTwoo3 = vowels8[firstTwoRange3];
Console.WriteLine("firstTwoo3 include: "); // System.String[]
foreach (var m in firstTwoo3) { Console.WriteLine(m); }

Console.WriteLine("-----------------------------");
Console.WriteLine("- multidimension array - jagged arrays");
// inner array with arbitrary length
int[][] matrix = new int[3][];

for (int o = 0; o < matrix.Length; o++)
{
    matrix[o] = new int[3]; // Create inner array
    for (int l = 0; l < matrix[o].Length; l++)
        matrix[o][l] = o * 3 + l;
}
Console.WriteLine(matrix);

// init jagged array with explicit values
int[][] matrix1 = new int[][]
{
    new int[] {1,2,3},
    new int[] {4,5,6},
    new int[] {6,7,8,9}
};

Console.WriteLine("-----------------------------");
Console.WriteLine("- Simplify array initialization");
// 1. Omit new operator and type qualification
char[] vowels9 = { 'a', 'b', 'c', 'd', 'e' };
Console.WriteLine("vowels9: " + vowels9);
int[,] retangularMatrix =
{
    {0,1,2},
    {2,3,4},
    {5,6,7}
};
Console.WriteLine("retangularMatrix: " + retangularMatrix);
int[][] jaggedMatrix =
{
    new int[] {0,1,2},
    new int[] {3,4,5},
    new int[] {6,7,8,9}
};
Console.WriteLine("jaggedMatrix: " + jaggedMatrix);

// 2. implicit type with var keyword
var i = 3;
var s = "string";
var vowels10 = new[] { 'a', 'b', 'c', 'd', 'e' }; // compiler infers char[]
Console.WriteLine("vowels10: " + vowels10);

var recMetrix = new[,]
{
    {0,1,2},
    {3,4,5},
    {6,7,8}
};
Console.WriteLine("recMetrix: " + recMetrix);

var jaggedMat = new int[][]
{
    new[] {0,1,2},
    new[] {3,4,5},
    new[] {6,7,8,9},
};
Console.WriteLine("jaggedMat: " + jaggedMat);
// 3. bound checking
// using System.Text;

// int[] arr = new int[3];
// arr[3] = 1; // System.IndexOutOfRangeException

Console.WriteLine("\n---------- end ------------");

public struct PointStruct { public int X, Y; }
public class PointClass { public int X, Y; }