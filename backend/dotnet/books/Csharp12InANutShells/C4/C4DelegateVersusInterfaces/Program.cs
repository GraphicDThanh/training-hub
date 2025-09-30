Console.WriteLine("- Delegates vs. Interfaces");
int[] values = { 1, 2, 3 };
Utils.TransformAll(values, new Squarer());
foreach (int i in values)
    Console.Write(i + " "); // 1 4 9
Console.WriteLine();

Console.WriteLine("- Delegates vs. Interfaces - Clumsiness");
int[] values2 = { 1, 2, 3 };
Utils.TransformAll(values2, new Cuber());
foreach (int i in values2)
    Console.Write(i + " "); // 1 8 27
Console.WriteLine();

public class Utils
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

public interface ITransformer
{
    int Transform(int x);
}

