Console.WriteLine("With Square:");
int[] values = [1, 2, 3];
Transform (values, Square);

foreach (int i in values)
{
    Console.Write(i + " ");
}

Console.WriteLine("\n With Cube:");
int[] values2 = [1, 2, 3];
Transform (values, Cube);

foreach (int i in values)
{
    Console.Write(i + " ");
}


void Transform (int[] values, Transformer t)
{
    for (int i = 0; i < values.Length; i++) 
        values[i] = t(values[i]);
}

int Square (int x) => x * x;
int Cube (int x) => x * x * x;

delegate int Transformer (int x);