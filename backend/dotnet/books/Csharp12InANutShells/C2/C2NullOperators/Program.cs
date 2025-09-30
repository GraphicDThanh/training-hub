Console.WriteLine("Null Operators");
Console.WriteLine("---------- start ----------\n");

Console.WriteLine("- Null Operators");
// Ex 1: operator ??
string? a1 = null;
string a2 = a1 ?? "meo";
Console.WriteLine(a2); // meo

// Ex 2: operator ??=
string? s1 = null;
string s2 = s1 ??= "gau";
Console.WriteLine(s2); // gau

// Ex 3: operator ?.
System.Text.StringBuilder? sb = null;
string? s3 = sb?.ToString(); // no error
Console.WriteLine(s3);

string[]? words = null;
string? word = words?[1];
Console.WriteLine(word);

System.Text.StringBuilder? sb2 = null;
string? s4 = sb?.ToString().ToUpper(); // no error
Console.WriteLine(s4);

// x?.y?.z
// 15.4 final expression must be capable of accepting a null
System.Text.StringBuilder? sb5 = null;
// int length = sb?.ToString().Length; // error - int cannot be null
int? length = sb5?.ToString().Length; // ok - int? can be null
Console.WriteLine(length);

// Ex 4: method - no operation if someObject is null
// someObject?.SomeVoidMethod();

Console.WriteLine("\n---------- end ------------");