
using C4Delegates;

Console.WriteLine("Delegates");
Console.WriteLine("- delegates");
Transformer t = Square; // create delegate instance
int result = t(3); // invoke
Console.WriteLine(result); // 9


Console.WriteLine("- delegates - longhand");
Transformer t2 = new(Square); // create delegate instance longhand
int result2 = t2(4); // invoke
Console.WriteLine(result2); // 16

Console.WriteLine("- Delegates vs. Interfaces");
int[] values5 = { 1, 2, 3 };
Utils4.TransformAll(values5, new Squarer());
foreach (int i in values5)
    Console.Write(i + " "); // 1 4 9
Console.WriteLine();

Console.WriteLine("- Delegates vs. Interfaces - Clumsiness");
int[] values6 = { 1, 2, 3 };
Utils4.TransformAll(values6, new Cuber());
foreach (int i in values5)
    Console.Write(i + " "); // 1 8 27
Console.WriteLine();

Console.WriteLine("- Delegate Type Incompatibility");
D1 d1 = Method1;
//D2 d2 = d1; // Compile-time error
static void Method1() { }

Console.WriteLine("- Delegate Type Incompatibility - Wordaround");
D1 d3 = Method2;
D2 d4 = new(d3);
static void Method2() { }

Console.WriteLine("- Delegate Equality");
D1 d5 = Method3;
D1 d6 = Method3;
Console.WriteLine(d5 == d6); // True
static void Method3() { }

Console.WriteLine("- Parameter Compatibility (Contravariance)");
StringAction sa = new(ActOnObject);
sa("hello");

static void ActOnObject(object o) => Console.WriteLine(o);

Console.WriteLine("- Return Type Compatibility (Covariance)");
ObjectRetriever o = new(RetrieveString);
object result3 = o();
Console.WriteLine(result3);

string RetrieveString() => "hello";

Console.WriteLine("- Type Parameter Variance");
// public delegate TResult Func<out TResult>();
Func<string> x = () => "Hello, world";
Func<object> y = x;

// void Action<in T> (T arg);
Action<object> x2 = o => Console.WriteLine(o);
Action<string> y2 = x2;

void PrintList<T>(T[] list)
{
    foreach (T l in list)
    {
        Console.WriteLine(l);
    }
}

int Square(int x) => x * x;

int Cube(int x) => x * x * x;

namespace C4Delegates
{
    // - Delegate vs Interfaces
    public interface ITransformer
    {
        int Transform(int x);
    }

    public class Utils4
    {
        public static void TransformAll(int[] values, ITransformer t)
        {
            for (int i = 0; i < values.Length; i++)
            {
                values[i] = t.Transform(values[i]);
            }
        }
    }
    class Squarer : ITransformer
    {
        public int Transform(int x) => x * x;
    }

    // - Clumsiness
    class Cuber : ITransformer
    {
        public int Transform(int x) => x * x * x;
    }


    // - Delegate Type Incompatibility
    delegate void D1();
    delegate void D2();

    // - Parameter Compatibility (Contravariance)
    delegate void StringAction(string s);

    // - Return Type Compatibility (Covariance)
    delegate object ObjectRetriever();
    // - Type Parameter Variance
}
