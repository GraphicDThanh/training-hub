/*
8. Write a program in C# Sharp to find a string that starts and ends with a specific character.
Test Data :
The cities are : "ROME","LONDON",'NAIROBI','CALIFORNIA','ZURICH','NEW DELHI','AMSTERDAM','ABU DHABI','PARIS'
Input starting character for the string : A
Input ending character for the string : M
Expected Output :
The city starting with A and ending with M is : AMSTERDAM
*/

string [] cities = ["ROME", "LONDON", "NAIROBI", "CALIFORNIA", "ZURICH", "NEW DELHI", "AMSTERDAM", "ABU DHABI", "PARIS"];

Console.WriteLine("Input starting character for the string :");
string startChar = Console.ReadLine();
if (startChar.Length > 1) return;

Console.WriteLine("Input ending character for the string :");
string endChar = Console.ReadLine();
if (endChar.Length > 1) return;

var citiesFound = cities.Where(
    city => startChar == city[0].ToString()
).Where(
    city => endChar == city.ToString().Last().ToString()
);

foreach (var city in citiesFound)
{
    Console.WriteLine(city);
}
