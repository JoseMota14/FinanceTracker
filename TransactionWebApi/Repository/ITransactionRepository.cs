using TransactionWebApi.Models;

namespace TransactionWebApi.Repository
{
    public interface ITransactionRepository
    {
        Task<IEnumerable<Transaction>> GetAllTransactionsAsync(string user);
        Task<Transaction> GetTransactionByIdAsync(Guid id);
        Task AddTransactionAsync(Transaction transaction);
        Task UpdateTransactionAsync(Transaction transaction);
        Task DeleteTransactionAsync(Guid id);
        Task SaveChangesAsync();
    }

}
