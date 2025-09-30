int [] values = [1, 2, 3];

Util.Transform (values, Square); // Hook in Square

foreach (int i in values)
    Console.Write(i + " ");

int Square (int x) => x * x;

public delegate T Transformer<T> (T arg);

public class Util
{
    public static void Transform<T> (T[] values, Transformer<T> t)
    {
        for (int i = 0; i < values.Length; i ++)
            values[i] = t(values[i]);
    }
}
