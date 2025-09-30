using ContosoPizzaConsole.Data;
using ContosoPizzaConsole.Models;

using ContosoPizzaContext context = new();

// Create some products:
// Product veggieSpecial = new() { 
//     Name = "Veggie Special", 
//     Price = 15.5M 
// };
// context.Products.Add(veggieSpecial);

// Product deluxeMeat = new () {
//     Name = "Deluxe Meat", 
//     Price = 21.5M
// };
// context.Products.Add(deluxeMeat);

// context.SaveChanges();

// query product item
// var veggieSpecial = context.Products
//                     .Where(p => p.Name == "Veggie Special")
//                     .FirstOrDefault();

// if (veggieSpecial is Product)
// {
//     veggieSpecial.Price = 22;
// }

// context.SaveChanges();

// query product list
// - Fluent API Syntax
var products = context.Products
                .Where(p => p.Price > 10)
                .OrderBy(p => p.Name);

foreach (var product in products)
{
    Console.WriteLine($"Product: {product.Name} - Price: {product.Price}");
}

Console.WriteLine("----------------------------");


// // delete product
// if (veggieSpecial is Product)
// {
//     context.Remove(veggieSpecial);
// }
// context.SaveChanges();

// // - LINQ Query Syntax
// var products2 = from product in context.Products
//                 where product.Price > 10
//                 orderby product.Name
//                 select product;


// foreach (var product in products2)
// {
//     Console.WriteLine($"Product: {product.Name} - Price: {product.Price}");
// }