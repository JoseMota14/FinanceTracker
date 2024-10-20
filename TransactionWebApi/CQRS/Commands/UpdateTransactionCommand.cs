using TransactionWebApi.DTO;

namespace TransactionWebApi.CQRS.Commands
{
    public class UpdateTransactionCommand
    {
        public UpdateTransactionDto Transaction { get; set; }
        public Guid Id { get; set; }

        public UpdateTransactionCommand(Guid id, UpdateTransactionDto transaction)
        {
            Transaction = transaction;
            Id = id;
        }
    }
}
