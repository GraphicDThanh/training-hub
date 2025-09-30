// nullable define
#pragma warning disable IDE0001
// The code that's violating the rule is on this line.
Nullable<DateTime> date = null;
#pragma warning restore IDE0001

DateTime? date2 = null;
Console.WriteLine(date2);

// get value
Console.WriteLine("GetValueOrDefault(): " + date.GetValueOrDefault());
Console.WriteLine("HasValue: " + date.HasValue);
//Console.WriteLine("Value: ", date.Value); // error

// define
DateTime? date3 = new DateTime(2024, 1, 1);
//DateTime date4 = date3; // error
DateTime date4 = date3.GetValueOrDefault();
Console.WriteLine(date4);

// Null coalescing operator
// before
DateTime? date5 = null;
DateTime date6;
if (date5 != null)
    date6 = date5.GetValueOrDefault();
else
    date6 = DateTime.Today;
Console.WriteLine(date6);

// shorter with "null coalescing operator"
DateTime date7 = (date5 != null) ? date5.GetValueOrDefault() : DateTime.Today;
Console.WriteLine(date7);