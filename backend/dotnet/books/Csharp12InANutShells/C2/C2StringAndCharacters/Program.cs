Console.WriteLine("String And Characters");
Console.WriteLine("---------- start ----------\n");

Console.WriteLine("- Characters");
char c = 'A'; // Simple character
Console.WriteLine("c is: " + c + " has type " + c.GetType());

// escape sequences
char newLine = '\n';
char backSlash = '\\';
Console.WriteLine("\\\\n is: " + newLine);
Console.WriteLine("\\\\ is: " + backSlash);

// unicode char
char copyrightSymbol = '\u00A9';
char omegaSynbol = '\u03A9';
char newLine2 = '\u000A';

Console.WriteLine("\\u00A9 is: " + copyrightSymbol);
Console.WriteLine("\\u03A9 is: " + omegaSynbol);
Console.WriteLine("\\u000A is: " + newLine2);



Console.WriteLine("-----------------------------");
Console.WriteLine("- Strings");
string x = "Heat";
string a = "test";
string b = "test";
Console.WriteLine("a == b is: " + a == b); // True

Console.WriteLine("2.7.2.2 - escape sequence");
string c2 = "Here's a tab:\t";
Console.WriteLine(c2);

string a1 = "\\\\server\\fileshare\\helloworld.cs";
Console.WriteLine(a1);

string a2 = @"\\server\fileshare\helloworld.cs";
Console.WriteLine(a2);

string escaped = "First Line\r\nSecond Line";
Console.WriteLine(escaped);

string verbatim = @"First Line
                Second Line";
Console.WriteLine(verbatim);

Console.WriteLine("escaped == verbatim is: " + escaped == verbatim); // True

string xml = @"<customer id=""123""></customer>";
Console.WriteLine("xml is: " + xml);

string raw = """<file path="c:\temp\test.txt"></file>""";
Console.WriteLine("raw is" + raw);

Console.WriteLine("2.7.2.3 - multiple lines");
string multiLineRaw = """
                    Line 1
                    Line 2
                    """;
Console.WriteLine("multiLineRaw: " + multiLineRaw);

if (true)
    Console.WriteLine("""
                        {
                            "Name": "Joe"
                        }
                    """);

Console.WriteLine("- string concatenation");
string s = "a" + "b";
Console.WriteLine(s);
string s2 = "a" + 5;
Console.WriteLine(s2);

Console.WriteLine("- string interpolation");
// Ex 3: string interpolation
int x1 = 4;
Console.WriteLine($"A square has {x1} sides");

string s1 = $"255 in hex is {byte.MaxValue:X2}";
Console.WriteLine(s1);

bool b1 = true;
Console.WriteLine($"The answer in binary is {(b1 ? 1 : 0)}");

const string greeting = "Hello";
const string message = $"{greeting}, world";
Console.WriteLine("message: " + message);

Console.WriteLine("\n---------- end ------------");