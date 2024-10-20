using TransactionWebApi.DTO;

namespace TransactionWebApi.Services
{
    public interface ITransactionService
    {
        Task<IEnumerable<TransactionDto>> GetAllTransactions(string token);
        Task<TransactionDto> GetTransactionById(Guid transactionId);

        Task<TransactionDto> CreateTransaction(CreateTransactionDto dto, string token);

        Task<TransactionDto> UpdateTransaction(Guid id, UpdateTransactionDto dto);
        Task<bool> DeleteTransactionById(Guid transactionId);
    }
}
