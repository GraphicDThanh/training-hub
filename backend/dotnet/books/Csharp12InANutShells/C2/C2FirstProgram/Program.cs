Console.WriteLine("First Program");
Console.WriteLine("---------- start ----------\n");

Console.WriteLine("- First C Sharp Program");
int x = 12 * 30;
Console.WriteLine(x);

Console.WriteLine("-----------------------------");
Console.WriteLine("- Using Directive");
int x1 = 12 * 30;
Console.WriteLine(x1);

Console.WriteLine("-----------------------------");
Console.WriteLine("- Reuse Code With Low Level Function");

Console.WriteLine(FeetToInches(30)); // 360
Console.WriteLine(FeetToInches(100)); // 1200

int FeetToInches(int feet)
{
    int inches = feet * 12;
    return inches;
}

Console.WriteLine("-----------------------------");
Console.WriteLine("- Void Function");

SayHello();

void SayHello()
{
    Console.WriteLine("Hello!");
}

Console.WriteLine("\n---------- end ------------");