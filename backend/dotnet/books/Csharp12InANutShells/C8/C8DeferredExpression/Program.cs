Console.WriteLine("Deferred Expressions");
Console.WriteLine("- Intro");
var numbers = new List<int> { 1 };
IEnumerable<int> query = numbers.Select(n => n * 10);
numbers.Add(2);
foreach (int n in query)
    Console.Write(n + "|");

Console.WriteLine("\n- Reevaluation");
var numbers2 = new List<int> { 1, 2, 3 };
IEnumerable<int> query2 = numbers.Select(n => n * 10);
numbers.Clear();
foreach (int n in query) Console.Write(n + "|");

Console.WriteLine("\n- Defeating Reevaluation");
var numbers3 = new List<int> { 1, 2 };
List<int> timesTen = numbers
    .Select(n => n * 10)
    .ToList();

numbers.Clear();
Console.WriteLine(timesTen.Count);

Console.WriteLine("- Captured Variables");
int[] numbers4 = { 1, 2 };

int factor = 10;
IEnumerable<int> query4 = numbers4.Select(n => n * factor);

factor = 20;
foreach (int n in query) Console.Write(n + "|");

Console.WriteLine("- Captured Variable in a for-loop");
IEnumerable<char> query5 = "Not what you might expect";

query5 = query5.Where(c => c != 'a');
query5 = query5.Where(c => c != 'e');
query5 = query5.Where(c => c != 'i');
query5 = query5.Where(c => c != 'o');
query5 = query5.Where(c => c != 'u');

foreach (char c in query5) Console.Write(c); // Nt wht y mght xpct

// refactor with for loop
IEnumerable<char> query6 = "Not what you might expect";
string vowels = "aeiou";
//for (int i = 0; i < vowels.Length; i++)
//    query6 = query6.Where(c => c != vowels[i]);
//foreach (char c in query6) Console.Write(c);

// fix
IEnumerable<char> query7 = "Not what you might expect";
for (int i = 0; i < vowels.Length; i++)
{
    char vowel = vowels[i];
    query7 = query7.Where(c => c != vowel);
}

foreach (char c in query7) Console.Write(c);
Console.WriteLine();

// fix
IEnumerable<char> query8 = "Not what you might expect";
foreach (char vowel in vowels)
    query8 = query8.Where(c => c != vowel);

foreach (char c in query8) Console.Write(c);
Console.WriteLine();