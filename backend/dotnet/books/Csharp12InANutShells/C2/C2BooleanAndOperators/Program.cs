Console.WriteLine("Boolean And Operators");
Console.WriteLine("---------- start ----------\n");

Console.WriteLine("- equality, comparison operators");
// - value type
int x = 1;
int y = 2;
int z = 1;
Console.WriteLine("x == y is: " + (x == y)); // False
Console.WriteLine("x == z is: " + (x == z)); // True

// - reference type
DudeCA1050C2BooleanAndOperatorWillNoCollisionIssue d1 = new("John");
DudeCA1050C2BooleanAndOperatorWillNoCollisionIssue d2 = new("John");
Console.WriteLine("d1 == d2 is: " + (d1 == d2)); // False
DudeCA1050C2BooleanAndOperatorWillNoCollisionIssue d3 = d1;
Console.WriteLine("d1 == d3 is: " + (d1 == d3)); // True

Console.WriteLine("-----------------------------");
Console.WriteLine("- equality, comparison operators");
static bool UseUmbrella(bool rainy, bool sunny, bool windy)
{
    return !windy && (rainy || sunny);
}
Console.WriteLine(
    "Use Umbrella with rainy, not sunny, not windy: " 
    + UseUmbrella(true, false, false)
);
Console.WriteLine(
    "Use Umbrella with rainy, not sunny, windy: " 
    + UseUmbrella(true, false, true)
);
Console.WriteLine(
    "Use Umbrella with not rainy, sunny, not windy: " 
    + UseUmbrella(false, true, false)
);
Console.WriteLine(
    "Use Umbrella with not rainy, sunny, windy: " 
    + UseUmbrella(false, true, true)
);
Console.WriteLine("\n---------- end ------------");

// CA1050 - define type in namespace to avoid name collisions
//namespace BooleanAndOperators
//{
//    public class Dude
//    {
//        public string Name;
//        public Dude(string n) { Name = n; }
//    }
//}

#pragma warning disable CA1050
// The code that's violating the rule CA1050 is on this line.
public class DudeCA1050C2BooleanAndOperatorWillNoCollisionIssue
{
    public string Name;
    public DudeCA1050C2BooleanAndOperatorWillNoCollisionIssue(string n) { Name = n; }
}
#pragma warning restore CA1050