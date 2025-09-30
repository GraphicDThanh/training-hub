Console.WriteLine("Syntax");
Console.WriteLine("---------- start ----------\n");

Console.WriteLine("- identifiers with reversed keywords by prefixing @");
int @using = 123;
Console.WriteLine("@using is:" + @using);


Console.WriteLine("-----------------------------");
Console.WriteLine("- contextual keywords");
int file = 'a';
Console.WriteLine("file is: " + file);

Console.WriteLine("-----------------------------");
Console.WriteLine("- punctuators");
Console.WriteLine
    (1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10);

Console.WriteLine("-----------------------------");
Console.WriteLine("- comments");
int x = 3; // comment assign x to 3
int y = 4; /* This is a block comment
                          that spans multiple lines. */
Console.WriteLine($"{x} {y}");

Console.WriteLine("\n---------- end ------------");