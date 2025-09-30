
Console.WriteLine("- static method get");
Transformer t = Test.Square;
Console.WriteLine(t(10));
Console.WriteLine(t.Target == null); // target is null

Console.WriteLine("- instance method target");
MyReporter r = new()
{
    Prefix = "%Complete: "
};
ProcessReporter p = r.ReportProcess;
p(99); // %Complete: 99
Console.WriteLine(p.Target == r); // target is the instance r
Console.WriteLine(p.Method); // Void ReportProcess(Int32)
r.Prefix = "";
p(99); // 99

delegate int Transformer(int x);

class Test
{
    public static int Square(int x) => x * x;
}


public delegate void ProcessReporter(int percentComplete);

class MyReporter
{
    public string Prefix = "";
    public void ReportProcess(int percentComplete) => Console.WriteLine(Prefix + percentComplete);
}