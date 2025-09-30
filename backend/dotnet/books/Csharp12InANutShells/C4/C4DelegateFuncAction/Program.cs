Console.WriteLine("Use Func Delegate:");
int [] values = [1, 2, 3];

Util.Transform (values, Square); // Hook in Square
foreach (int i in values)
    Console.Write(i + " ");

Console.WriteLine("Use Action Delegate:");
Util.Log ("meo", Logger);

int Square (int x) => x * x;
void Logger (string value) {
    Console.WriteLine("Log value: {0}", value);
}

public class Util
{
    public static void Transform<T> (T[] values, Func<T, T> transformer)
    {
        for (int i = 0; i < values.Length; i ++)
            values[i] = transformer(values[i]);
    }

    public static void Log<T> (T value, Action<T> logger)
    {
        logger(value);
    }
}