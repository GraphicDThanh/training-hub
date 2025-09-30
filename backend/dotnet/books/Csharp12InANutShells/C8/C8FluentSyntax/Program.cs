// C8FluentSyntax

Console.WriteLine("Introducing Fluent Syntax");
Console.WriteLine("- Chaining Query Operators");
string[] names = { "Tom", "Dick", "Harry", "Marry", "Jay" };
IEnumerable<string> query = names
    .Where(n => n.Contains("a"))
    .OrderBy(n => n.Length)
    .Select(n => n.ToUpper());

// The same query constructed progressively:
IEnumerable<string> filtered = names.Where(n => n.Contains("a"));
IEnumerable<string> sorted = filtered.OrderBy(n => n.Length);
IEnumerable<string> finalQuery = sorted.Select(n => n.ToUpper());

Console.WriteLine("-----------------------------------");
Console.WriteLine("- Shunning Extension Methods");
string[] names2 = { "Tom", "Dick", "Harry", "Marry", "Jay" };
IEnumerable<string> query2 = Enumerable.Select(
    Enumerable.OrderBy(
        Enumerable.Where(
            names, n => n.Contains("a")
        ), n => n.Length
    ), n => n.ToUpper()
);

Console.WriteLine("-----------------------------------");
Console.WriteLine("- Type interface");
string[] names3 = { "Tom", "Dick", "Harry", "Marry", "Jay" };
IEnumerable<string> sortedByLength, sortedAlphabetically;
sortedByLength = names.OrderBy(n => n.Length);  // int key
sortedAlphabetically = names.OrderBy(n => n); // string key

Console.WriteLine("-----------------------------------");
Console.WriteLine("- Natural Ordering");
int[] numbers4 = { 10, 9, 8, 7, 6 };
IEnumerable<int> firstThree = numbers4.Take(3); // { 10, 9, 8 }
IEnumerable<int> lastTwo = numbers4.Skip(3); // { 7, 6 }
IEnumerable<int> reversed = numbers4.Reverse(); // { 6, 7, 8, 9, 10 }

Console.WriteLine("-----------------------------------");
Console.WriteLine("- Other Operators");
int[] numbers5 = { 10, 9, 8, 7, 6 };
// element
int firstNumber = numbers5.First();
int lastNumber = numbers5.Last();
int secondNumber = numbers5.ElementAt(1);
int secondLowest = numbers5.OrderBy(n => n).Skip(1).First();  // 7
                                                              // aggregation
int count = numbers5.Count();
int min = numbers5.Min();
// quantifiers
bool hasTheNumberNine = numbers5.Contains(9);
bool hasMoreThanZeroElements = numbers5.Any();
bool hasAnOddElement = numbers5.Any(n => n % 2 != 0);
// Concat, Union
int[] seq1 = { 1, 2, 3 };
int[] seq2 = { 3, 4, 5 };
IEnumerable<int> concat = seq1.Concat(seq2); // { 1, 2, 3, 3, 4, 5 }
IEnumerable<int> union = seq1.Union(seq2); // { 1, 2, 3, 4, 5 }
                                           //Console.WriteLine("-----------------------------------");