
// Branches and Loops Tutorial: https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/tutorials/branches-and-loops
int a = 5;
int b = 6;
if (a + b > 10)
    Console.WriteLine("The answer is greater than 10.");

// AND OPERATOR
int a0 = 5;
int b0 = 3;
int c0 = 4;
if ((a0 + b0 + c0 > 10) && (a0 == b0))
{
    Console.WriteLine("The answer is greater than 10");
    Console.WriteLine("And the first number is equal to the second");
}
else
{
    Console.WriteLine("The answer is not greater than 10");
    Console.WriteLine("Or the first number is not equal to the second");
}

// OR OPERATOR
int a1 = 5;
int b1 = 3;
int c1 = 4;
if ((a1 + b1 + c1 > 10) || (a1 == b1))
{
    Console.WriteLine("The answer is greater than 10");
    Console.WriteLine("Or the first number is equal to the second");
}
else
{
    Console.WriteLine("The answer is not greater than 10");
    Console.WriteLine("And the first number is not equal to the second");
}

// LOOP
// context
int counter = 0;
counter++;
Console.WriteLine($"Counter is {counter}");
counter++;
Console.WriteLine($"Counter is {counter}");
counter++;
Console.WriteLine($"Counter is {counter}");
counter++;
Console.WriteLine($"Counter is {counter}");

// WHILE LOOP
int counter1 = 0;
while (counter1 < 5)
{
    Console.WriteLine($"Counter is {counter}");
    counter++;
}

// DO WHILE LOOP
int counter2 = 0;
do
{
    Console.WriteLine($"Counter is {counter}");
    counter2++;
}
while (counter2 < 5);

// FOR LOOP
for (int i = 0; i < 5; i++)
{
    if (i == 3)
    {
        Console.WriteLine(i);
    }
}

for (int row = 1; row < 11; row++)
{
    for (char column = 'a'; column < 'k'; column++)
    {
        Console.WriteLine($"The cell is ({row}, {column})");
    }
}
