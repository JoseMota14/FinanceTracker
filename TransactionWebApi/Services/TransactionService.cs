using TransactionWebApi.CQRS.Commands;
using TransactionWebApi.CQRS.Dispatchers;
using TransactionWebApi.CQRS.Queries;
using TransactionWebApi.DTO;
using TransactionWebApi.Models;
using TransactionWebApi.Repository;

namespace TransactionWebApi.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ICommandDispatcher _commandDispatcher;
        private readonly IQueryDispatcher _queryDispatcher;

        public TransactionService(ICommandDispatcher commandDispatcher, IQueryDispatcher queryDispatcher)
        {
            _commandDispatcher = commandDispatcher;
            _queryDispatcher = queryDispatcher;
        }

        public async  Task<IEnumerable<TransactionDto>> GetAllTransactions()
        {
            var transactions = await _queryDispatcher.Dispatch<GetAllTransactionsQuery, IEnumerable<TransactionDto>>(new GetAllTransactionsQuery());
            return transactions;
        }

        public async Task<TransactionDto> CreateTransaction(CreateTransactionDto dto)
        {

            var transaction = await _commandDispatcher.Dispatch<CreateTransactionCommand, TransactionDto>(new CreateTransactionCommand(dto));
            return transaction;
        }
    }

}
