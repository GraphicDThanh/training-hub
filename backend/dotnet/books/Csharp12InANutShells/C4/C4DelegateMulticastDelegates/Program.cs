
Console.WriteLine("- multicast delegates");
SomeDelegates d = SomeMethod1;
d += SomeMethod2;
d();
Console.WriteLine("Before -");
d -= SomeMethod1;
d();

void SomeMethod1() => Console.WriteLine("SomeMethod1");
void SomeMethod2() => Console.WriteLine("SomeMethod2");



Console.WriteLine("- multicast delegates - progress reporter");
ProgressReporter p2 = WriteProcessToConsole;
p2 += WriteProcessToFile;
Util.HardWork(p2);

void WriteProcessToConsole(int percentComplete)
    => Console.WriteLine(percentComplete);

void WriteProcessToFile(int percentComplete)
    => File.WriteAllText("progress.txt", percentComplete.ToString());

delegate void SomeDelegates();

public delegate void ProgressReporter(int percentComplete);
public class Util
{
    public static void HardWork(ProgressReporter p)
    {
        for (int i = 0; i < 10; i++)
        {
            p(i * 10); // Invoke delegate
            Thread.Sleep(100); // Simulate hard work
        }
    }
}
