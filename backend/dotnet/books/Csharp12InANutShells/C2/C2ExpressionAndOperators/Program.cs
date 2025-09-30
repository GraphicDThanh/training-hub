Console.WriteLine("Expression And Operators");
Console.WriteLine("---------- start ----------\n");

Console.WriteLine("- Expressions, Operatos");
// Ex 1: primary expression
Math.Log(1); // 2 primary expressions
             // Ex 2:  void expression
Console.WriteLine("t");
// Ex 3:  assign expression
int x = 5;
x *= 3;
Console.WriteLine(x);

// Ex 4:  precedence
int y = 1 + 2 * 3;
Console.WriteLine(y);

// Ex 5:  associativity
int z = (1 + 2) * 3;
Console.WriteLine(z);

// Ex 6:  right-associative
x = y = 3;
Console.WriteLine(x);
Console.WriteLine(y);

Console.WriteLine("\n---------- end ------------");