using TransactionWebApi.DTO;

namespace TransactionWebApi.Services
{
    public interface ITransactionService
    {
        Task<IEnumerable<TransactionDto>> GetAllTransactions();

        Task<TransactionDto> CreateTransaction(CreateTransactionDto dto);
    }
}
