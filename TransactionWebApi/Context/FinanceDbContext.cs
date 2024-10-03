using Microsoft.EntityFrameworkCore;
using TransactionWebApi.Models;

namespace TransactionWebApi.Context
{
    public class FinanceDbContext : DbContext
    {
        public FinanceDbContext(DbContextOptions<FinanceDbContext> options) : base(options) { }
        public DbSet<Transaction> Transactions { get; set; }
    }
}