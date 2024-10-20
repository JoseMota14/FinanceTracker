using Microsoft.EntityFrameworkCore;
using TransactionWebApi.Context;
using TransactionWebApi.Models;

namespace TransactionWebApi.Repository
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly FinanceDbContext _context;

        public TransactionRepository(FinanceDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Transaction>> GetAllTransactionsAsync(string user)
        {
            return await _context.Transactions.Where(t => t.UserEmail == user).ToListAsync();
        }

        public async Task<Transaction> GetTransactionByIdAsync(Guid id)
        {
            return await _context.Transactions.FindAsync(id);
        }

        public async Task AddTransactionAsync(Transaction transaction)
        {
            await _context.Transactions.AddAsync(transaction);
        }

        public async Task UpdateTransactionAsync(Transaction transaction)
        {
            _context.Transactions.Update(transaction);
        }

        public async Task DeleteTransactionAsync(Guid id)
        {
            var transaction = await GetTransactionByIdAsync(id);
            if (transaction != null)
            {
                _context.Transactions.Remove(transaction);
            }
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}