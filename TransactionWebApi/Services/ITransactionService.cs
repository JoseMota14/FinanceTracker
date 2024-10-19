using TransactionWebApi.DTO;

namespace TransactionWebApi.Services
{
    public interface ITransactionService
    {
        Task<IEnumerable<TransactionDto>> GetAllTransactions();
        Task<TransactionDto> GetTransactionById(Guid transactionId);

        Task<TransactionDto> CreateTransaction(CreateTransactionDto dto, string token);

        Task<TransactionDto> UpdateTransaction(UpdateTransactionDto dto);
    }
}
