// Numbers Tutorial: https://docs.microsoft.com/en-us/dotnet/csharp/tutorials/intro-to-csharp/numbers-in-csharp
int a = 2100000000;
int b = 2100000000;
long c = (long)a + (long)b;
long d = checked(a + b);
Console.WriteLine(c);

double x = 42.1;
float y = 38.2F;
double z = x + y;
Console.WriteLine($"The result is {z}");

decimal m = 42.1M;
decimal n = 38.2M;
decimal o = m + n;
Console.WriteLine($"The result is {o}");