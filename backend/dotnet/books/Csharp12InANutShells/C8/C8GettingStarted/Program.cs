Console.WriteLine("Getting Started");
Console.WriteLine("- Simple Filtering");

string[] names = { "Tom", "Dick", "Harry" };

IEnumerable<string> filteredNames =
  Enumerable.Where(names, n => n.Length >= 4);

foreach (string n in filteredNames)
    Console.Write(n + "|");            // Dick|Harry|

Console.WriteLine();
Console.WriteLine("-----------------------------------");
///////////////////////////////////////////////////////////////////////////////

Console.WriteLine("- Extension Methods");
var result = (new[] { "Tom", "Dick", "Harry" }).Where(n => n.Length >= 4);
foreach (string n in result)
    Console.Write(n + "|");            // Dick|Harry|


Console.WriteLine();
Console.WriteLine("-----------------------------------");
///////////////////////////////////////////////////////////////////////////////

Console.WriteLine("- Basic Query Expression");

var result2 = from n in new[] { "Tom", "Dick", "Harry" }
              where n.Contains("a")
              select n;
foreach (string n in result2)
    Console.Write(n + "|");            // Dick|Harry|

Console.WriteLine("-----------------------------------");