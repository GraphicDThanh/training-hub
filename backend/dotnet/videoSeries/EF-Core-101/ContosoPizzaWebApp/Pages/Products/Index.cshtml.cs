using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using ContosoPizzaWebApp.Models;
using ContosoPizzaWebApp.Data;

namespace ContosoPizzaWebApp.Pages.Products
{
    public class IndexModel : PageModel
    {
        private readonly ContosoPizzaDbContext _context;

        public IndexModel(ContosoPizzaDbContext context)
        {
            _context = context;
        }

        public IList<Product> Product { get;set; } = default!;

        public async Task OnGetAsync()
        {
            Product = await _context.Products.ToListAsync();
        }
    }
}
