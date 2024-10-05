using TransactionWebApi.DTO;

namespace TransactionWebApi.CQRS.Commands
{
    public class UpdateTransactionCommand
    {
        public UpdateTransactionDto Transaction { get; set; }

        public UpdateTransactionCommand(UpdateTransactionDto transaction)
        {
            Transaction = transaction;
        }
    }
}
