using C3Inheritance;

Console.WriteLine("Syntax");
Console.WriteLine("---------- start ----------\n");

Console.WriteLine("- inheritance");
Stock msft = new Stock { Name = "MSFT", SharesOwned = 1000 };
Console.WriteLine(msft.Name);
Console.WriteLine(msft.SharesOwned);
House masion = new House { Name = "Masion", Mortgage = 250000 };

// Ex 2: polymorphism
Console.WriteLine("polymorphism");
Console.WriteLine(msft.Name);
Console.WriteLine(masion.Name);

Console.WriteLine("-----------------------------");
Console.WriteLine("- Upcast and Downcast");
Stock msft2 = new() { Name = "MSFT", SharesOwned = 1000 };
// Ex 3: upcast
Asset a = msft2;
Console.WriteLine(a == msft2); // True
Console.WriteLine(a.Name);
// Console.WriteLine (a.SharesOwned); // error

// Ex 4: downcast
Stock s = (Stock)a;
Console.WriteLine(s.SharesOwned);
Console.WriteLine(s == a); // True
Console.WriteLine(s == msft2); // True

// downcast error
House h = new();
Asset a2 = h; // upcast always success
try
{
    Stock _ = (Stock)a2; // downcast fail - a is not a Stock
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}


Console.WriteLine("-----------------------------");
Console.WriteLine("- as operator");
// Ex 5: the as operator
House h1 = new();
Asset a3 = h1;
Stock? s2 = a3 as Stock;
Console.WriteLine(s2);
if (s2 != null)
{
    Console.WriteLine(s2.SharesOwned);
}

Console.WriteLine("-----------------------------");
Console.WriteLine("- is operator");
Stock msft4 = new() { Name = "MSFT", SharesOwned = 1000 };
Asset a4 = msft4;
if (a4 is Stock)
{
    Stock s6 = (Stock)a4;
    Console.WriteLine(s6.SharesOwned);
    Console.WriteLine(msft.SharesOwned);
}

Console.WriteLine("-----------------------------");
Console.WriteLine("- pattern variable");
Asset a5 = msft4;
if (a5 is Stock s7)
{
    Console.WriteLine(s7.SharesOwned);
}
// above is similar to
// if (a is Stock) 
// {
//     s4 = (Stock)a;
//     Console.WriteLine (s4.SharesOwned);
// }

// legal to immediate use
if (a is Stock s5 && s5.SharesOwned > 100000)
    Console.WriteLine("Wealthy");
else
    s5 = new Stock(); // s is in scope

Console.WriteLine(s5.SharesOwned);


Console.WriteLine("-----------------------------");
Console.WriteLine("- Virtual Function Members");
HouseVirtual mansion = new() { Name = "Mc Maison", Mortgage = 25000 };
AssetVirtual a1 = mansion;
Console.WriteLine(mansion.Liability); // 25000
Console.WriteLine(a1.Liability); // 25000

Console.WriteLine("-----------------------------");
Console.WriteLine("- Convariant Return Type");
HouseVariant mansion1 = new() { Name = "MCmansion", Mortgage = 250000 };
HouseVariant mansion2 = mansion1.Clone();
Console.WriteLine(mansion2.Name);
Console.WriteLine(mansion2.Mortgage);

Console.WriteLine("-----------------------------");
Console.WriteLine("- New and Override Operator");
Overrider over = new();
BaseClass overBase = over;
over.Foo(); // Overrider.Foo
overBase.Foo();  // Overrider.Foo

Hider hider = new();
BaseClass hiderBase = hider;
hider.Foo(); // Hider.Foo
hiderBase.Foo(); // BaseClass.Foo

// page: 152
Console.WriteLine("-----------------------------");
Console.WriteLine("- base keyword");


Console.WriteLine("\n---------- end ------------");

namespace C3Inheritance
{
    public class Asset // baseclass
    {
        public string? Name;
    }

    public class Stock : Asset // derived class or subclass
    {
        public long SharesOwned;
    }

    public class House : Asset
    {
        public decimal Mortgage;

    }

    // Virtual Function Members
    public class AssetVirtual
    {
        public string? Name;

        public virtual decimal Liability => 0;
    }
    public class StockVirtual : AssetVirtual
    {
        public long SharesOwned;
    }
    public class HouseVirtual : AssetVirtual
    {
        public decimal Mortgage;
        public sealed override decimal Liability => Mortgage;
    }

    // public class HouseAutomatic : HouseVirtual
    // {
    //     public override decimal Liability => Mortgage;
    // }

    public class AssetVariant
    {
        public string? Name;
        public virtual AssetVariant Clone() => new AssetVariant { Name = Name };
    }

    public class HouseVariant : AssetVariant
    {
        public decimal Mortgage;
        public override HouseVariant Clone() => new HouseVariant { Name = Name, Mortgage = Mortgage };
    }

    // Abstract
    public abstract class AssetAbstract
    {
        // empty implementation
        public abstract decimal NetValue { get; }
    }

    public class StockExtendAssetAbstract : AssetAbstract
    {
        public long SharesOwned;
        public decimal CurrentPrice;

        // override like a virtual method
        public override decimal NetValue => CurrentPrice * SharesOwned;
    }

    // hide inherit members
    public class A { public int Counter = 1; }
    public class B : A { public new int Counter = 2; } // warning hide inherited members
    public class C : A { public new int Counter = 3; }

    // new vs. override
    public class BaseClass
    {
        public virtual void Foo() { Console.WriteLine("BaseClass.Foo"); }

    }
    public class Overrider : BaseClass
    {
        public override void Foo() { Console.WriteLine("Overrider.Foo"); }

    }
    public class Hider : BaseClass
    {
        public new void Foo() { Console.WriteLine("Hider.Foo"); }

    }

    public sealed class ClassNoSubClass
    {
        public string? Name;
    }

    // public class SubOfClassNoSub : ClassNoSubClass {}  // error cannot derived

    public class HouseWithBase : AssetVirtual
    {
        public decimal Mortgage;
        public override decimal Liability => base.Liability + Mortgage;
    }

    public class BaseClassWithConstructor
    {
        public int X;
        public BaseClassWithConstructor() { }
        public BaseClassWithConstructor(int x) => X = x;

    }

    public class SubClassOfBaseClassWithConstructor : BaseClassWithConstructor { }
    public class SubClassOfBaseClassWithConstructor2 : BaseClassWithConstructor
    {
        public SubClassOfBaseClassWithConstructor2(int x) : base(x) { }
    }

    public class AssetRequired
    {
        public required string Name;

        public AssetRequired() { }

        [System.Diagnostics.CodeAnalysis.SetsRequiredMembers]
        public AssetRequired(string n) => Name = n;
    }

    public class HouseWithAssetRequired : AssetRequired { } // no constructor

}
