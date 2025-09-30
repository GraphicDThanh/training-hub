using System.Text;

Console.WriteLine("Statements");
Console.WriteLine("---------- start ----------\n");

Console.WriteLine("- declaration statements");
// Ex 1: declaration statements
string someWord = "rosebud";
Console.WriteLine(someWord);
int someNumber = 42;
Console.WriteLine(someNumber);
bool rich = true, famous = false;
Console.WriteLine(rich);
Console.WriteLine(famous);


const double c = 1.89786877E08;
// c += 10; // error

Console.WriteLine("-----------------------------");
Console.WriteLine("- local variable");
//int x1;

//{
//    int y1;
//    // int x; // Error
//}
//{
//    int y2; // OK
//}
// Console.WriteLine(y); // Error

Console.WriteLine("-----------------------------");
Console.WriteLine("- expression statements");
// Declare variables with declaration statements:

//string s;
int x3, y3;
StringBuilder sb;

// Expression statements
x3 = 1 + 2;                // Assignment expression
x3++;                      // Increment expression
y3 = Math.Max(x3, 5);      // Assignment expression
Console.WriteLine(y3);    // Method call expression
sb = new StringBuilder(); // Assignment expression
Console.WriteLine(sb);
//new StringBuilder();      // Object instantiation expression

// useless
//new StringBuilder(); // Legal, but useless
//new string('c', 3); // Legal, but useless
x3.Equals(y3);        // Legal, but useless

Console.WriteLine("-----------------------------");
Console.WriteLine("- select elements");
// 4.1: if statement
if (5 < 2 * 3)
    Console.WriteLine("true"); // true

if (5 < 2 * 3)
{
    Console.WriteLine("true");
    Console.WriteLine("Let's move on!");
}

// 4.2 else clause
#pragma warning disable CS0162
// The code that's violating rules is on this line.
if (2 + 2 == 5)
    Console.WriteLine("Does not compute");  // not reach
else
    Console.WriteLine("False"); // False

if (2 + 2 == 5)
    Console.WriteLine("Does not compute");
else
    if (2 + 2 == 4)
    Console.WriteLine("Computes"); // Computes
#pragma warning restore CS0162

// 4.3 change flow execution with braces
if (true)
    #pragma warning disable CS0162
    if (false)
        Console.WriteLine(); // not reach
    else
        Console.WriteLine("executes");
#pragma warning restore CS0162

// change flow by braces
#pragma warning disable CS0162
if (true)
{
    if (false)
        Console.WriteLine();
}
else
    Console.WriteLine("executes");
#pragma warning restore CS0162

// another ex
TellMeWhatICanDo(40);
TellMeWhatICanDo(27);
TellMeWhatICanDo(19);
TellMeWhatICanDo(9);

void TellMeWhatICanDo(int age)
{
    if (age >= 35)
        Console.WriteLine("You can be president!");
    else if (age >= 21)
        Console.WriteLine("You can drink!");
    else if (age >= 18)
        Console.WriteLine("You can vote!");
    else
        Console.WriteLine("You can wait!");
}


Console.WriteLine("-----------------------------");
Console.WriteLine("- switch statement"); ;
SwitchStatement1();
SwitchStatement2();
SwitchStatement3();
SwitchStatement4();
SwitchStatement5();
SwitchStatement6();

void SwitchStatement1()
{
    // Ex 5.1
    ShowCard(1);
    ShowCard(11);
    ShowCard(-1);
    ShowCard(12);
    ShowCard(13);

    void ShowCard(int cardNumber)
    {
        switch (cardNumber)
        {
            case 13:
                Console.WriteLine("King");
                break;
            case 12:
                Console.WriteLine("Queen");
                break;
            case 11:
                Console.WriteLine("Jack");
                break;
            case -1:           // Joker is -1
                goto case 12;  // In this game joker counts as queen
            default:           // Execute for any other cardNumber 
                Console.WriteLine(cardNumber);
                break;
        }
    }
}

void SwitchStatement2()
{
    // Ex 5.2: list cases
    int cardNumber = 13;
    switch (cardNumber)
    {
        case 13:
        case 12:
        case 11:
            Console.WriteLine("Face Card");
            break;
        default:
            Console.WriteLine("Plain Card");
            break;
    }
}

void SwitchStatement3()
{
    // Ex 5.3: switch on types
    TellMeTheType(12);
    TellMeTheType("hello");
    TellMeTheType(true);

    void TellMeTheType(object x)
    {
        switch (x)
        {
            case int i:
                Console.WriteLine("It's an int!");
                Console.WriteLine($"The square of {i} is {i * i}");
                break;
            case string s:
                Console.WriteLine("It's a string");
                Console.WriteLine($"The length of {s} is {s.Length}");
                break;
            case DateTime:
                Console.WriteLine("It's a DateTime");
                break;
            default:
                Console.WriteLine("I don't know what x is");
                break;
        }
    }

}

void SwitchStatement4()
{
    // Ex 5.4: when keyword
    bool x = true;
    switch (x)
    {
        case bool b when b == true: // Fires only when b is true
            Console.WriteLine("True!");
            break;
        case bool b:
            Console.WriteLine("False!");
            break;
    }
}

void SwitchStatement5()
{
    // Ex 5.5: multiple case clauses
    // switch (x) {
    //     case float f when f > 1000: 
    //     case double d when d > 1000: 
    //     case decimal m when m > 1000:
    //         Console.WriteLine ("We can refer to x here but not f or d or m");
    //         break; 
    // }
}

void SwitchStatement6()
{
    // // Ex 5.6: null
    // switch (x)
    // {
    //     case null:
    //         Console.WriteLine ("Nothing here");
    //         break;
    // }
}

Console.WriteLine("-----------------------------");
Console.WriteLine("- switch expressions"); ;
// 6.1
int cardNumber = 9;
string cardName = cardNumber switch
{
    13 => "King",
    12 => "Queen",
    11 => "Jack",
    _ => "Pip card"
};

// 6.2
int cardNumber1 = 12;
string suite = "spades";
string cardName1 = (cardNumber1, suite) switch
{
    (12, "spades") => "King of spades",
    (13, "clubs") => "King of clubs",
    _ => throw new NotImplementedException(),
};
Console.WriteLine(cardName1);

Console.WriteLine("-----------------------------");
Console.WriteLine("- Iteration Statements"); ;
// Ex 7: Iteration Statements
// 7.1: while
int i = 0;
while (i < 3)
{
    Console.WriteLine(i);
    i++;
}

// 7.2: do-while
int j = 0;
do
{
    Console.WriteLine(j);
    j++;
}
while (j < 3);


// 7.3 for
for (int i1 = 0; i1 < 3; i1++)
    Console.WriteLine(i1);


// 7.4 for - Fibonanci numbers
for (int i2 = 0, prevFib = 1, curFib = 1; i2 < 10; i2++)
{
    Console.WriteLine(prevFib);
    int newFib = prevFib + curFib;
    prevFib = curFib;
    curFib = newFib;
}


// 7.5 for - infinity loop
//for (; ; )
//    Console.WriteLine("interrupt me");


// 7.6 foreach 
foreach (char c1 in "beer")
    Console.WriteLine(c1);


Console.WriteLine("-----------------------------");
Console.WriteLine("2.8.13.8 - jump statements");
// 8.1: break
int x4 = 0;
while (true)
{
    if (x4++ > 5)
        break; // break from the loop
}
// execution continues here after break


// 8.2: continue
for (int i2 = 0; i2 < 10; i2++)
{
    if ((i2 % 2) == 0)
        continue;

    Console.WriteLine(i2 + " ");
}

// 8.3: goto
int i3 = 1;

startLoop:
if (i3 <= 5)
{
    Console.WriteLine(i3 + " ");
    i3++;
    goto startLoop;
}


// 8.4: return
// using System.Runtime.Intrinsics.X86;

AsPercentage(100);
decimal AsPercentage(decimal d)
{
    decimal p = d * 100m;
    return p; // Return to the calling method with value
}

// 8.5: throw
// if (w == null)
//     throw new ArgumentNullException (...);

Console.WriteLine("\n---------- end ------------");