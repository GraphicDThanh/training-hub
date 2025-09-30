#define HACKMODE

using System.Diagnostics;

public class ConditionalCompilation {
    public ConditionalCompilation () {
        #if TESTMODE
        Console.WriteLine("in test mode");
        #endif

        #if PLAYMODE
        Console.WriteLine("in play mode");
        #endif

        #if HACKMODE
        Console.WriteLine("in hack mode");
        #endif

        #if TESTMODE && !PLAYMODE 
        Console.WriteLine("in test mode BUT not playmode");
        #endif

        Console.WriteLine("Regular Console");

        // Conditional attribute
        LogStatus("Hello Logging Mode");
    }

    [Conditional ("LOGGINGMODE")]
    static void LogStatus (string msg) 
    {
        Console.WriteLine(msg);
    }
}