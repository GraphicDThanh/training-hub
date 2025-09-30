var stock = new Stock("MSFT");
stock.PriceChanged += ReportPriceChange;
stock.Price = 123;
stock.Price = 456;

void ReportPriceChange (decimal oldPrice, decimal newPrice)
{
    Console.WriteLine("Price change from " + oldPrice + " to " + newPrice);
}

public delegate void PriceChangedHandler(decimal oldPrice, decimal newPrice);

public class Stock
{
    string symbol;
    decimal price;

    public Stock(string symbol) { this.symbol = symbol; }

    public event PriceChangedHandler PriceChanged;

    public decimal Price
    {
        get => price;
        set
        {
            if (price == value) return; // nothing change
            decimal oldPrice = price;
            price = value;
            if (PriceChanged != null)
                PriceChanged(oldPrice, price);
        }
    }
}