// List Collection tutorial: https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/tutorials/list-collection
var names = new List<string> { "Scott", "Ana", "Felipe" };
names.Add("Maria");
names.Add("Bill");
names.Remove("Ana");
foreach (var name in names)
{
    Console.WriteLine($"Hello {name.ToUpper()}!");
}

var names1 = new List<string> { "Scott", "Ana", "Felipe" };
names1.Add("Maria");
names1.Add("Bill");
names1.Remove("Ana");
foreach (var name in names1)
{
    Console.WriteLine($"Hello {name.ToUpper()}!");
}

Console.WriteLine(names1[0]);
Console.WriteLine(names1[2]);
Console.WriteLine(names[^1]);

// LIST
var names2 = new List<string>
 {
     "Scott",
     "Ana",
     "Felipe",
     "Maria",
     "Bill"
 };
foreach (var name in names2[2..4])
{
    Console.WriteLine($"Hello {name.ToUpper()}!");
}

// ARRAY
var names3 = new string[]
{
     "Scott",
     "Ana",
     "Felipe",
     "Maria",
     "Bill"
};
names3 = [..names3, "test"];
foreach (var name in names3)
{
    Console.WriteLine($"Hello {name.ToUpper()}!");
}

// SORT & SEARCHING
var names4 = new List<string> { "Scott", "Ana", "Felipe" };
names.Sort();
foreach (var name in names4)
{
    Console.WriteLine($"Hello {name.ToUpper()}!");
}

var numbers5 = new List<int> { 45, 56, 99, 48, 67, 78 };
Console.WriteLine($"I found index of 99 at: {numbers5.IndexOf(99)}");

numbers5.Sort();
foreach (var number in numbers5)
{
    Console.WriteLine($"Hello {number}");
}
