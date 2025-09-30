using System;
using BankyStuffLibrary;
using Humanizer;

namespace MySuperBank
{
    class Program
    {
        static void Main(string[] args)
        {
            var account = new BankAccount("Irvan", 100000);
            Console.WriteLine($"Account {account.Number} was created for {account.Owner} with {account.Balance}");
            account.MakeWithdrawal(50, DateTime.Now, "Xbox Game");
            account.MakeWithdrawal(5, DateTime.Now, "Coffee");
            account.MakeWithdrawal(120, DateTime.Now, "Diet Coke");
            account.MakeWithdrawal(7, DateTime.Now, "Hammock");
            account.MakeWithdrawal(8, DateTime.Now, "Tea");
            Console.WriteLine(account.GetAccountStory());
        }
    }
}