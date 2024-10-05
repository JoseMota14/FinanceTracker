using TransactionWebApi.DTO;

namespace TransactionWebApi.CQRS.Commands
{
    public class CreateTransactionCommand
    {
        public CreateTransactionDto Transaction { get; set; }

        public CreateTransactionCommand(CreateTransactionDto transaction)
        {
            Transaction = transaction;
        }

    }
}
