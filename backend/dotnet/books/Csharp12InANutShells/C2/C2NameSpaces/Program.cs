Console.WriteLine("Namespaces");
Console.WriteLine("---------- start ----------\n");
Console.WriteLine("\n---------- end ------------");

// --- Namespaces ---
namespace Outer.Middle.Inner
{
    class Class1 {}
    class Class2 {}
}


// same
namespace Outer
{
    namespace Middle
    {
        namespace Inner 
        {
            class Class11 {}
            class Class22 {}
        }
    }
}

