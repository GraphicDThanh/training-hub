using Xunit;
using BankyStuffLibrary;

namespace BankingTests;

public class UnitTest1
{
    [Fact]
    public void Test1()
    {
        Assert.True(true);
    }

    [Fact]
    public void Test2() 
    {
        var account = new BankAccount("Irvan", 10000);
        // Test for negative balance
        Assert.Throws<InvalidOperationException>(
            () => account.MakeWithdrawal(75000, DateTime.Now, "Attemp to overdraw")
        );
        
    }
    [Fact]
    public void Test3() 
    {
        // Test that the initial balances must be positive
        Assert.Throws<ArgumentOutOfRangeException>(
            () => new BankAccount("invalid", -55)
        );
        
    }
}
